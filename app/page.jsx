"use client";
import BGgrid from "@/components/BGgrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { scrapeCompititorsData } from "@/lib/data";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { AlertCircle, Loader } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const HomePage = () => {
  const [data, setData] = useState();
  const [loading, setloading] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();

  const router = useRouter();

  const getInsight = async (e) => {
    setloading(true);
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("username");

    try {
      if (isAuthenticated) {
        const scrapedData = await scrapeCompititorsData(name);
        setData(scrapedData);
        setloading(false);

        router.push("/analytics");
      }
      redirect("/https://spyandgrow.kinde.com/auth/cx/_:nav&m:login&psid:01944bc1dbf49fb217da3ccd1fb6d083");
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
              <AlertCircle size={15} /> only public account can fetched
            </Label>
          </div>

          <Button type="submit" className="p-6 rounded-xl text-base">
            Fetch from instagram
          </Button>
        </form>
      </div>
      <div className="px-20">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader className="animate-spin" />
            <p className="text-center animate-pulse">
              Scraping Data From Instagram... <br />
              Storing in Astra DB
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
