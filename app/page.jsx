"use client";
import BGgrid from "@/components/BGgrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scrapeCompititorsData } from "@/lib/data";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HomePage = () => {
  const [data, setData] = useState();
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const getInsight = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("username");

    console.log(name);

    try {
      const scrapedData = await scrapeCompititorsData(name);
      if (!scrapedData) {
        setloading(true);
      }

      setloading(false);
      setData(scrapedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-screen">
      <BGgrid />
      <div className="px-20 flex justify-center items-center flex-col">
        <h1 className="text-5xl mt-16 font-medium text-center">
          Build Data Driven Social Media <br />
          AI powered Strategy to Grow Business
        </h1>
        <form method="POST" onSubmit={getInsight} className="flex gap-5 py-20">
          <Input
            name="username"
            placeholder="Enter Compititors Instrgram Id"
            className="w-96 text-base rounded-xl p-6"
          />
          <Button type="submit" className="p-6 rounded-xl text-base">
            Fetch User
          </Button>
        </form>
      </div>
      <div className="px-20">
        {loading ? "...fetching data" : <div>{JSON.stringify(data)}</div>}
      </div>
    </main>
  );
};

export default HomePage;
