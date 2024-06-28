import { MapPin, Minus, Plus, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { ItemTypeIcon } from "./food-card";
import { cn } from "@/lib/utils";

const FoodCardMini = ({
  isAuthenticated = false,
  fooditem,
  shop: { shopname },
}) => {
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
    <div className="flex items-center gap-x-4 rounded bg-white p-2">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
        <img
          src={fooditem.photo}
          alt={fooditem.itemName}
          width={80}
          height={80}
          className="h-40 w-40 object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-1 inline-flex items-center gap-x-1 text-lg font-semibold tracking-tight">
          {fooditem.itemName}
          <ItemTypeIcon className="inline font-medium" />
        </h3>
        <p className="flex items-center gap-x-3">
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
          <span className="flex items-center gap-x-1">
            <Zap size={16} />{" "}
            <span className="text-sm font-medium text-foreground">
              {fooditem.calories} Cal
            </span>
          </span>
        </p>
      </div>

      <p className="w-20">&times;{quantity}</p>

      <p className="text-base font-bold tracking-tight">
        ${fooditem.itemPrice}
      </p>

      {isAuthenticated && (
        <AddtoCartButton
          handleDec={handleDec}
          handleInc={handleInc}
          quantity={quantity}
        />
      )}
    </div>
  );
};

export default FoodCardMini;

const AddtoCartButton = ({ quantity, handleDec, handleInc }) => {
  if (quantity === 0) {
    return (
      <button
        onClick={handleInc}
        className="mr-2 flex items-center gap-x-1 rounded-full bg-primary p-2 text-white"
      >
        <Plus size={18} className="storke-2" />
      </button>
    );
  } else {
    return (
      <div className="mr-2 flex items-center gap-x-1 rounded-full bg-primary px-2.5 py-1">
        <button onClick={handleDec} className="rounded-l-full text-white">
          <Minus size={18} />
        </button>
        <span className="text-white">{quantity}</span>
        <button onClick={handleInc} className="rounded-r-full text-white">
          <Plus size={18} />
        </button>
      </div>
    );
  }
};
