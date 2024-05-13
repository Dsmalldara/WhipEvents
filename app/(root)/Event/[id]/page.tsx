import { getEventById, getSimilarEvents } from "@/app/api/event.actions";
import { capitalize, formatDateTime } from "@/lib/utils";
import Image from "next/image";
import EventCollection from "../EventCollection";
import { CheckoutButton } from "../CheckoutButton";
async function CreatedEvent({ params: { id } }: any) {
  const event = await getEventById(id);
  console.log(event);
  const similarEvents = await  getSimilarEvents({eventId:event._id, categoryId:event.category._id,page:1})
  console.log(similarEvents)
  return (
    <section className="bg-primary-50   justify-center   bg-contain">
      <div className=" wrapper flex flex-col md:flex-row gap-0  md:pl-[5rem]">
        <div className="flex flex-col gap-[2.5rem]">
        <Image
          width={500}
          height={600}
          src={event.imageUrl}
          alt="event image"
          className="rounded-sm  h-full min-h-[300px] object-cover object-center  "
        />
        <div className="hidden md:grid justify-center">
        <CheckoutButton event={event}/>
      </div>
        </div>
        <div className="flex w-full flex-col p-5 gap-8 md:gap-10">
          <div className="flex flex-col gap-5">
            <h2 className="headertext h2-bold">{capitalize(event.title)}</h2>
          </div>
            <div className="mr-auto flex flex-row gap-5">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/20 px-2 md:px-2 py-1 md:py-2 text-green-600">
                  {event.isFree ? "Free" : `$${event.price}`}
                </p>
                <p className="p-medium-16 rounded-full px-2 md:px-2 py-1 md:py-2 my-auto bg-grey-500/10 md:mt-[-0.1rem]">
                  {capitalize(event.category.name)}
                </p>
              </div>
              <div className="p-medium-18 ml-2 md:mt-2 mt-[-0.150rem]">
                <p>
                  by{" "}
                  <span className="text-primary-500 ">
                    {capitalize(event.loggedInUser.family_name)}{" "}
                    {event.loggedInUser.given_name}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap ">
              <h3 className="h3-bold">About Event:</h3>{" "}
              <p className="p-regualar-14">{event.description}</p>
            </div>
            <div>
              <div className="flex gap-2 md:gap-3 mt-5">
                <Image
                  src="/location.png"
                  alt="location"
                  width={18}
                  height={18}
                />
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  {event.location}
                </p>
              </div>
              <div className="flex mr-auto gap-2 md:gap-3   mt-[1.5rem]">
                <Image
                  src="/calendar.png"
                  alt="location"
                  width={18}
                  height={18}
                  className="flex flex-grow-0"
                />
                <div className="p-medium-14 lg:p-regular-20 flex flex-wrap items-center">
                  <p className=" mt-2 sm:mt-0">
                    {" "}
                    {formatDateTime(event.startDate).dateOnly} -{" "}
                    {formatDateTime(event.endDate).timeOnly}
                  </p>
                  <span className="flex flex-grow-0">
                    {"  "}-{"   "}
                  </span>
                  <p className=" mt-2 ml-2 sm:mt-0">
                    {" "}
                    {formatDateTime(event.endDate).dateOnly} -{" "}
                    {formatDateTime(event.endDate).timeOnly}
                  </p>
                </div>
              </div>
              <div className="items-center flex gap-3 mt-[2rem]">
                <p className="p-medium-16 text-primary-500 truncate underline lg:p-regular-18 ">
                  {event.url}
                </p>
              </div>
            </div>
        </div>
        <div className="md:hidden">
          <CheckoutButton event={event}/>
        </div>
      </div>
      
      <div className=" pb-[2rem]">
        <h4 className="h4-medium flex items-center justify-center mb-3 md:mb-5 underline navslide-font" >
          Similar Events
        </h4>
      <EventCollection  data={similarEvents?.data} 
      emptyTitle="No Events Available"
      emptyStateSummary="No events available check later"
      eventCollectionType="All_events"
      limit={4}
      page={1}
      totalPages={similarEvents?.totalPages}
      />
      </div>
    </section>
  );
}
export default CreatedEvent;
