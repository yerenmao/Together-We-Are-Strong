"use client";

import Link from "next/link";
import Client from "@/utils/Client";
import { useEffect, useState } from "react";

import SubNav from "./SubNav";

export default function Result({ path, eventid }) {
  const [event, setEvent] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [join, setJoin] = useState([]);
  const [notjoin, setNotJoin] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Client.get(
          `http://localhost:8080/api/event/result/${eventid}`
        );
        const data = response.data;
        console.log(data);
        setEvent(data.event);
        setSemester(data.semester);
        setSection(data.section);
        setJoin(
          Object.keys(data.data).filter((key) => data.data[key] === true)
        );
        setNotJoin(
          Object.keys(data.data).filter((key) => data.data[key] === false)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center border-l border-l-gray-400 relative">
        <SubNav
          backhref={`/group/${path}`}
          closehref={`/group/${path}`}
          title={"投票結果"}
        />
        <div className="basis-[93.5%] w-2/3 flex justify-center items-center">
          <div className="border border-gray-400 bg-slate-400 rounded-3xl flex flex-col justify-evenly items-center w-2/3 h-2/3">
            <div className="text-2xl font-bold space-y-2 py-2">
              <div className="flex justify-center text-center">
                <div>{event}</div>
              </div>
              <div className="flex justify-center text-center">
                <div>
                  {semester} {section}
                </div>
              </div>
            </div>
            <div className="flex w-full h-full">
              <div className="w-1/2 flex flex-col justify-start items-center">
                <p className="font-semibold text-lg my-2">參加</p>
                {join.map((item) => `${item}`).join("")}
              </div>
              <div className="w-1/2 flex flex-col justify-start items-center">
                <p className="font-semibold text-lg my-2">不參加</p>
                {notjoin.map((item) => `${item}`).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
