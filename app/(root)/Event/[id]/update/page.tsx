import type { Metadata } from "next";
import { getEventById, updateEvent } from "@/app/api/event.actions";
import EventsForm from "@/components/EventsForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export const metadata:Metadata={
    title:{
        absolute:"Update your event"
    },
    icons:{
        icon:'/icon.jpg'
      }
}
type IdType ={
    params:{
        id:string
    }
}
export default async  function UpdateEvent({params:{id}}:IdType){
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const event = await getEventById(id);
     
    return (
        <div className="container bg-dotted-pattern bg-cover py-4 md:py-6 px-2 bg-primary-50 ">
            <EventsForm type="update" loggedInUserId={user?.id} event={event} />
        </div>
    )
}