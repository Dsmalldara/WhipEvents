'use server'
import { CheckoutOrderParams } from "@/constants/types"
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
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });
      if(!session){
        handleError(new Error('Session not created'))
        return
      }
      return redirect(session.url!)

   
}