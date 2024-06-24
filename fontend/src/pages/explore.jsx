import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ExplorePage = () => {
  const { shopid } = useParams();

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/shop/${shopid}`
        );
        setShop(response.data.data); // Accessing the data object
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Error fetching shop data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [shopid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {shop ? (
        <div>
          <h1>{shop.name}</h1>
          <p>{shop.description}</p>
        </div>
      ) : (
        <p>Shop not found</p>
      )}
    </div>
  );
};

export default ExplorePage;
