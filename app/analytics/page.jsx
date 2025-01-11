"use client";
import ChatWithData from "@/components/Chat";
import { Button } from "@/components/ui/button";
import { getUsername, runFlowAnalytics } from "@/lib/data";
import { AlertTriangle, Loader } from "lucide-react";
import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";

const markdown = "### Key Performance Metrics for slashritesh\n#### Consistency Rate: 57.14%\nThe user posts content 4 times a week on average, which is higher than the average user.\n#### Average Engagement Rate: 46%\nThe user's posts receive an average of 46 likes and comments per post, which is higher than the average user.\n#### Average Reach: 58.33%\nThe user's posts reach an average of 58.33% of their followers, which is higher than the average user.\n#### Top Liked Post: \nThe post with the highest number of likes is the one with 148 views and 100 likes, which is a video post."

const AnalyticsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetcheddata, setdata] = useState();

  const getData = async (name) => {
    setLoading(true);
    const data = await runFlowAnalytics(name);
    console.log(data);

    setdata(data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchdata = async () => {
      const usernames = await getUsername();
      setAccounts(usernames);
    };
    fetchdata();
  }, []);

  return (
    <div className="px-20 text-wrap pb-20">
      <h1 className="mb-5 text-2xl">Analytics Dashboard</h1>

      <div className="flex gap-5">
        <div className="flex border p-5 border-slate-600 rounded-xl flex-col w-[800px] gap-5">
          <h1 className="text-xl">Scraped Accounts</h1>
          {accounts.map((name, index) => {
            return (
              <div
                key={index}
                className="p-5 bg-slate-900 rounded-lg flex justify-between items-center border border-slate-600"
              >
                <p>{name}</p>
                <Button onClick={() => getData(name)}>View Analytics</Button>
              </div>
            );
          })}
        </div>

        <div className="w-full min-h-[50vh] items-center flex justify-center rounded-lg p-10 bg-slate-900">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader className="animate-spin" />
              <p className="text-center animate-pulse">
                Running Flow... <br />
                Get Analytics from Api Request...
              </p>
            </div>
          ) : (
            <div>
              {fetcheddata ? (
                <div className="prose prose-invert">
                  <Markdown>{fetcheddata}</Markdown>
                </div>
              ) : (
                <div className="flex justify-between items-center h-full">
                  <div className="flex justify-center items-center flex-col">
                    <h3 className="flex gap-3 mb-5">
                      <AlertTriangle /> No Result Fetched
                    </h3>
                    <p className="w-[40ch] text-center">
                      Add username then get Anaytics On That Stored Data from
                      Social Media.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
