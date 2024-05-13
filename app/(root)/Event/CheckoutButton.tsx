'use server'
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Checkout from "./Checkout";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { EventTypes } from "@/lib/database/models/eventModel";
export async function CheckoutButton({event}:any) {
  const isEventFinised = new Date(event.endDate) < new Date();
  console.log(event.endDate, new Date(event.endDate), isEventFinised);
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  return (
    <div className="flex items-center justify-center ">
      {isEventFinised ? (
        <p>sorry this event has ended ❌</p> ) 
        : (
            <>
            {user ? (
              <Checkout event={event} userId={user.id}/>
            ) : (
              <Button asChild className=" md:px-6 px-3 rounded-full mr-2 shadow" size="lg">
                <LoginLink>Get tickets</LoginLink>
              </Button>
            )}
            </>
           )}
    </div>
  );
}
