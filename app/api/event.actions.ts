'use server'
import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/eventModel";
import User from "@/lib/database/models/userModel";
import { handleError } from "@/lib/utils";


export const createEvent = async ({ event, loggedInUserId }) => {
  if (!loggedInUserId || loggedInUserId === null) throw new Error("user not logged in");
  
  try {
    await connectToDatabase();
    const organizerUser = await User.findOne({id: loggedInUserId})
    if (!organizerUser) throw new Error("organizer not found");
    const newEvent = await Event.create({ ...event, loggedInUser: loggedInUserId });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
