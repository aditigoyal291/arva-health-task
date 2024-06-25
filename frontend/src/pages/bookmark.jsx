import ShopCard from "@/components/shop-card";
import ShopCardSkeleton from "@/components/skeleton/shop-card-skeleton";
import { UserContext } from "@/context/auth-context";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const BookmarkPage = () => {
  const { user } = useContext(UserContext);
  const [bookmarkedShops, setBookmarkedShops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBookmarkedShops = async () => {
      if (!user?._id) return; // Ensure user._id is available before making the API call

      setLoading(true);
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/users/bookmark-shop`,
          { user_id: user._id }
        );
        console.log(res.data);
        setBookmarkedShops(res.data.data.bookmarks);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getBookmarkedShops();
  }, [user?._id]); // Add user._id to the dependency array to trigger the effect when it changes

  return (
    <div>
      {/* {JSON.stringify(user)}
      {loading ? "loading" : "not loading"}
      {JSON.stringify(bookmarkedShops)} */}

      <section className="container mx-auto my-16">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Bookmarked Shops
        </h1>

        <section className="mx-auto my-6 grid max-w-screen-xl grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {loading
            ? Array(20)
                .fill(0)
                .map((_, i) => <ShopCardSkeleton key={i} />)
            : bookmarkedShops.map((shop) => (
                <ShopCard
                  key={shop._id}
                  userLoading={loading}
                  user={user}
                  shop={shop}
                />
              ))}
        </section>
      </section>
    </div>
  );
};

export default BookmarkPage;
