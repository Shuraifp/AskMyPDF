"use client";

import { useRef, useState } from "react";

export default function ChatInput({
  classNameProp,
}: {
  classNameProp: string;
}) {
  const defaultMsg = "Let's Start Chatting!, type your question here...";
  const [message, setMessage] = useState("");
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handleSend = () => {
    console.log("Send:", message.trim());
    setMessage("");
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const triggerPressAnimation = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  };

  const handleClick = () => {
    triggerPressAnimation();
    handleSend();
  };

  const handleEnterKey = () => {
    triggerPressAnimation();
    handleSend();
  };

  return (
    <div className={`relative mx-10 ${classNameProp}`}>
      <div className="relative bg-gray-800 rounded-4xl pl-4 pr-16 min-h-full flex items-center">
        <div
          ref={editorRef}
          className="chat-input w-full outline-none overflow-y-auto max-h-22 py-3 leading-6"
          contentEditable
          suppressContentEditableWarning
          data-placeholder={defaultMsg}
          onInput={(e: React.FormEvent<HTMLDivElement>) => {
            const el = e.currentTarget;
            if (el.innerText.trim() === "") el.innerHTML = "";
            setMessage(el.innerText);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleEnterKey();
            }
          }}
        />

        <button
          type="button"
          aria-label="Send message"
          disabled={!message.trim()}
          onClick={handleClick}
          className={`absolute right-2 top-1/2 -translate-y-1/2 translate-x-1/2 p-3 cursor-pointer rounded-full bg-gray-900 hover:bg-gray-950 transition-colors duration-200 ring-2 ring-blue-500 ring-offset-2
            ${isPressed ? "scale-95" : "scale-100 hover:scale-105"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12l14-7-7 14-2-6-6-2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
