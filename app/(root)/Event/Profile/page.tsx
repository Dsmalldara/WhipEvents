import { getEventsByUser } from "@/app/api/user.actions"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import EventCollection from "../EventCollection"
import { capitalize } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import LoadingComponent from "./loading"
import { Suspense } from "react"
export default async function UserProfile(){
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    const eventsByUser = await getEventsByUser({userId:user?.id, limit:6, page:1})
    const userAvailable = user ? true : false

    return (
        <section className="wrapper  px-[1rem] py-4 md:px-[3rem] items-center bg-primary-50">
           <Suspense fallback={<LoadingComponent/>}>
           <div className="border-b border-b-slate-800">
           <h3 className="h3-medium underline underline-offset-1 py-1 flex items-center text-slate-600 anatialzied  justify-center md:items-start md:justify-start antialiased navslide-font ">
                Your Profile
            </h3>
            <div className=" profile-content md:gap-4 gap-2 flex items-center md:flex flex-col justify-center md:justify-start">
              <p className="p-regular-18 not-found">  {user?.family_name} {" "} {user?.given_name} </p>       
              <p className="p-regular-18 not-found text-primary-500 ">  {user?.email}</p>
            </div>
        <div className="px-4 py-[1rem] ">
        <p className=" md:p-semibold-20 p-semibold-18 flex items-center justify-center py-5 underline text-zinc-600"> { userAvailable ? ` Events created by ${user?.family_name} ${user?.given_name}`  :`Events you've created would appear here`}</p>
         <EventCollection  data={eventsByUser?.data}
      emptyTitle=""
      emptyStateSummary="ohps you haven't created any events yet"
      eventCollectionType="All_events"
      limit={10}
      page={1}/>
        </div>
           </div>
        <div className="flex md:flex-row flex-col  justify-between items-center gap-8 md:gap-4 py-5 px-4 md:px-6 md:py-8  overflow-hidden border-b border-b-slate-800 ">
            <p className="w-full  p-medium-16 md:p-medium-24">
               Planning on organizing a new Event for the public ?
            </p>
            <Button asChild className='md:justify-end px-6 rounded-full sm:w-full  shadow' size='lg'>
                <Link href='/Event/createEvent'>
                    Create Event  😊
                    </Link>
                  </Button>
        </div>
        </Suspense>
    </section>
    )
}