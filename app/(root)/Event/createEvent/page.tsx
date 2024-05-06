'use server'
import EventsForm from "@/components/EventsForm";
import { EventTypes } from "@/lib/database/models/eventModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
async function createEvent() {
  const {getUser} = getKindeServerSession()
  const loggedInUser = await getUser()  
  const loggedInUserId = loggedInUser?.id
  return (
    <>
    <section className="bg-primary-50 w-full bg-dotted-pattern  bg-cover bg-center pt-3 md:py-8 shadow-sm rounded-sm">
    </section>
    <div className="wrapper py-5 shadow-sm bg-[#d3cdcd]">
      <EventsForm type="create" loggedInUserId={loggedInUserId} />
    </div>
    </>
  )
}

export default createEvent