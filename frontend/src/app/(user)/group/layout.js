"use client";

import Navbar from "@/components/Navbar";
import ChatRoom from "@/components/ChatRoom";

// export const metadata = {
//   title: "Together We Are Strong",
//   description: "Database Mangement Project",
// };

export default function StuLayout({ children }) {
  return (
    <div className="bg-gray-200 h-screen">
      <Navbar />
      <div className="pt-20 h-screen flex">{children}</div>
    </div>
  );
}
