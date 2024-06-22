import { Router } from "express";
import { Customer } from "../models/customer.models.js";

const router = Router();

// router.get("/random", (req, res) => {
//   res.send("Hello World! random route");
// });
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field?.trim() === "")) {
    console.log("All the fields are required");
  }

  const existedCustomer = await Customer.findOne({
    $or: [{ name }, { email }],
  });

  if (existedCustomer) {
    console.log(409, "User with email or username already exists");
  }
  const customer = await Customer.create({
    name,
    email,
    password,
  });
  return res
    .status(201)
    .json({
      message: "User created successfully",
      data: customer,
      status:201,

    });
});

export default router;
