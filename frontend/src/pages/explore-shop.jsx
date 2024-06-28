import FoodCard from "@/components/food-card";
import FoodCardSkeleton from "@/components/skeleton/food-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExploreShopPage = () => {
  const { shopid } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/v1/shop/${shopid}`
        );
        setShop(response.data.data);
        console.log(shop);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [shopid]);

  return (
    <div className="my-12 flex flex-col gap-10 px-4 sm:px-6 md:px-4">
      <div className="mx-auto w-full max-w-screen-xl">
        {loading ? (
          <div className="mx-5 space-y-3">
            <Skeleton className="h-12 w-full bg-white/80 md:w-1/2" />
            <Skeleton className="h-6 w-full bg-white/80" />
          </div>
        ) : (
          <div className="mx-5 space-y-1">
            <h1 className="text-3xl font-bold">{shop?.shopname}</h1>
            <p className="text-gray-500">{shop?.email}</p>
          </div>
        )}
      </div>
      <section className="mx-auto grid max-w-screen-xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array(12)
              .fill(0)
              .map((_, i) => <FoodCardSkeleton key={i} />)
          : shop?.menu.map((fooditem) => (
              <FoodCard
                key={fooditem._id}
                fooditem={fooditem}
                shop = {{shopname: shop.shopname, location: shop.location}}
              />
            ))}
      </section>
    </div>
  );
};

export default ExploreShopPage;
