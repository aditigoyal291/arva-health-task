import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function getCustomerData(token) {
  console.log(token);
  if (token) {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/users/me",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(data.data);
      return data?.data || null;
    } catch (error) {
      console.error("Error fetching customer data:", error);

      // *Informative error handling:*
      if (error.response?.status === 401) {
        return { error: "Invalid token. Please login again." };
      } else if (error.response?.status === 404) {
        return { error: "Customer not found." };
      } else {
        return { error: "Failed to retrieve customer data" }; // Generic error
      }
    }
  }
  return null; // No token or other issues
}
