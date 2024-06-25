import { UserContext } from "@/context/auth-context";
import React, { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user.name) {
    window.location.href = "/auth/login";
  }
  return <>{children}</>;
};

export default PrivateRoute;
