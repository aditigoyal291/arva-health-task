import { Router } from "express";
import { getAllShops, getShopInfo } from "../controllers/shop.controller.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("new new new enw all data");
});

router.get("/all", getAllShops);
router.get("/:shopId", getShopInfo);


export default router;
