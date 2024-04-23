import { Schema, model, models } from "mongoose";

export interface orderSchema extends Document {
    createdAt: Date;
    updatedAt: Date;
    stripeId: string;
    event: {
        title: string;
        description: string;
        // location: string;
        // imageUrl: string;
        // startDate: Date;
        // endDate: Date;
        // categoryId: Schema.Types.ObjectId;
        // price: string;
        // isFree: boolean;
        // url: string;
    };
    buyer: {
        firstName: string;
        lastName: string;
        email: string;
    };
}
export type orderType = {
    createdAt: Date;
    stripeId: string;
    event: string;
    buyer: string;
}
const orderSchema = new Schema({
    createdAt:{
        type:Date,
        default:Date.now
    },
    stripeId:{
        type:String,
        required:true
    },
    event:{
        type:Schema.Types.ObjectId,
        ref:'Event',
        required:true
    },
    buyer:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

})
const Order = models.Order || model('Order', orderSchema)

export default Order;