import { Document } from "mongodb";
import { Schema, model, models } from "mongoose";
import Category from "./categoryModel";
export interface EventTypes extends Document {
    // id: string;
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDate: Date;
    endDate: Date;
    price: string;
    isFree: boolean;
    url: string;
    categoryId: string;
}

 const EventSchema = new Schema({
 
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        default:Date.now,
        required:true
    },
    endDate:{
        type:Date,
        default:Date.now,
        required:true
    },
    price:{
        type:String,
        required:false
    },
    isFree:{
        type:Boolean,
        required:false
    },
    url:{
        type:String,
        required:true
    },
    categoryId:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:false
    },
    loggedInUser:{
        type:Schema.Types.String,
        ref:'User',
        unique:false,
        required:true
    }

 })
 const Event = models.Event || model('event', EventSchema)
 export default Event