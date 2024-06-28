import FoodCard from "@/components/food-card";
import FoodCardSkeleton from "@/components/skeleton/food-card-skeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExploreShopPage = () => {
  const { shopid } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/v1/fooditems/shop/${shopid}`
        );
        setFood(response.data.data);
        // console.log(shop);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [shopid]);

  return (
    <div className="flex flex-col mt-6 gap-10 px-4 sm:px-6 md:px-4">
      <section className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array(12)
              .fill(0)
              .map((_, i) => <FoodCardSkeleton key={i} />)
          : food?.map((fooditem) => (
              <FoodCard key={fooditem._id} fooditem={fooditem} />
            ))}
      </section>
    </div>
  );
};

export default ExploreShopPage;


