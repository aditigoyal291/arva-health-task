import Blob from "@/components/blob";
import HeroText from "@/components/hero-text";
import Navbar from "@/components/navbar";
import ShopCard from "@/components/shop-card";
import { coffeeShop } from "@/data/data";
import { cn } from "@/lib/utils";
import React from "react";

const Home = () => {
  return (
    <div className={cn("flex flex-col gap-10 px-4 sm:px-6 md:px-0")}>
      <section className="min-h-screen">
        <HeroText />
        {/* <Blob /> */}
        <section className="mx-auto grid max-w-screen-xl grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {coffeeShop.map((shop) => (
            <ShopCard key={shop._id} shop={shop} />
          ))}
        </section>
      </section>
    </div>
  );
};

export default Home;
