// seed.js
import mongoose from "mongoose";
import chalk from "chalk";
import CustomerData from "./dummy-customer.json" assert { type: "json" };
import FooditemsData from "./dummy-food-items.json" assert { type: "json" };
import ShopData from "./dummy-coffeeshop.json" assert { type: "json" };
import ownerData from "./dummy-owner.json" assert { type: "json" };
import ReviewData from "./dummy-reviews.json" assert { type: "json" };
import { Customer } from "../models/customer.models.js";
import { Fooditem } from "../models/fooditems.models.js";
import { Shop } from "../models/shop.models.js";
import { CoffeeShopOwner } from "../models/coffeeshopowner.models.js";
import { Review } from "../models/review.models.js";

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
    try {
      await mongoose.connect(
        "mongodb+srv://aditi-arva:adiigoyal2002123@cluster0.yeglndp.mongodb.net/arva-health-coffee-shop"
      );
      await Customer.deleteMany();
      console.log("✓" + " [1/2] " + chalk.red("Deleted customer records"));
      await Customer.insertMany(CustomerData);
      console.log("✓" + " [2/2] " + chalk.green("Added new customers data"));

      await Fooditem.deleteMany();
      console.log("✓" + " [1/2] " + chalk.red("Deleted fooditems records"));
      await Fooditem.insertMany(FooditemsData);
      console.log("✓" + " [2/2] " + chalk.green("Added new fooditems data"));

      await CoffeeShopOwner.deleteMany();
      console.log("✓" + " [1/2] " + chalk.red("Deleted owner records"));
      await CoffeeShopOwner.insertMany(ownerData);
      console.log("✓" + " [2/2] " + chalk.green("Added new owner data"));

      await Shop.deleteMany();
      console.log("✓" + " [1/2] " + chalk.red("Deleted Shop records"));
      await Shop.insertMany(ShopData);
      console.log("✓" + " [2/2] " + chalk.green("Added new Shop data"));

      await Review.deleteMany();
      console.log("✓" + " [1/2] " + chalk.red("Deleted Review records"));
      await Review.insertMany(ReviewData);
      console.log("✓" + " [2/2] " + chalk.green("Added new Review data"));

      console.log(chalk.yellow("\n✨✨ Seeded data successfully"));
    } catch (e) {
      console.error(e);
      process.exit(1);
    } finally {
      await mongoose.disconnect();
    }
  }
};

load();
