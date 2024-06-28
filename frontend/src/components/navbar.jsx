import React, { useContext, useEffect, useState } from "react";
import Avatar from "boring-avatars";
import { Link } from "react-router-dom";
import { UserContext } from "@/context/auth-context";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";

const Navbar = () => {
  const { user, isLoading, updateUser } = useContext(UserContext);
  const { getCartQty } = useCart();

  const logout = () => {
    localStorage.removeItem("token");
    updateUser({});
    window.location.href = "/";
  };

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
          <Link to="/likes" className="w-20 text-center text-white">
            likes
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
              <button onClick={logout} className="w-20 text-center text-white">
                logout
              </button>
              <Link to="/cart" className="relative mr-2">
                {getCartQty() !== 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ece9ea] text-sm font-medium text-primary">
                    {getCartQty()}
                  </span>
                )}
                <ShoppingCart className="text-white" size={24} />
              </Link>
              <Avatar
                size={40}
                name={user.name || ""}
                r
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                className="h-[6rem] w-[6rem] rounded-full"
              />
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
