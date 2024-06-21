import mongoose from "mongoose"

const likeSchema=new mongoose.Schema({
    numberoflikes:{
        type:Number,
        required:true
    },
    likedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    liked:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    }
    
},{timestamps:true})

export const Like=mongoose.model("Like",likeSchema)