"use client";
import BGgrid from "@/components/BGgrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { scrapeCompititorsData } from "@/lib/data";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const HomePage = () => {
  const [data, setData] = useState();
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const getInsight = async (e) => {
    setloading(true);
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("username");

    try {
      const scrapedData = await scrapeCompititorsData(name);
      

      setData(scrapedData);
      setloading(false);

      router.push("/analytics");
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
          <div>
            <Input
              name="username"
              placeholder="Enter Compititors Instrgram Id"
              className="w-96 mb-2 text-base rounded-xl p-6"
            />
            <Label className="text-sm flex gap-2 items-center mx-3 text-slate-500">
              {" "}
              <AlertCircle size={15} /> only public account can fetched
            </Label>
          </div>

          <Button type="submit" className="p-6 rounded-xl text-base">
            Fetch from instagram
          </Button>
        </form>
      </div>
      <div className="px-20">
        {loading ? <p>..fetching Data From Instagram</p> : (
          <div>

          </div>)}
      </div>
    </main>
  );
};

export default HomePage;
