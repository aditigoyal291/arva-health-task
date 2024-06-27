import { Fooditems } from "../models/fooditems.models.js";
import { ApiResponse } from "../utils/response.js";

export const getAllFoodItems = async (req, res) => {
  try {
    const allFoodItems = await Fooditems.find({}).populate("shop");
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
