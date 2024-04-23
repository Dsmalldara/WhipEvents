import { Document } from "mongodb";
import { Schema, model, models } from "mongoose";

export interface EventTypes extends Document {
    id: string;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    startDate: Date;
    endDate: Date;
    price: string;
    isFree: boolean;
    url: string;
    category: {
        _id:string,
        name:string
    } 
    organizer?: {
        _id:String,
        firstName:string,
        lastName:string,
        email:string
    }}

 const EventSchema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
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
        required:true
    },
    isFree:{
        type:Boolean,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    organizer:{
        type:Schema.Types.ObjectId,
        ref:'Organizer',
        required:false
    }

 })
 const Event = models.Event || model('event', EventSchema)
 export default Event