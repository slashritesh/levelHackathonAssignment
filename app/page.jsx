"use client";
import BGgrid from "@/components/BGgrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScanSearch } from "lucide-react";
import React from "react";


const HomePage = () => {
  return (
    <main className="h-screen">
      <BGgrid />
      <div className="px-20 flex justify-center items-center flex-col">
        <h1 className="text-5xl mt-16 font-medium text-center">Build Data Driven Social Media <br />AI powered Strategy to Grow Business</h1>
        <div className="flex gap-5 py-20">
          <Input placeholder="Enter Compititors Instrgram Id" className="w-96 text-base rounded-xl p-6" />
          <Button className="p-6 rounded-xl text-base">Get Insights</Button>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
