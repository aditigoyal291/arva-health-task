import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shopname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    coverImages: {
      type: Array,
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CoffeeShopOwner",
    },
  },
  { timestamps: true }
);

export const Shop = mongoose.model("Shop", shopSchema);
