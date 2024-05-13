// import { getSimilarEvents } from "@/app/api/event.actions";
// import EventCollection from "./EventCollection";

// type similarEventsTypes = {
//     eventId: string,
//     categoryId:string
// }
// async function SimilarEvents({eventId,categoryId}:similarEventsTypes){   // eventId, categoryId,limit = 4,page=1
//     const similarEvents = await  getSimilarEvents ({eventId:eventId, categoryId:categoryId})
//     return (
//         <>
//           <EventCollection  data={similarEvents?.data} 
//       emptyTitle="No Events Available"
//       emptyStateSummary="No events available check later"
//       eventCollectionType="All_events"
//       limit={10}
//       page={1}
//       totalPages={similarEvents?.totalPages}
//       />
//         </>
//     )
// }
// export default SimilarEvents;