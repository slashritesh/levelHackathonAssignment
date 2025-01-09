"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { Input } from "@/components/ui/input";
import { ChartArea } from "lucide";
import { MessageSquareDot } from "lucide-react";

const groq = createGroq({
  apiKey: "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",
});
const model = groq("llama-3.3-70b-versatile");

const ChatWithData = () => {
  const [messages, setMessages] = useState([]);

  // Function to send a message
  const sendMessage = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const msg = formData.get("message");

    if (!msg.trim()) return; // Avoid sending empty messages

    // Add the user's message to the messages array
    const userMessage = { sender: "user", content: msg };
    setMessages((prev) => [...prev, userMessage]);

    // Clear the input field
    e.target.reset();

    const { text } = await generateText({
      model,
      prompt: `you are social media expert answer only based on social media growth. based on input : ${msg} make sure response give in concise very small without long messages `,
    });

    const botMessage = { sender: "bot", content: text };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="mx-20 mb-10 flex gap-5">
      <div className="w-[300px] p-5 border border-slate-600 rounded-xl">
        <h1 className="text-lg mb-5 flex gap-3 items-center py-5"><MessageSquareDot /> Chat History</h1>
        <div className="p-5 bg-slate-800 rounded-lg">
            <p>Default Session</p>
        </div>
      </div>
      <div className="flex-1 flex-col ">
        <div className="h-[75vh] border border-slate-600 rounded-xl flex-1 overflow-y-auto p-8 flex flex-col gap-2">
          {messages.map((item, index) => {
            return (
              <div
                key={index}
                className={`p-3 text-sm rounded-lg ${
                  item.sender === "user"
                    ? "bg-orange-500 self-end"
                    : "bg-gray-700 self-start"
                }`}
              >
                <div className="prose prose-invert">{item.content}</div>
              </div>
            );
          })}
        </div>
        <form
          method="POST"
          onSubmit={sendMessage}
          className="flex w-full py-5 gap-3"
        >
          <Input
            name="message"
            autoComplete="off"
            placeholder="Type your message..."
            className="flex-1 p-5 w-full"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWithData;
