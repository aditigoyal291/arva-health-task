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
      return data?.data;
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



export async function getDistance(origin, destination, apiKey){
  try {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status !== "OK") {
      throw new Error("Error fetching data from Google Maps API");
    }

    const distance = response.data.rows[0].elements[0].distance.text;
    const duration = response.data.rows[0].elements[0].duration.text;

    return {
      distance: distance,
      duration: duration,
    };
  } catch (error) {
    console.error("Error calculating distance:", error);
    throw error;
  }
};