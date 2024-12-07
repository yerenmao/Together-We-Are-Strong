"use client";

import Navbar from "@/components/Navbar";
import ChatRoom from "@/components/ChatRoom";

export default function StuLayout({ children }) {
  return (
    <div className="bg-gray-200 h-screen">
      <Navbar />
      <div className="pt-20 h-screen flex">
        <div className="w-1/4">
          <ChatRoom />
        </div>
        <div className="w-3/4 ">{children}</div>
      </div>
    </div>
  );
}
