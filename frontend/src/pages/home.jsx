import Blob from "@/components/blob";
import HeroText from "@/components/hero-text";
import LocationPrompt from "@/components/location";
import Location from "@/components/location";
import Navbar from "@/components/navbar";
import ShopCard from "@/components/shop-card";
import ShopCardSkeleton from "@/components/skeleton/shop-card-skeleton";
import { UserContext } from "@/context/auth-context";
import { coffeeShop } from "@/data/data";
import { cn } from "@/lib/utils";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Home = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useContext(UserContext);
  const [isLocationPromptOpen, setLocationPromptOpen] = useState(true);

  const handleLocationPromptClose = () => {
    setLocationPromptOpen(false);
  };
  useEffect(() => {
    const getShops = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/shop/all`
        );

        setShops(res.data.data);
        // setShops(data.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getShops();
  }, []);
  return (
    <div
      className={`h-screen ${isLocationPromptOpen ? "bg-gray-800" : "bg-white"} transition-colors duration-300`}
    >
      <div className={cn("flex flex-col gap-10 px-4 sm:px-6 md:px-4")}>
        <div
          className={`p-6 ${isLocationPromptOpen ? "opacity-50" : "opacity-100"} transition-opacity duration-300`}
        >
          <LocationPrompt
            isOpen={isLocationPromptOpen}
            onClose={handleLocationPromptClose}
          />
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>Your location is being tracked</AlertDescription>
          </Alert>
          <section className="min-h-screen">
            <HeroText />
            {/* <Blob /> */}

            <section className="mx-auto grid max-w-screen-xl grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {loading
                ? Array(12)
                    .fill(0)
                    .map((_, i) => <ShopCardSkeleton key={i} />)
                : shops.map((shop) => {
                    return (
                      <ShopCard
                        key={shop._id}
                        userLoading={isLoading}
                        user={user}
                        shop={shop}
                      />
                    );
                  })}
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
