import mongoose from "mongoose";
const coffeeshopownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);
const CoffeeShopOwner = mongoose.model(
  "CoffeeShopOwner",
  coffeeshopownerSchema
);
