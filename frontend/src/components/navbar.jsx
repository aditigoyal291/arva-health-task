import React, { useContext, useEffect, useState } from "react";
import Avatar from "boring-avatars";
import { Link } from "react-router-dom";
import { UserContext } from "@/context/auth-context";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import axios from "axios";

const Navbar = () => {
  const { user, isLoading, updateUser } = useContext(UserContext);
  const [currLocation, setCurrLocation] = useState({});

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
          <Link to="/cart" className="w-20 text-center text-white">
            cart
          </Link>
          <Link to="/bookmarks" className="w-20 text-center text-white">
            bookmarks
          </Link>
          <Link to="/explore" className="w-20 text-center text-white">
            explore
          </Link>
        </ul>
        <div className="flex items-center gap-x-2">
          {isLoading && <p>Loading...</p>}
          {user.name ? ( // Check if customer object has a 'name' property
            <>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-map-pin"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-white">{currLocation.city}</p>
              </div>
              <HoverCard>
                <HoverCardTrigger>
                  <Avatar
                    size={40}
                    name={user.name || ""} // Use customer name for avatar
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
