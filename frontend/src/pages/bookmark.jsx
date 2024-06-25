import { UserContext } from "@/context/auth-context";
import { useContext } from "react";
const BookmarkPage = () => {
  const { user } = useContext(UserContext);
  if (!user.name) {
    window.location.href = "/auth/login";
  }
  console.log(!user);
  return <div>{JSON.stringify(user)}</div>;
};

export default BookmarkPage;
