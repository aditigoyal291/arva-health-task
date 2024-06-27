import FoodCard from "@/components/food-card";
import ShopCard from "@/components/shop-card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExploreShopPage = () => {
  const { shopid } = useParams();

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/shop/${shopid}`
        );
        setShop(response.data.data); 
      } catch (err) {
        console.error(err);
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [shopid]);

  return (
    <div>
      {shop ? (
        <section className="mx-auto grid max-w-screen-xl grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {shop.menu.map((fooditem, i) => (
            <FoodCard key={i} fooditem={fooditem} />
          ))}
        </section>
      ) : (
        <p>Shop not found</p>
      )}
    </div>
  );
};

export default ExploreShopPage;
