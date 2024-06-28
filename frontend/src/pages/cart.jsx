import FoodCard from "@/components/food-card";
import { useCart } from "@/context/cart-context";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FoodCardMini from "@/components/food-card-mini";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { cart, getCartTotal, getCartQty } = useCart();
  const { user } = useAuth();

  const isAuthenticated = !!user.name;
  return (
    <div className="mx-auto my-12 flex flex-col gap-10 px-4 sm:px-6 md:px-4">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="mx-5 space-y-1">
          <h1 className="text-3xl font-bold">Cart</h1>
          <p className="text-gray-500">Take a look at your cart ✌️</p>
        </div>
      </div>

      <section className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-y-4">
          {cart.food === 0 ? (
            <p>No food items added</p>
          ) : (
            cart.map((fooditem) => (
              <FoodCard
                isAuthenticated={isAuthenticated}
                key={fooditem._id}
                fooditem={fooditem.food}
                // foodquantity={fooditem.quantity}
                shop={{ shopname: "Test Shop", location: "Test Location" }}
              />
            ))
          )}
        </div>

        <aside className="">
          <div className="sticky top-16 rounded-lg bg-white p-4">
            <h2 className="text-lg font-semibold tracking-tighter">Summary</h2>
            <hr className="my-4" />

            <div className="mb-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold">{getCartQty()} Items</AccordionTrigger>
                  <AccordionContent>
                    {cart.map((fooditem) => (
                      <FoodCardMini
                        key={fooditem._id}
                        isAuthenticated={false}
                        fooditem={fooditem.food}
                        shop={{
                          shopname: "Test Shop",
                          location: "Test Location",
                        }}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <table className="w-full text-sm">
              <tr className="flex w-full items-center justify-between">
                <td className="flex-1 font-semibold">
                  Products Total ({getCartQty()})
                </td>
                <td>${getCartTotal().toFixed(2)}</td>
              </tr>
              <tr className="flex w-full items-center justify-between">
                <td className="flex-1 font-semibold">Bundle Discount</td>
                <td>${(0.0).toFixed(2)}</td>
              </tr>
              <tr className="flex w-full items-center justify-between">
                <td className="flex-1 font-semibold">FREE Shipping</td>
                <td>Always</td>
              </tr>
              <hr className="my-4 border-slate-400" />
              <tr className="flex w-full items-center justify-between">
                <td className="flex-1 font-semibold">Total</td>
                <td className="font-semibold ">${getCartTotal().toFixed(2)}</td>
              </tr>
            </table>

            <div className="my-2">
              <Button className="w-full rounded-xl">
                Place Order
              </Button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default CartPage;
