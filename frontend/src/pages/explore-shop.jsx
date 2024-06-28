import FoodCard from "@/components/food-card";
import FoodCardSkeleton from "@/components/skeleton/food-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExploreShopPage = () => {
  const { shopid } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const isAuthenticated = !!user.name;

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
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
    <div className="mx-auto my-12 flex max-w-screen-xl flex-col gap-10 px-4 sm:px-6 md:px-4">
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
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array(12)
              .fill(0)
              .map((_, i) => <FoodCardSkeleton key={i} />)
          : shop?.menu.map((fooditem) => (
              <Fragment key={fooditem._id}>
                <FoodCard
                  isAuthenticated={isAuthenticated}
                  fooditem={fooditem}
                  shop={{ shopname: shop.shopname, location: shop.location }}
                />
              </Fragment>
            ))}
        {shop?.menu.length === 0 && (
          <div className="col-span-3">No product found</div>
        )}
      </section>
    </div>
  );
};

export default ExploreShopPage;
