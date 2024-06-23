import React from "react";
import Avatar from "boring-avatars";
const Navbar = () => {
  return (
    <div className="flex items-center justify-between border-b p-2">
      <img
        src="/images/coffee-logo.jpeg"
        alt=""
        className="h-[5rem] w-[5rem] rounded-full"
      />
      <nav className="flex">
        <ul className="flex items-center gap-4">
          <li>home</li>
          <li>likes</li>
          <li>bookmarks</li>
          <li>explore</li>
        </ul>
      </nav>
      <Avatar
        size={60}
        name="Maria Mitchell"

        variant="beam"
        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        className="rounded-full h-[6rem] w-[6rem]  "
      />
      
    </div>
  );
};

export default Navbar;
