import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fooditem",
    }],
    bookmarks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Shop",
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    }],
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }],
  },
  { timestamps: true }
);

customerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Customer = mongoose.model("Customer", customerSchema);
