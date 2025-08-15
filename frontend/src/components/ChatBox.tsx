"use client"

import { useState } from "react";

enum Sender {
  AI = "ai",
  USER = "user",
}
export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      sender: Sender.USER,
      message: "can you tell what is this PDF all about?",
    },
    {
      sender: Sender.AI,
      message:
        "it is about interview preperations for your HR interview. have a great intervew ahead",
    },
    {
      sender: Sender.USER,
      message: "can you tell what is thishat is thishat is thishat is this PDF all abo ut?",
    },
    {
      sender: Sender.AI,
      message:
        "it is about interview preperations  for your HR interview. have a great intervew ahead",
    },
    {
      sender: Sender.USER,
      message: "can you tell what is this;lkhat is thishat is thishat is this PDF all abo ut?",
    },
    {
      sender: Sender.AI,
      message:
        "it is about intervikjew preperations  for your HR interview. have a great intervew ahead",
    },
    {
      sender: Sender.USER,
      message: "can youkjk tell what is thishat is thishat is thishat is this PDF all abo ut?",
    },
    {
      sender: Sender.AI,
      message:
        "it is about intlkjlkerview preperations  for your HR interview. have a great intervew ahead",
    },
  ]);

  return <>{messages.map((msg) => {
    return (
      <div
        key={msg.message}
        className={`flex items-start gap-4 mb-4 ${
          msg.sender === Sender.AI ? "justify-start" : "justify-end"
        }`}
      >
        <div
          className={`p-4 rounded-lg max-w-[70%] ${
            msg.sender === Sender.AI
              ? "bg-gray-800 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {msg.message}
        </div>
      </div>
    );
  })}</>;
}
