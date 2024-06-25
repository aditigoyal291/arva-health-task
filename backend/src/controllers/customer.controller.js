import { Customer } from "../models/customer.models.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/response.js";

// Generate JWT
const generateToken = (_id, name, email) => {
  return jwt.sign({ _id, name, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register Customer
export const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const customerExists = await Customer.findOne({ email });

    if (customerExists) {
      const message = {
        title: "Customer already exists",
        description: "Please login to continue",
      };
      return res.status(400).json(ApiResponse(message, null, 400, false));
    }

    const customer = await Customer.create({
      name,
      email,
      password,
    });

    const token = generateToken(customer._id, name, email);

    const tokenData = {
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token: token,
      bookmarks: customer.bookmarks,
    };

    const message = {
      title: "Customer Registerd successfully",
      description: "You can now login to your account",
    };
    console.log(tokenData, message);

    res.status(201).json(ApiResponse(message, tokenData, 201, true));
  } catch (error) {
    const message = {
      title: "Registration failed",
      description: error.message,
    };
    res.status(400).json(ApiResponse(message, null, 400, false));
  }
};

// Login Customer
export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });

    if (customer && (await customer.matchPassword(password))) {
      const token = generateToken(customer._id, customer.name, email);

      const tokenData = {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        token: token,
        bookmarks: customer.bookmarks,
      };

      const message = {
        title: "Customer logged in successfully",
        description: "You can now access your account",
      };

      return res.json(ApiResponse(message, tokenData, 200, true));
    } else {
      const message = {
        title: "Invalid email or password",
        description: "Please try again",
      };
      return res.status(401).json(ApiResponse(message, null, 401, false));
    }
  } catch (error) {
    const message = {
      title: "Server Error",
      description: error.message,
    };
    return res.status(400).json(ApiResponse(message, null, 400, false));
  }
};

// Logout Customer
export const logoutCustomer = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getCustomerProfile = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json(
        ApiResponse(
          {
            title: "Invalid token",
            description: "Please login to continue",
          },
          null,
          401,
          false
        )
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decoded; // Assuming '_id' is the property in the payload
    if (!_id) {
      return res.status(400).json(
        ApiResponse(
          {
            title: "Invalid token format",
            description: "Token does not contain a valid user ID",
          },
          null,
          400,
          false
        )
      );
    }

    const customer = await Customer.findById(_id);
    if (!customer) {
      return res.status(404).json(
        ApiResponse(
          {
            message: "Customer not found",
            description: "The requested customer does not exist",
          },
          null,
          404,
          false
        )
      );
    }

    return res.status(200).json(
      ApiResponse(
        {
          title: "Customer found",
          description: "Customer profile found",
        },
        customer,
        200,
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      ApiResponse(
        {
          title: "Internal server error",
          description: "An error occurred while processing your request",
        },
        null,
        500,
        false
      )
    );
  }
};

export const BookmarkShop = async (req, res) => {
  const { shop_id, user_id } = req.body;

  try {
    const customer = await Customer.findById(user_id);

    if (!customer) {
      return res.status(404).json(
        ApiResponse(
          {
            title: "Customer not found",
            description: "The requested customer does not exist",
          },
          null,
          404,
          false
        )
      );
    }

    const isShopBookmarked = customer.bookmarks.includes(shop_id);

    if (isShopBookmarked) {
      customer.bookmarks = customer.bookmarks.filter((id) => id.toString() !== shop_id);
      await customer.save();

      return res.status(200).json(
        ApiResponse(
          {
            title: "Shop removed from bookmarks",
            description: "Shop removed from bookmarks successfully",
          },
          null,
          200,
          true
        )
      );
    } else {
      customer.bookmarks.push(shop_id);
      await customer.save();

      return res.status(200).json(
        ApiResponse(
          {
            title: "Shop added to bookmarks",
            description: "Shop added to bookmarks successfully",
          },
          null,
          200,
          true
        )
      );
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(
      ApiResponse(
        {
          title: "Internal server error",
          description: "An error occurred while processing your request",
        },
        null,
        500,
        false
      )
    );
  }
};

export const LikeFoodItem = async (req, res) => {};
