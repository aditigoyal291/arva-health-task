import React from "react";

const CoffeeShopHome = () => {
  return (
    // <div className="flex flex-col items-center justify-center bg-red-500 text-primary">
    //   <img src="/images/coffee-2.jpeg" alt="" className="rounded-3xl" />
    //   <img
    //     src="/images/heart-primary.svg"
    //     alt=""
    //     className="absolute right-0 top-0 rounded-full bg-background p-1"
    //   />
    // </div>

    <div className="relative flex flex-col items-center rounded ">
      <div className="relative">
        <img
          src="/images/coffee-2.jpeg"
          className="h-full rounded-3xl"
          alt=""
        />
        <button className="absolute -top-2 -right-2 bg-background rounded-full p-1.5">
          <img src="/images/heart-primary.svg" alt="" className="" />
        </button>
      </div>
      
    
    </div>
  );
};

export default CoffeeShopHome;
