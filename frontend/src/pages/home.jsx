import HeroText from "@/components/hero-text";
import Navbar from "@/components/navbar";
import CoffeeShopHome from "@/components/ui/coffee-shop-home";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col gap-10">
      <Navbar />
      <HeroText />
      <div className="grid grid-cols-4 gap-x-3 max-w-screen-lg mx-auto gap-y-10">
        <CoffeeShopHome />
        <CoffeeShopHome />
        <CoffeeShopHome />
        <CoffeeShopHome />
        <CoffeeShopHome />
        <CoffeeShopHome />
      </div>
    </div>
  );
};

export default Home;
