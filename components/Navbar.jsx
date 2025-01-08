import { ScanSearch } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="px-20 justify-between items-center flex gap-3 py-8">
      <div className="flex gap-3 items-center">
        <ScanSearch size={40} className="text-orange-500" />
        <h1 className="text-2xl text-white font-medium ">
          <span className="text-orange-500">Spy</span>&Grow.
        </h1>
      </div>
      <div>
        <Button className="text-base hover:bg-orange-600 p-6 rounded-xl">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
