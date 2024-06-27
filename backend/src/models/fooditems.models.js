import mongoose from "mongoose";

const fooditemsSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    itemType: {
      type: String,
      enum: ["food", "drinks", "coffee"],
      required: true,
    },
    tags:{
      type: String,
      required: true,
      default:""
    },
    diet:{
      type: String,
      required: true,
      enum:["veg","non-veg"]
    },
    calories:{
      type: Number,
      required: true
    },



  },
  { timestamps: true }
);

export const Fooditems = mongoose.model("Fooditems", fooditemsSchema);
