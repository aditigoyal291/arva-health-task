import { useAuth } from "@/context/auth-context";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/me-id", {user_id: user._id}
      );
      console.log(response.data);
      setUserData(response.data);
    })();
  }, []);

  return (
    <div>
      ProfilePage
      {JSON.stringify(userData, null, 1)}
    </div>
  );
};

export default ProfilePage;
