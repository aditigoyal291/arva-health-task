import { cn } from "@/lib/utils";
import axios from "axios";
import { Bookmark, Heart, Loader2, Star } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ShopCard = ({
  shop: {
    _id,
    shopname,
    thumbnail,
    coverImages,
    reviews = 4.6,
    rating,
    distance = 10,
  },
  userLoading,
  user,
}) => {
  const [bookMarkLoading, setBookMarkLoading] = useState(false);
  const [isShopBookmarked, setIsShopBookmarked] = useState(
    user?.bookmarks?.includes(_id)
  );
  
  const handleLike = async (shop_id) => {
    setBookMarkLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/bookmark",
        {
          shop_id: _id,
          user_id: user._id,
        }
      );
      console.log(res.data);
      
      setIsShopBookmarked((prev) => !prev);
      
      toast(res.data.message.title, {
        description: res.data.message.description,
      });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.", {
        description: "An error occurred while bookmarking the shop",
      });
    } finally {
      setBookMarkLoading(false);
      console.log(user);
    }
  };

  return (
    <div className="relative flex flex-col gap-y-2">
      <Link to={`/explore/${_id}`} className="relative h-64 py-6">
        <img
          className="absolute inset-0 -z-10 h-full w-full rounded-3xl object-cover transition-transform"
          src={thumbnail}
          alt={shopname}
        />
      </Link>
      {user.name && (
        <button
          className="absolute -right-2 -top-2 z-20 flex items-center justify-center rounded-full bg-background p-1.5 shadow-md"
          onClick={() => !bookMarkLoading && !userLoading && handleLike(_id)}
        >
          {bookMarkLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Bookmark
              className={cn(
                isShopBookmarked ? "fill-primary" : "stroke-primary stroke-2"
              )}
              size={20}
            />
          )}
        </button>
      )}
      <div className="space-y-1">
        <p className="text-base font-bold truncate">{shopname}</p>
        {/* <span className="text-xs font-semibold">{_id}</span> */}
        <div className="flex justify-start gap-x-3 text-sm">
          <span className="flex items-center gap-x-2 font-medium tabular-nums">
            <Star className="fill-[#e5b80b] stroke-[#e5b80b]" size={16} />{" "}
            <span className="font-bold">{rating}</span>
          </span>
          <span className="font-semibold tabular-nums text-slate-600">
            {reviews} reviews
          </span>
        </div>
        <span className="text-sm font-semibold tabular-nums">
          {distance} miles
        </span>
      </div>
    </div>
  );
};

export default ShopCard;
