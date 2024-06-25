import { Shop } from "../models/shop.models.js";
import { ApiResponse } from "../utils/response.js";

export const getAllShops = async (req, res) => {

  try {
    const allShops = await Shop.find({});
    return res.status(200).json(
      ApiResponse(
        {
          title: "All shops fetched",
          description: "All shops fetched successfully",
        },
        allShops,
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
