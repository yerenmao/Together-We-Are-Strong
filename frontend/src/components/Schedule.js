"use client";

import { useState, useEffect } from "react";
import Client from "@/utils/Client";

function Lesson({ isSelf, lesson, remove }) {
  let color;
  if (lesson?.type === "必帶" || lesson?.type === "必修") {
    color = "text-black";
  } else if (lesson?.type === "選修") {
    color = "text-blue-900";
  }
  return (
    <td className="text-start overflow-hidden p-2 border-b border-r border-l border-gray-300 text-sm">
      <div className="w-full h-full flex justify-between items-center">
        <a href={`/section/${lesson?.id}`} target="_blank" className={color}>
          {lesson?.name}
        </a>
        {isSelf ? (
          <button
            onClick={() => remove(lesson.id)}
            className={lesson ? "visible" : "invisible"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 text-red-400 hover:bg-red-200 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <></>
        )}
      </div>
    </td>
  );
}

function ScheduleRow({ num, time, isSelf, lessons, remove }) {
  return (
    <tr>
      <td className="text-center p-2 flex space-x-3 justify-end">
        <div className="font-semibold">{num}</div>
        <div className="text-sm self-center text-gray-600">{time}</div>
      </td>
      {lessons.map((lesson, index) => (
        <Lesson key={index} isSelf={isSelf} lesson={lesson} remove={remove} />
      ))}
    </tr>
  );
}

function convert_time(value) {
  if (value === 11) return "A";
  if (value === 12) return "B";
  if (value === 13) return "C";
  if (value === 14) return "D";
  return value.toString();
}

function actual_time(value) {
  switch (value) {
    case "0":
      return "07:10-08:00";
    case "1":
      return "08:10~09:00";
    case "2":
      return "09:10~10:00";
    case "3":
      return "10:20~11:10";
    case "4":
      return "11:20~12:10";
    case "5":
      return "12:20~13:10";
    case "6":
      return "13:20~14:10";
    case "7":
      return "14:20~15:10";
    case "8":
      return "15:30~16:20";
    case "9":
      return "16:30~17:20";
    case "10":
      return "17:30~18:20";
    case "A":
      return "18:25~19:15";
    case "B":
      return "19:20~20:10";
    case "C":
      return "20:15~21:05";
    case "D":
      return "21:10~22:00";
  }
}

function convert(sections) {
  const mapper = {
    一: 0,
    二: 1,
    三: 2,
    四: 3,
    五: 4,
    六: 5,
  };
  const times = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "A",
    "B",
    "C",
    "D",
  ];
  const obj = Object.fromEntries(
    times.map((time) => [time, Array(6).fill(null)])
  );
  for (const section of sections) {
    for (const weekday in section.time) {
      for (const t of section.time[weekday]) {
        obj[convert_time(t)][mapper[weekday]] = {
          id: section.section_id,
          type: section.section_type,
          name: section.section_name,
          prof: section.section_prof,
        };
      }
    }
  }
  return obj;
}

export default function Schedule({ userid }) {
  const [isSelf, setIsSelf] = useState(false);
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState({});
  const fetchData = async () => {
    try {
      const response = await Client.get(
        `http://localhost:8080/api/section/schedule/${userid}`
      );
      setIsSelf(response.data.is_self);
      setName(response.data.name);
      setSchedule(convert(response.data.sections));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remove = async (id) => {
    try {
      const response = await Client.post("/api/section/schedule/delete", {
        id,
      });
      console.log(response.data);
      if (response.data.message == "Success") {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start space-y-5 pt-32 pb-20">
      <div className="flex space-x-1">
        <svg
          className="h-6 w-6 text-black self-center"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />{" "}
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
        <div className="text-black text-xl font-semibold">
          {isSelf ? "我" : name}的課表
        </div>
      </div>
      <div className="flex flex-col w-4/5 border-2 border-black bg-white rounded-md p-16 pl-2">
        <div className="">
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className=" "></th>
                <th className="border-b border-gray-300 text-gray-800">
                  星期一
                </th>
                <th className="border-b border-gray-300 text-gray-800">
                  星期二
                </th>
                <th className="border-b border-gray-300 text-gray-800">
                  星期三
                </th>
                <th className="border-b border-gray-300 text-gray-800">
                  星期四
                </th>
                <th className="border-b border-gray-300 text-gray-800">
                  星期五
                </th>
                <th className="border-b border-gray-300 text-gray-800">
                  星期六
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(schedule).map(([key, values]) => (
                <ScheduleRow
                  key={key}
                  num={key}
                  time={actual_time(key)}
                  isSelf={isSelf}
                  lessons={values}
                  remove={remove}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
