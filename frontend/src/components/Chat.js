"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Client from "@/utils/Client";
import { usePathname } from "next/navigation";
import Message from "./Message";

function ChatNav({ groupName, groupStudents, path }) {
  return (
    <nav className="flex h-14 border-b-gray-400 bg-gray-200 border-b justify-between">
      <div className="flex items-center self-center ml-4 font-medium">
        {groupName !== "" ? (
          <div>
            {groupName} ({groupStudents.length})
          </div>
        ) : (
          <></>
        )}
      </div>

      <Link
        href={`/group/${path}/propose`}
        className="relative group inline-block h-10 w-10 mt-2 mr-6"
      >
        <button className="hover:bg-gray-400 rounded-full h-full w-full items-center self-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 ml-2 self-center"
          >
            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
            <path
              fillRule="evenodd"
              d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-gray-300 text-gray-500 text-xs rounded-xl py-1 px-2 hidden group-hover:block">
          創建活動
        </div>
      </Link>
    </nav>
  );
}

export default function Chat({ path }) {
  const [groupName, setGroupName] = useState("");
  const [groupStudents, setGroupStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const pathname = usePathname();

  const chatContainerRef = useRef(null);

  const fetchHistory = async () => {
    try {
      const response = await Client.get(
        `http://localhost:8080/api/message/${path}`
      );
      setHistory(response.data.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Client.get(
          `http://localhost:8080/api/group/${path}`
        );
        setGroupName(response.data.name);
        setGroupStudents(response.data.students);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [usePathname]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const create_message = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.post("/api/message/create", {
        message: message,
        path: path,
      });
      setMessage("");
      fetchHistory();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full h-full flex flex-col border-l border-l-gray-400 relative">
        <ChatNav
          groupName={groupName}
          groupStudents={groupStudents}
          path={path}
        />
        <div
          ref={chatContainerRef}
          className="overflow-y-scroll basis-[85.5%] pt-1 pb-1"
        >
          {history.map((msg, index) => {
            const showIcon =
              index === 0 ||
              msg.student !== history[index - 1].student ||
              new Date(msg.sent_at) - new Date(history[index - 1].sent_at) >=
                60000;
            return (
              <Message
                key={index}
                path={path}
                message={msg}
                showIcon={showIcon}
              />
              // <div
              //   key={msg.sent_at}
              //   className={`message ${isMine ? "mine" : "other"}`}
              // >
              //   {showIcon && (
              //     <div className="icon">
              //       <span>{msg.student_id}</span>
              //     </div>
              //   )}
              //   <div className="bubble">
              //     <p>{msg.message}</p>
              //     <small>{new Date(msg.sent_at).toLocaleTimeString()}</small>
              //   </div>
              // </div>
            );
          })}
        </div>

        <form
          onSubmit={create_message}
          className="basis-[8%] border-t border-t-gray-400 "
        >
          <input
            className="placeholder:italic placeholder:text-slate-400bg-white bg-gray-200 focus:outline-none focus:border-none w-full h-full text-base pl-4"
            placeholder="輸入訊息"
            type="text"
            required="required"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}
