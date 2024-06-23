import React from "react";
import { Button } from "./ui/button";

const HeroText = () => {
  return(
    <div className="flex flex-col items-center justify-center  text-primary">
      <h1 className="text-6xl font-bold">Welcome to Coffee House</h1>
      <p className="text-xl">The best place to find your favorite coffee</p>
    </div>
  )
};

export default HeroText;
