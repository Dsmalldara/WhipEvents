import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    family_name:{type:String,required:true},
    given_name:{type:String,required:true},
    picture:{type:String,required:false},
    email:{type:String,required:true},
    id:{
        type:String, required:true}
})


const User =  models.User || model('User', userSchema)

export default User;
//