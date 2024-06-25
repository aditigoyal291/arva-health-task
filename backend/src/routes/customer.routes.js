import express from "express";
const router = express.Router();
import {
  loginCustomer,
  logoutCustomer,
  registerCustomer,
  getCustomerProfile,
  BookmarkShop,
  LikeFoodItem,
} from "../controllers/customer.controller.js";

router.post("/signup", registerCustomer);
router.post("/login", loginCustomer);
router.post("/logout", logoutCustomer);
router.get("/me", getCustomerProfile);
router.post("/bookmark/", BookmarkShop);
router.post("/like/", LikeFoodItem);

export default router;
