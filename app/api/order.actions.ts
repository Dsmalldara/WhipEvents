'use server'
import { CheckoutOrderParams, CreateOrderParams } from "@/constants/types"
import { connectToDatabase } from "@/lib/database";
import Order from "@/lib/database/models/orderModel";
import User from "@/lib/database/models/userModel";
import { handleError } from "@/lib/utils";
import { redirect } from "next/navigation";

import Stripe from 'stripe'
export const checkoutOrder = async(order:CheckoutOrderParams)=>{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const price = order.isFree ? 0 : Number(order.eventPrice)*100  //stripe takes in the price in cents
 
              // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data:{
              product_data:{
                name:order.eventTitle,
                images:[order.eventImage]
            },
                currency:'usd',
                unit_amount:price,
               
            },
            quantity:1
          },
        ],
        metadata:{
            eventId:order.eventId,
            buyerId:order.buyerId
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/Event/Profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });
      if(!session){
        handleError(new Error('Session not created'))
        return
      }
      return redirect(session.url!)

   
}
const populateUser: any = async (query: any) => {
  return query
    .populate({
      path: "buyer",
      model: User,
      select: "_id id ",
    })
  }
export const createOrder = async(order:CreateOrderParams)=>{
try{
  await connectToDatabase()
  // const findUser = await populateUser(User.findOne({id: order.buyerId}))
  // const userId = findUser._id; 
  //trying to get the user id and now use the _id 
  const newOrder = await Order.create({
    order,event:order.eventId })
 JSON.parse(JSON.stringify(newOrder))
}
catch(error){
  handleError(error)
}
}