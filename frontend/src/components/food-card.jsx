import { cn } from "@/lib/utils";
import { MapPin, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";

const FoodCard = ({
  fooditem: {
    itemName,
    itemPrice,
    photo,
    shop: { shopname, location },
    itemType,
    tags,
    diet,
    calories,
    ratings = 4.5,
  },
}) => {
  // const [foodItemData, setFoodItemData] = useState({})
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="relative flex gap-x-4 rounded-lg bg-white p-2">
      <div className="h-40 w-40 shrink-0 overflow-hidden rounded-lg">
        <img
          src={photo}
          alt={itemName}
          widht={160}
          height={160}
          className="h-40 w-40 object-cover"
        />
      </div>

      <div className="relative flex w-full flex-col space-y-0.5">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-xl font-bold tracking-tight">
            {itemName}
          </h3>
          <span
            className={cn(
              "flex items-center justify-center rounded border-2",
              diet === "veg" ? "border-teal-600" : "border-red-600"
            )}
          >
            <span
              className={cn(
                "m-1 h-2 w-2 rounded-full",
                diet === "veg" ? "bg-teal-600" : "bg-red-600"
              )}
            />
          </span>
        </div>

        <div>
          {/* <p className="text-sm font-medium text-foreground">{shopname}</p> */}
          <p className="flex items-center gap-x-2">
            <MapPin size={16} />{" "}
            <span className="text-sm font-medium text-foreground">
              {/* {location} */}
              {shopname}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          {tags &&
            tags.split(",").map((tag, i) => (
              <span
                key={i}
                className="rounded border px-2 py-0.5 text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
        </div>

        <div className="flex items-center gap-x-2">
          <span className="flex items-center gap-x-1 rounded border border-[#e5b80b] px-2 py-0.5 text-xs font-semibold">
            <Star size={12} className="fill-[#e5b80b] stroke-[#e5b80b]" />{" "}
            <span>{ratings}</span>
          </span>
          <span>|</span>
          <span className="text-sm font-medium">{calories} Kal</span>
        </div>

        <div className="flex min-w-52 flex-1 items-center justify-between">
          <span className="text-xl font-bold tracking-tight">₹{itemPrice}</span>
          <AddtoCartButton quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

const AddtoCartButton = ({ quantity, setQuantity }) => {
  const handleInc = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDec = () => {
    if (quantity === 0) {
      return;
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  if (quantity === 0) {
    return (
      <button
        onClick={handleInc}
        className="flex items-center gap-x-1 rounded-full bg-primary px-2.5 py-0.5 text-white"
      >
        <Plus size={18} /> <span>Add</span>
      </button>
    );
  } else {
    return (
      <div className="flex items-center gap-x-1 rounded-full bg-primary px-2.5 py-0.5">
        <button className="rounded-l-full px-0.5 py-0.5 text-white">
          <Minus size={18} onClick={handleDec} />
        </button>
        <span className="w-2 text-white">{quantity}</span>
        <button className="rounded-r-full px-1 py-0.5 text-white">
          <Plus size={18} onClick={handleInc} />
        </button>
      </div>
    );
  }
};
