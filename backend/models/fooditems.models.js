import mongoose from 'mongoose';
const fooditemsSchema = new mongoose.Schema({},{timestamps:true});
const Fooditems = mongoose.model('Fooditems', fooditemsSchema);