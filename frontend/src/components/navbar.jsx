import React from "react";
import Avatar from "boring-avatars";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="shadow-sm bg-primary px-4 py-1 sm:px-6 md:px-0">
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
          <Link to="/auth/login" className="w-20 text-center text-white">
            login
          </Link>
          <Link to="/auth/signup" className="w-20 text-center text-white">
            signup
          </Link>
          {/* {!user ? (
            <>
              <Link to="/auth/login" className="w-20 text-center text-white">
                login
              </Link>
              <Link to="/auth/signup" className="w-20 text-center text-white">
                signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-20 text-center text-white"
            >
              logout
            </button>
          )} */}
        </ul>
          <Avatar
            size={40}
            name={"username"}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            className="h-[6rem] w-[6rem] rounded-full"
          />
        
      </nav>
    </div>
  );
};

export default Navbar;