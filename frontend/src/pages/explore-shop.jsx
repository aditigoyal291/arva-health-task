import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExploreShopPage = () => {
  const { shopid } = useParams();

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/shop/${shopid}`
        );
        console.log(response.data.data)
        setShop(response.data.data); // Accessing the data object
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
        <div>
          <h1>{shop.shopname}</h1>
          <p>{shop.email}</p>
          <p>{shop.thumbnail}</p>
          <p>{shop.location}</p>
        </div>
      ) : (
        <p>Shop not found</p>
      )}
    </div>
  );
};

export default ExploreShopPage;
