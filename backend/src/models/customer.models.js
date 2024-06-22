import mongoose from "mongoose";
const customerSchema = new mongoose.Schema(
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
    location: {
      type: String,
      // required: true,
      trim: true,
      latitude: {
        type: Number,
        // required: true,
      },
      longitude: {
        type: Number,
        // required: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    bookmarks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
export const Customer = mongoose.model("Customer", customerSchema);
