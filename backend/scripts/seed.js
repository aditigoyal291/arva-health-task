// seed.js
import mongoose from "mongoose";
import chalk from "chalk";
import CustomerData from "./dummycustomer.json" assert { type: "json" };
import { Customer } from "../src/models/customer.models.js";
import connectDB from "../src/db/index.js";
// const customer = require("./dummy-customer.json");
// const coffeeshop = require("./dummy-coffeeshop.json");
// const foodItems = require("./dummy-food-items.json");
// const reviews = require("./dummy-reviews.json");
// const Customer = require("../src/models/customer.models");
// const CoffeeShop = require("../src/models/shop.models");
// const FoodItem = require("../src/models/fooditems.models");
// const Review = require("../src/models/review.models");
// const { default: connectDB } = require("../src/db");

const load = async () => {
  const FigletText = (text) => {
    console.log(chalk.yellow.bold(text));
  };

  FigletText("arvaCoffeeShop");

  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    console.log(chalk.red.bold("Can't run seed in production"));
    process.exit(1);
  } else {
    connectDB()

      .then(() => {
        console.log(CustomerData);
        console.log(process.env.MONGODB_URI);
      })
      .catch((error) => {
        console.log("MONGODB CONNECTION ERROR", error);
        process.exit(1);
      });
  }
};

load();
