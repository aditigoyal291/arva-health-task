import Blob from "@/components/blob";
import HeroText from "@/components/hero-text";
import LocationPrompt from "@/components/location";
import ShopCard from "@/components/shop-card";
import ShopCardSkeleton from "@/components/skeleton/shop-card-skeleton";
import { UserContext } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useContext(UserContext);
  const [isLocationPromptOpen, setLocationPromptOpen] = useState(false);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveLocation, showError);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }, []);
  const saveLocation = (position) => {
    const userLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    localStorage.setItem("userLocation", JSON.stringify(userLocation));
    setLocation(userLocation);
  };

  
  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An error occurred.");
    }
  };

  const handleLocationPromptClose = async () => {
    setLocationPromptOpen(true);
    toast("Location access granted", {
      description: "You have successfully granted location access",
    });
    const location = await axios.get("https://ipapi.co/json");
    // console.log("Location:", location);
    setCurrLocation(location.data);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(saveLocation, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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

  const [currLocation, setCurrLocation] = useState({});
  return (
    <div>
      <div className={cn("flex flex-col gap-10 px-4 sm:px-6 md:px-4")}>
        <div
          className={`p-6 ${!isLocationPromptOpen ? "" : "opacity-100"} transition-opacity duration-300`}
        >
          {!location && (
            <LocationPrompt
              isOpen={!isLocationPromptOpen}
              onClose={handleLocationPromptClose}
            />
          )}
        </div>
        <div
         
        >
          <section className="min-h-screen">
            
            <HeroText />
            <p>{currLocation.city}</p>
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
