'use server'
import type { Metadata } from "next";
import EventsForm from "@/components/EventsForm";
import { EventTypes } from "@/lib/database/models/eventModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
import LoadingComponent from "./loading";
async function createEvent() {
  const {getUser} = getKindeServerSession()
  const loggedInUser = await getUser()  
  const loggedInUserId = loggedInUser?.id
  return (
    <>
    {/* <section className="bg-primary-50 w-full bg-dotted-pattern  bg-cover bg-center pt-3 md:py-8 shadow-sm rounded-sm">
    </section> */}
    <div className="wrapper py-5 shadow-sm bg-[#d3cdcd] pb-[2rem]">
      <Suspense fallback={<LoadingComponent/>}>
      <EventsForm type="create" loggedInUserId={loggedInUserId} />
      </Suspense>
    </div>
    </>
  )
}

export default createEvent