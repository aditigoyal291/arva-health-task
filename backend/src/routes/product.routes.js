import { Router } from "express";
import { getAllFoodItems } from "../controllers/fooditems.controller.js";

const router = Router();

router.get('/all', getAllFoodItems)

export default router;
