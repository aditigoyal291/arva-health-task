import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import {
  Coffee,
  CookingPot,
  CupSoda,
  MapPin,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";

const FoodCard = ({isAuthenticated=false, fooditem, shop: { shopname } }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const cartItem = cart.find((item) => item.food._id === fooditem._id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [cart, cartItem]);

  const handleInc = () => {
    addToCart(fooditem);
  };

  const handleDec = () => {
    if (quantity > 0) {
      removeFromCart(fooditem._id);
    }
  };

  return (
    <div className="relative flex gap-x-4 w-full rounded-lg bg-white p-2">
      <div className="h-40 w-40 shrink-0 overflow-hidden rounded-lg">
        <img
          src={fooditem.photo}
          alt={fooditem.itemName}
          width={160}
          height={160}
          className="h-40 w-40 object-cover"
        />
      </div>

      <div className="relative flex w-full flex-col space-y-0.5">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-xl font-bold tracking-tight">
            {fooditem.itemName}
          </h3>
          <span
            className={cn(
              "flex items-center justify-center rounded border-2",
              fooditem.diet === "veg" ? "border-teal-600" : "border-red-600"
            )}
          >
            <span
              className={cn(
                "m-1 h-2 w-2 rounded-full",
                fooditem.diet === "veg" ? "bg-teal-600" : "bg-red-600"
              )}
            />
          </span>
        </div>

        <div>
          <p className="flex items-center gap-x-2">
            <MapPin size={16} />{" "}
            <span className="text-sm font-medium text-foreground">
              {shopname}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          {fooditem.tags &&
            fooditem.tags.map((tag, i) => (
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
            <span>{fooditem.ratings}</span>
          </span>
          <span>|</span>
          <span className="text-xs font-medium">{fooditem.calories} Kal</span>
          <span>|</span>
          <span className="flex items-center gap-x-1">
            <ItemTypeIcon itemType={fooditem.itemType} />
            <span className="text-xs font-medium">{fooditem.itemType}</span>
          </span>
        </div>

        <div className="flex flex-1 items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            ₹{fooditem.itemPrice}
          </span>
          {isAuthenticated &&
          <AddtoCartButton
            handleDec={handleDec}
            handleInc={handleInc}
            quantity={quantity}
          />
          }
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

export const AddtoCartButton = ({ quantity, handleDec, handleInc }) => {
  if (quantity === 0) {
    return (
      <button
        onClick={handleInc}
        className="mr-2 flex items-center gap-x-1 rounded-full bg-primary px-2.5 py-0.5 text-white"
      >
        <Plus size={18} /> <span>Add</span>
      </button>
    );
  } else {
    return (
      <div className="mr-2 flex items-center gap-x-1 rounded-full bg-primary px-2.5 py-0.5">
        <button
          onClick={handleDec}
          className="rounded-l-full px-0.5 py-0.5 text-white"
        >
          <Minus size={18} />
        </button>
        <span className="w-2 text-white">{quantity}</span>
        <button
          onClick={handleInc}
          className="rounded-r-full px-1 py-0.5 text-white"
        >
          <Plus size={18} />
        </button>
      </div>
    );
  }
};

export const ItemTypeIcon = ({ itemType }) => {
  if (itemType === "drinks") return <CupSoda size={14} />;
  else if (itemType === "coffee") return <Coffee size={14} />;
  else return <CookingPot size={14} />;
};
