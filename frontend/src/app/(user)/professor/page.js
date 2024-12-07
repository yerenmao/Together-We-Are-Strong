"use client";

import SearchResult from "@/components/Section";

import { useEffect, useState } from "react";
import Client from "@/utils/Client";

export default function ProfPage() {
  const [sections, setSections] = useState([]);
  useEffect(() => {
    const findCourse = async (e) => {
      try {
        const response = await Client.get("/api/section/search");
        setSections(response.data.sections);
      } catch (err) {
        console.log(err);
      }
    };
    findCourse();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col pt-20 pb-7">
        <div className="text-2xl font-semibold text-gray-600 p-14">
          本學期有開的課
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 w-full h-auto">
          {sections.map((section, index) =>
            section.semester === "113-1" ? (
              <SearchResult
                key={index}
                index={index}
                section={section}
                prof={true}
              />
            ) : null
          )}
        </div>
        <div className="text-2xl font-semibold text-gray-600 p-14">
          過去有開的課
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 w-full h-auto">
          {sections.map((section, index) =>
            section.semester !== "113-1" ? (
              <SearchResult
                key={index}
                index={index}
                section={section}
                prof={true}
              />
            ) : null
          )}
        </div>
      </div>
    </>
  );
}
