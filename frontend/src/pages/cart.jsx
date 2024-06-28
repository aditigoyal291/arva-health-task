import FoodCard from "@/components/food-card";
import { useCart } from "@/context/cart-context";
import React from "react";

const CartPage = () => {
  const { cart, getCartTotal } = useCart();
  return (
    <div className="my-12 flex flex-col gap-10 px-4 sm:px-6 md:px-4">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="mx-5 space-y-1">
          <h1 className="text-3xl font-bold">Cart</h1>
          <p className="text-gray-500">cartoon</p>
        </div>
      </div>

      {cart.food === 0 ? (
        <p>No food items added</p>
      ) : (
        cart.map((fooditem) => (
          <FoodCard
            key={fooditem._id}
            fooditem={fooditem.food}
            shop={{ shopname: "Test Shop", location: "Test Location" }}
          />
        ))
      )}
      {JSON.stringify(cart, null, 1)}

      <p>Total: ${getCartTotal().toFixed(2)}</p>
    </div>
  );
};

export default CartPage;
