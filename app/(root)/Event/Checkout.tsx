'use client'
import { checkoutOrder } from "@/app/api/order.actions";
import { Button } from "@/components/ui/button";
import { CheckoutOrderParams } from "@/constants/types";
import { EventTypes } from "@/lib/database/models/eventModel";
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from "react";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY !
);
type checkoutType ={
event:EventTypes,
userId:string,
}
 const Checkout=({event,userId}:checkoutType)=>{
 useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);
    const checkoutForm=async()=>{
        const order:CheckoutOrderParams ={
          eventTitle: event.title,
          eventId: event._id,
          eventImage:event.imageUrl,
          eventPrice:event.price,
          isFree: event.isFree,
          buyerId: event.buyer._id
        }
        await checkoutOrder(order)
    }
    console.log(event)
    return(
        <form action={checkoutForm} method="post">
            <Button type="submit" role="link" className="button sm:w-fit"  size="lg">
                {
                    event.isFree ? "Get Tickets" : `Buy Tickets for $${event.price}`
                }
            </Button>
        </form>
            )
}
export default Checkout;