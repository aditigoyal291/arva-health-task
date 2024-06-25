import express from "express";
const router = express.Router();
import {
loginCustomer,
logoutCustomer,
registerCustomer,
getCustomerProfile
} from "../controllers/customer.controller.js";
import { protect } from "../middleware/authMiddleware.js"

router.post("/signup", registerCustomer);
router.post("/login", loginCustomer);
router.post("/logout", logoutCustomer);
router.get("/me", protect, getCustomerProfile);

export default router;