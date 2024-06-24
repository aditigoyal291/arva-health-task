import { Heart, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ShopCard = ({
  shop: { _id, name, rating, reviews, distance, image },
}) => {
  const handleLike = (shop_id) => {
    console.log("like");
    console.log(shop_id);
  };
  return (
    <div className="flex flex-col gap-y-2">
      <Link to={`/explore/${_id}`} className="relative h-64 py-6">
        <img
          className="absolute inset-0 h-full -z-10 w-full rounded-3xl object-cover"
          src={image}
          alt={name}
        />
        <button
          className="absolute -right-2 -top-2 z-20 flex items-center justify-center rounded-full bg-background p-1.5"
          onClick={() => handleLike(_id)}
        >
          <Heart
            // className="fill-primary"
            className="stroke-primary stroke-2"
            size={20}
          />
        </button>
      </Link>
      <div className="space-y-1">
        <p className="text-base font-bold">{name}</p>
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
