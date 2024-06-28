import { getCustomerData } from "@/lib/utils";
import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext({ user: {}, isLoading: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set loading state to true initially
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse stored user data
    } else {
      const token = localStorage.getItem("token");

      getCustomerData(token)
        .then((data) => {
          setUser(data || {});
        })
        .finally(() => setIsLoading(false)); // Set loading state to false after fetching
    }
  }, []);

  // Update user data logic (optional)
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useAuth = () => {
  return useContext(UserContext)
}

export { UserContext };
