import FoodCard from "@/components/food-card";
import FoodCardSkeleton from "@/components/skeleton/food-card-skeleton";
import { cn } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TestPage = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const shop = {
    shopname: "Test Shop",
    location: "Test Location",
  }
  return (
    <div className={cn("flex flex-col gap-10 px-4 sm:px-6 md:px-4")}>
      <section className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array(12)
              .fill(0)
              .map((_, i) => <FoodCardSkeleton key={i} />)
          : food.map((fooditem) => (
              <FoodCard key={fooditem._id} fooditem={fooditem} shop={shop}/>
            ))}
      </section>
    </div>
  );
};

export default TestPage;
