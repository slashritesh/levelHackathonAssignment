"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./db";
import { generateObject } from "ai";

export const scrapeCompititorsData = async (input) => {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    console.log("scaping data...");
    const res = await fetch("http://localhost:3000/api/scrape/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resultsLimit: 10,
        skipPinnedPosts: false,
        username: [input],
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    // console.log(data);

    console.log("storing data...");

    const storeddata = await prisma.compititor.create({
      data: {
        userId: user.id,
        post_data: JSON.stringify(data),
        username: input,
      },
    });

    console.log(storeddata);

    console.log("Complete...");

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Log the error message
    } else {
      console.log("An unknown error occurred"); // If the error is null or undefined
    }
  }
};

export const getUsername = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  try {
    const compititors = await prisma.compititor.findMany({
      where: { userId: user.id },
    });

    const username = compititors.map((comps) => comps.username);

    return username;
  } catch (error) {
    console.log(error);
  }
};

export const runFlowAnalytics = async (input) => {
  try {
    const res = await fetch("https://spygrow-ai.onrender.com/run-flow/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
      }),
    });

    if (!res.ok) {
      return {message : "internal server error from astradb"}
    }

    const data = await res.json();
    console.log(data);
    
    return data

  } catch (error) {
    console.log(error);
  }
};
