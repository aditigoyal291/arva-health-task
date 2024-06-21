import mongoose from 'mongoose';
const fooditemsSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
        trim:true
    },
    itemPrice:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    itembelongsto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop'
    }
},{timestamps:true});
const Fooditems = mongoose.model('Fooditems', fooditemsSchema);