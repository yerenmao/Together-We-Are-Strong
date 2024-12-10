"use client";

import { useRouter } from "next/navigation";

export default function UserSimple({ user }) {
  const router = useRouter();
  const role2str = (role) => {
    if (role === "student") {
      return "學生";
    } else if (role === "prof") {
      return "教授";
    } else {
      return "系辦";
    }
  };
  return (
    <a
      href={`/profile/${user.id}`}
      target="_blank"
      className="w-1/2 h-24 bg-white border-2 border-black rounded-lg flex items-center justify-between p-6 text-xl font-semibold m-3"
    >
      <div className="w-1/4 flex flex-col">
        <div className="text-nowrap">
          {user.name}-{user.id}
        </div>
        <div className="text-sm text-gray-400 text-nowrap">
          Email: {user.email}
        </div>
      </div>
      <div className="flex w-2/5 justify-between items-center ">
        <div className="flex flex-col items-center w-16">
          <div>職位</div>
          <div className="text-base text-gray-700">{role2str(user.role)}</div>
        </div>
        <div className="flex flex-col items-center w-16">
          <div>系所</div>
          <pre className="text-base text-gray-700">{user.department}</pre>
        </div>
      </div>
    </a>
  );
}
