'use server'
import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/eventModel";
import User from "@/lib/database/models/userModel";
import { handleError } from "@/lib/utils";
import Category from "@/lib/database/models/categoryModel";
 

const populateEvent: any = async (query: any) => {
    return query
      .populate({
        path: "loggedInUser",
        model: User,
        select: "_id id family_name given_name",
      })
      .populate({ path: "category", model: Category, select: "_id name" });
  };
type createdByUserParams={
    userId:any,
    limit:number,
    page:number
}
    export async function getEventsByUser({ userId, limit = 6, page }: createdByUserParams) {
        try {
          await connectToDatabase()
            let user = await User.find({id:userId})
            user.forEach((usr, index) => {
                usr[index] = usr._id;
              })// Assigning _id to userId  so as to make sure it is assigned to an objectId type
          const conditions = { loggedInUser: user}
          const skipAmount = (page - 1) * limit
      
          const eventsQuery = Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)
      
          const events = await populateEvent(eventsQuery)
          const eventsCount = await Event.countDocuments(conditions)
      
          return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
        } catch (error) {
          handleError(error)
        }
      }