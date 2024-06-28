import { Router } from "express";
import { getAllFoodItems, getRespectiveShopFoodItems } from "../controllers/fooditems.controller.js";

const router = Router();

router.get('/all', getAllFoodItems)
router.get("/shop/:shopid", getRespectiveShopFoodItems);

export default router;
