import FoodCardMini from "@/components/food-card-mini";
import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import axios from "axios";
import Avatar from "boring-avatars";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user } = useAuth();
  const { cart, getCartQty } = useCart();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/me-id",
        { user_id: user._id }
      );
      console.log(response.data);
      setUserData(response.data);
    })();
  }, []);

  return (
    <div>
      {/* {JSON.stringify(userData, null, 1)} */}
      <div className="relative">
        <img
          src="/images/profile-bg.jpg"
          alt="profile-bg"
          className="top-0 h-56 w-full object-cover"
        />
      </div>
      <div className="mx-auto max-w-screen-xl -translate-y-40 p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded border border-primary/20 bg-white py-2">
            <div className="my-2 flex flex-col items-center justify-between">
              <Avatar
                size={120}
                name={user.name || ""}
                r
                variant="beam"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                className="cursor-pointer rounded-full"
              />
              <p className="text-xl font-semibold">{user.name}</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>

            <div className="flex items-center justify-between border-t border-primary/20 px-5 py-2.5">
              <p className="font-medium tracking-tight">Orders</p>
              <p className="font-bold">0</p>
            </div>

            <div className="flex items-center justify-between border-t border-primary/20 px-5 py-2.5">
              <p className="font-medium tracking-tight">Cart</p>
              <p className="font-bold">{getCartQty()}</p>
            </div>

            <div className="flex items-center justify-between border-t border-primary/20 px-5 py-2.5">
              <p className="font-medium tracking-tight">Reviews</p>
              <p className="font-bold">{0}</p>
            </div>
          </div>
          <Tabs cart={cart} orders={user?.orders} reviews={user?.reviews} />
        </div>
      </div>
    </div>
  );
};

const Tabs = ({ cart = {}, orders = {}, reviews = {} }) => {
  const [activeTab, setActiveTab] = useState("cart");

  const availableTabs = [
    { slug: "cart" },
    { slug: "order" },
    { slug: "review" },
  ];

  return (
    <div className="rounded bg-white md:col-span-2">
      <div className="px-5.5 flex gap-x-4 border-b border-primary/20 p-5">
        {availableTabs.map((tabs) => (
          <button
            key={tabs.slug}
            onClick={() => setActiveTab(tabs.slug)}
            className={cn(
              "pb-2 text-primary/20",
              tabs.slug === activeTab &&
                "border-b-2 border-primary font-semibold text-primary"
            )}
          >
            {tabs.slug}
          </button>
        ))}
      </div>
      <CartTab cart={cart} shouldDisplay={"cart" === activeTab} />
      <OrdersTab orders={orders} shouldDisplay={"order" === activeTab} />
      <ReviewTab reviews={reviews} shouldDisplay={"review" === activeTab} />
    </div>
  );
};

const ReviewTab = ({ reviews, shouldDisplay = false }) => {
  if (shouldDisplay) {
    return (
      <div className="p-5">
        <div className="flex flex-col gap-y-4">
          {reviews?.length == 0 && <p>No reviews</p>}
        </div>
      </div>
    );
  }
};

const CartTab = ({ cart, shouldDisplay = false, isAuthenticated = true }) => {
  if (shouldDisplay) {
    return (
      <div className="p-5">
        <div className="flex flex-col gap-y-4">
          {cart.food === 0 ? (
            <p>No food items added</p>
          ) : (
            cart.map((fooditem) => (
              <FoodCardMini
                key={fooditem._id}
                isAuthenticated={isAuthenticated}
                fooditem={fooditem.food}
                shop={{
                  shopname: "Test Shop",
                  location: "Test Location",
                }}
              />
            ))
          )}
        </div>
      </div>
    );
  }
};

const OrdersTab = ({ orders, shouldDisplay = false }) => {
  if (shouldDisplay) {
    return (
      <div className="p-5">
        <div className="flex flex-col gap-y-4">
          {orders?.length == 0 && <p>No orders</p>}
        </div>
      </div>
    );
  }
};

export default ProfilePage;
