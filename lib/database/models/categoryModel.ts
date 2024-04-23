import { Document } from "mongodb"
import { Schema, model, models } from "mongoose"
 export interface categoryType extends Document{
    _id:string,
    name: string;
 }
const CategroySchema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{type:String, required:true, unique:true}
})
 const Category = models.Category || model('category', CategroySchema)
 export default Category