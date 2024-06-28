import { Fooditem } from "../models/fooditems.models.js";
import { ApiResponse } from "../utils/response.js";

export const getAllFoodItems = async (req, res) => {
  try {
    const allFoodItems = await Fooditem.find({}).populate("shop");
    return res.status(200).json(
      ApiResponse(
        {
          title: "All food items fetched",
          description: "All food items fetched successfully",
        },
        allFoodItems,
        200,
        true
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        ApiResponse(
          { title: "Error", description: "Internal server error" },
          null,
          500,
          false
        )
      );
  }
};

export const getRespectiveShopFoodItems = async (req, res) => {
  try {
    const { shopid } = req.params;
    const shopFoodItems = await Fooditem.find({ shop: shopid }).populate(
      "shop"
    );
    console.log(shopFoodItems)
    return res.status(200).json(
      ApiResponse(
        {
          title: "Shop food items fetched",
          description: "Shop food items fetched successfully",
        },
        shopFoodItems,
        200,
        true
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        ApiResponse(
          { title: "Error", description: "Internal server error" },
          null,
          500,
          false
        )
      );
  }
}