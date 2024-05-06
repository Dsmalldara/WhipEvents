'use server'
import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/eventModel";
import User from "@/lib/database/models/userModel";
import { handleError } from "@/lib/utils";
import Category from "@/lib/database/models/categoryModel";
import { json } from "stream/consumers";
import { revalidatePath } from "next/cache";
 
type createEventType={
  event:any,
  loggedInUserId:any
}
export const createEvent = async ({ event, loggedInUserId }:createEventType) => {
  if (!loggedInUserId || loggedInUserId === null) throw new Error("user not logged in");
  
  try {
    await connectToDatabase();
    const organizerUser = await User.findOne({id: loggedInUserId})
    if (organizerUser) {
      loggedInUserId = organizerUser._id; // Assigning _id to loggedInUserId  so as to make sure it is assigned to an objectId type
    } else {
      throw new Error("organizer not found");
    }
    const newEvent = await Event.create({ ...event, loggedInUser: loggedInUserId,category:event.categoryId });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
   const populateEvent = async(query:any)=>{
    return query
    .populate({path:'loggedInUser', model:User, select:'_id id family_name given_name'})
    .populate({path:'category', model:Category, select:'_id name'})
   }
export const getEventById = async(eventId:string)=>{

  try{
    await connectToDatabase()
    const event = await populateEvent(Event.findById(eventId))
    if(!event) throw new Error("event not found")
    return JSON.parse(JSON.stringify(event))
  }
  catch(error){
    handleError(error)
  }
}

export const fetchAllEvents = async ({query,category,limit=10,page})=>{
  try{
    await connectToDatabase()
    const conditions = {}
    const eventQuery =  Event.find(conditions)
    .sort({createdAt:'desc'})
    .skip(0)
    .limit(limit)
      const totalEvents = await Event.countDocuments(conditions)
    const events = await populateEvent(eventQuery)
    if(!events){
      throw new Error ("Error while fetching events")
    }
    return {
      data:JSON.parse(JSON.stringify(events)),
      totalPages:Math.ceil(totalEvents/limit)
    }
  }
  catch(error){
    handleError(error)
  }
}
type deletedEventProps  = {
  eventId :string,
  path:string
}
export const deleteEvent = async ({eventId,path}:deletedEventProps)=>{
  try{
    await connectToDatabase()
    const deletedEvent = await Event.findByIdAndDelete(eventId)
    revalidatePath(path)

  }
  catch(error){
    handleError(error)
  }
}
const populateEvent2 = async(query:any)=>{
  return query
  .populate({path:'loggedInUser', model:User, select:'_id id family_name given_name'})
 }
 type updateEventProps = {
    event:any,
    loggedInUserId?:string,
    path:any
  }
export const updateEvent = async ({event,loggedInUserId,path}:updateEventProps)=>{
  try{
    await connectToDatabase()
    const getEventById =  await populateEvent2(Event.findById(event._id))
    if(!getEventById || getEventById.loggedInUser.id !== loggedInUserId){
      throw new Error ("You're not authorized to add new event")
    }
   const UpdateEvent = await Event.findByIdAndUpdate(getEventById._id,{
    ...event,category:event.categoryId
   },
  {
    new:true
  })
  revalidatePath(path)
  return JSON.parse(JSON.stringify(UpdateEvent))
  }
  catch(error){
    handleError(error)
  }
}