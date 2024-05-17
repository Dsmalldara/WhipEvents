"use server";
import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/eventModel";
import User from "@/lib/database/models/userModel";
import { handleError } from "@/lib/utils";
import Category from "@/lib/database/models/categoryModel";
import { json } from "stream/consumers";
import { revalidatePath } from "next/cache";
import { getAllCategories, getCategoriesByName } from "./category.actions";
type createEventType = {
  event: any;
  loggedInUserId: any;
};
export const createEvent = async ({
  event,
  loggedInUserId,
}: createEventType) => {
  if (!loggedInUserId || loggedInUserId === null)
    throw new Error("user not logged in");
  try {
    await connectToDatabase();
    const organizerUser = await User.findOne({ id: loggedInUserId });
    if (organizerUser) {
      loggedInUserId = organizerUser._id; // Assigning _id to loggedInUserId  so as to make sure it is assigned to an objectId type
    } else {
      throw new Error("organizer not found");
    }
    const newEvent = await Event.create({
      ...event,
      loggedInUser: loggedInUserId,
      category: event.categoryId,
    });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
const populateEvent: any = async (query: any) => {
  return query
    .populate({
      path: "loggedInUser",
      model: User,
      select: "_id id family_name given_name",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};
export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();
    const event = await populateEvent(Event.findById(eventId));
    if (!event) throw new Error("event not found");
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};
// fetching all events
type fetchAllEvents = {
  category: string;
  limit: number;
  page: number;
  query:string
};
export const fetchAllEvents = async ({
  category,
  limit = 10,
  page,
  query
}: fetchAllEvents) => {
  try {
    await connectToDatabase();
    const skipQuery = (Number(page) - 1) * limit;
    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoriesByName(category) : null
    const conditions = { $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],}
    const eventQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipQuery)
      .limit(limit);
      
    const totalEvents = await Event.countDocuments(conditions);
    const events = await populateEvent(eventQuery);
    if (!events) {
      throw new Error("Error while fetching events");
    }
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(totalEvents / limit),
    };
  } catch (error) {
    handleError(error);
  }
};
type deletedEventProps = {
  eventId: string;
  path: string;
};
export const deleteEvent = async ({ eventId, path }: deletedEventProps) => {
  try {
    await connectToDatabase();
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};
// used this to get the id of user from the db because i only have access to the id on the client initially and not the _id
const populateEvent2 = async (query: any) => {
  return query.populate({
    path: "loggedInUser",
    model: User,
    select: "_id id family_name given_name",
  });
};
type updateEventProps = {
  event: any;
  loggedInUserId?: string;
  path: any;
};
export const updateEvent = async ({
  event,
  loggedInUserId,
  path,
}: updateEventProps) => {
  try {
    await connectToDatabase();
    const getEventById = await populateEvent2(Event.findById(event._id));
    if (!getEventById || getEventById.loggedInUser.id !== loggedInUserId) {
      // _id of the user is not accesible directly without communicating with the backend
      throw new Error("You're not authorized to add new event");
    }
    const UpdateEvent = await Event.findByIdAndUpdate(
      getEventById._id,
      {
        ...event,
        category: event.categoryId,
      },
      {
        new: true,
      }
    );
    revalidatePath(path);
    return JSON.parse(JSON.stringify(UpdateEvent));
  } catch (error) {
    handleError(error);
  }
};
// getting related events
// need to do a skip, get a limit, get what we are basing our filter on, get the total pages available,  get the id of selected event
type getSimilarEventsProps = {
  eventId: string;
  categoryId: string;
  limit?: number;
  page?: number | string;
};
export const getSimilarEvents = async ({
  eventId,
  categoryId,
  limit = 4,
  page = 1,
}: getSimilarEventsProps) => {
  try {
    await connectToDatabase();
    const skipQuery = (Number(page) - 1) * limit; // eg (second page 9, 9-6)
    const queryCondition = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    }; // query condition where the categoryid must be the same and the _id of the eventid shouldn't be included
    const event = Event.find(queryCondition)
      .sort({ createdAt: "desc" })
      .skip(skipQuery)
      .limit(limit);
    const similarEvents = await populateEvent(event);
    const eventsCount = await Event.countDocuments(queryCondition); // counts  documents based on a condition
    return {
      data: JSON.parse(JSON.stringify(similarEvents)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// getting a search result for events
export async function searchEventsByTitle(title: string) {
  try {
    const events = await Event.find({ title: { $regex: title, $options: 'i' } });
      return JSON.parse(JSON.stringify(events));
  } catch (error) {
    handleError(error);
  }
}