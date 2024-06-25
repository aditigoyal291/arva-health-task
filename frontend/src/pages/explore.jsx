import * as React from "react";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";

const ExplorePage = () => {
  const [filter, setFilter] = useState("All");
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/fooditems/all`
        );
        setFoodItems(response.data.data);
      } catch (error) {
        console.log(error);
        // err.response ? err.response.data.message : "Error fetching food items"
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItems();
  }, []);

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredItems =
    filter === "All"
      ? foodItems
      : foodItems.filter((item) => item.itemType === filter);

  return (
    <div className="flex flex-col">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-x-5 gap-y-5">
        <div className="mt-5 flex flex-col items-center gap-10">
          <Carousel className="max-w-[65rem] rounded-md">
            <CarouselContent className="">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="rounded-lg">
                      <CardContent className="flex items-center justify-center">
                        <span className="text-2xl font-semibold">
                          <img
                            src="/images/coffee-2.jpeg"
                            alt=""
                            className="h-[20rem] w-[30rem] rounded-lg"
                          />
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-3xl font-bold">The Latte Shop</h1>
          <p>
            ⭐ 4.2 <span className="">420 reviews</span>
          </p>
          <p>📍 420 Street, City</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex w-[50%] items-center justify-between gap-x-4">
            <div onClick={() => handleFilterChange("coffee")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-coffee"
              >
                <path d="M10 2v2" />
                <path d="M14 2v2" />
                <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                <path d="M6 2v2" />
              </svg>
              <h1>Coffee</h1>
            </div>
            <div onClick={() => handleFilterChange("drinks")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-cup-soda"
              >
                <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" />
                <path d="M5 8h14" />
                <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
                <path d="m12 8 1-6h2" />
              </svg>
              <h1>Drinks</h1>
            </div>
            <div onClick={() => handleFilterChange("food")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-croissant"
              >
                <path d="m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z" />
                <path d="m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83" />
                <path d="M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4" />
                <path d="m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2" />
                <path d="M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5" />
              </svg>
              <h1>Food</h1>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={() => handleFilterChange("All")}
            className="rounded-lg bg-primary px-4 py-2 text-white"
          >
            Remove All Filters
          </button>
        </div>

        <div className="mt-5 flex flex-col items-center">
          <div className="grid grid-cols-2 gap-8 gap-x-20">
            {filteredItems.map((item) => (
              <div
                key={item.itemName}
                className="flex items-center justify-between gap-2 rounded-xl bg-red-300 p-5"
              >
                <img src={item.photo} alt="" className="rounded-xl" />
                <div className="flex flex-col text-lg font-semibold">
                  <h1>{item.itemName}</h1>
                  <p className="text-sm">{item.description}</p>
                  <p> ${item.itemPrice}</p>
                  <p>{item.itemType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {JSON.stringify(filteredItems, null, 2)}
    </div>
  );
};

export default ExplorePage;
