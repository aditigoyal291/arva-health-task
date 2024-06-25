import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUserData() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
