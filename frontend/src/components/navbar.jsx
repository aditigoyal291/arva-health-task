import React, { useContext, useEffect, useState } from "react";
import Avatar from "boring-avatars";
import { Link } from "react-router-dom";
import { UserContext } from "@/context/auth-context";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import axios from "axios";
import { MapPin, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";

const Navbar = () => {
  const { user, isLoading, updateUser } = useContext(UserContext);
  const [currLocation, setCurrLocation] = useState({});
  const { getCartQty } = useCart();

  const logout = () => {
    localStorage.removeItem("token");
    updateUser({});
    window.location.href = "/";
  };
  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrLocation(location.data);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="bg-primary px-4 py-1 shadow-sm sm:px-6 md:px-4">
      <nav
        className="mx-auto flex max-w-screen-xl items-center justify-between"
        aria-label="Global"
      >
        <Link to="/" className="">
          <img
            src="/images/logo.png"
            alt="coffee logo"
            width={50}
            height={50}
            className=""
          />
          <span className="sr-only">Home page</span>
        </Link>

        <ul className="flex flex-1 items-center justify-center gap-4 capitalize">
          <Link to="/" className="w-20 text-center text-white">
            home
          </Link>
          <Link to="/bookmarks" className="w-20 text-center text-white">
            bookmarks
          </Link>
          <Link to="/explore" className="w-20 text-center text-white">
            explore
          </Link>
        </ul>
        <div className="flex items-center gap-x-2">
          {user.name ? (
            <>
              <div className="flex items-center gap-x-10">
                <div className="flex gap-1">
                  <MapPin className="size-[15px] text-white" />
                  <p className="text-sm text-white">{currLocation.city}</p>
                </div>
                <Link to="/cart" className="relative mr-2">
                  {getCartQty() !== 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ece9ea] text-sm font-medium text-primary">
                      {getCartQty()}
                    </span>
                  )}
                  <ShoppingCart className="text-white" size={20} />
                </Link>
              </div>
              <HoverCard>
                <HoverCardTrigger>
                  <Avatar
                    size={40}
                    name={user.name || ""}
                    r
                    variant="beam"
                    colors={[
                      "#92A1C6",
                      "#146A7C",
                      "#F0AB3D",
                      "#C271B4",
                      "#C20D90",
                    ]}
                    className="rounded-full"
                  />
                </HoverCardTrigger>
                <HoverCardContent>
                  <section className="flex flex-col gap-y-2">
                    <p className="rounded-lg border p-1.5 hover:shadow-xl">
                      {user.name}
                    </p>
                    <p className="rounded-lg border p-1.5 hover:shadow-xl">
                      {user.email}
                    </p>
                    <div className="flex w-full justify-between gap-x-3">
                      <button
                        className="w-full rounded-lg border p-1.5 hover:shadow-xl"
                        onClick={logout}
                      >
                        Logout
                      </button>
                      <button className="w-full rounded-lg border p-1.5 hover:shadow-xl">
                        Profile
                      </button>
                    </div>
                  </section>
                </HoverCardContent>
              </HoverCard>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="w-20 text-center text-white">
                login
              </Link>
              <Link to="/auth/signup" className="w-20 text-center text-white">
                signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
