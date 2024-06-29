import FoodCard from "@/components/food-card";
import FoodCardSkeleton from "@/components/skeleton/food-card-skeleton";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ExplorePage = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const isAuthenticated = !!user.name;

  useEffect(() => {
    const getFood = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/v1/fooditems/all"
        );
        setFood(response.data.data);
        console.log(food);

        if (!response.data.success) {
          toast(response.data.message.title, {
            description: response.data.message.description,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFood();
  }, []);

  // const shop = {
  //   shopname: "Test Shop",
  //   location: {
  //     longitude: 40.33,
  //     latitude: 32.33,
  //   },
  // };

  return (
    <div className="mx-auto my-12 flex flex-col gap-10 px-4 sm:px-6 md:px-4">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="mx-5 space-y-1">
          <h1 className="text-3xl font-bold">Explore</h1>
          <p className="text-gray-500">
            Let&apos;s see what is happening around you
          </p>
        </div>
      </div>

      <section className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array(12)
              .fill(0)
              .map((_, i) => <FoodCardSkeleton key={i} />)
          : food.map((fooditem) => (
              <FoodCard
                isAuthenticated={isAuthenticated}
                key={fooditem._id}
                fooditem={fooditem}
              />
            ))}
      </section>
    </div>
  );
};

export default ExplorePage;
