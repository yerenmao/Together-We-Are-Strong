"use client";

import Link from "next/link";
import { useState } from "react";
import Client from "@/utils/Client";
import { useRouter } from "next/navigation";
import Section from "@/components/Section";

function InputPlace({
  value,
  setValue,
  text,
  placeholder = "",
  required = true,
}) {
  return (
    <div className="w-full space-y-1 ">
      <div className="text-xl text-gray-700 font-semibold">{text}</div>
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-16  border-2 border-black rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-base"
        placeholder={placeholder}
        type="text"
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function OpenSectionForm({
  courseId,
  setCourseId,
  professorId,
  setProfessorId,
  sectionId,
  setSectionId,
  semester,
  setSemester,
  time,
  setTime,
  classroom,
  setClassRoom,
  maxStudents,
  setMaxStudents,
}) {
  return (
    <div className="bg-slate-400 rounded-3xl flex flex-col justify-center items-center space-y-4 p-10 m-5 w-1/2">
      <InputPlace value={courseId} setValue={setCourseId} text={"課號"} />
      <InputPlace
        value={professorId}
        setValue={setProfessorId}
        text={"教授 ID"}
      />
      <InputPlace value={sectionId} setValue={setSectionId} text={"流水號"} />
      <InputPlace value={semester} setValue={setSemester} text={"學期"} />
      <InputPlace
        value={time}
        setValue={setTime}
        text={"時間"}
        placeholder="e.g. 一:2,3,4;三:7,8"
      />
      <InputPlace value={classroom} setValue={setClassRoom} text={"教室"} />
      <InputPlace
        value={maxStudents}
        setValue={setMaxStudents}
        text={"修課人數上限"}
      />
    </div>
  );
}

function transformTime(str) {
  const result = {};
  str.split(";").forEach((segment) => {
    const [key, values] = segment.split(":");
    result[key] = values
      .split(",")
      .map((value) =>
        isNaN(value) ? value.charCodeAt(0) - 54 : Number(value)
      );
  });
  return result;
}

export default function OpenSection() {
  const [courseId, setCourseId] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [semester, setSemester] = useState("");
  const [time, setTime] = useState("");
  const [classroom, setClassRoom] = useState("");
  const [maxStudents, setMaxStudents] = useState("");
  const [doubleCheck, setDoubleCheck] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState("");
  const [type, setType] = useState("");
  const [professor, setProfessor] = useState("");
  const [department, setDepartment] = useState("");
  const router = useRouter();

  const cancel = (e) => {
    e.preventDefault();
    if (doubleCheck) {
      setDoubleCheck(false);
    } else {
      router.push("/admin");
    }
  };
  const confirm = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.get("/api/course/check", {
        params: {
          courseId: courseId,
          professorId: professorId,
        },
      });
      setCourseName(response.data.courseName);
      setCredits(response.data.credits);
      setType(response.data.type);
      setProfessor(response.data.professor);
      setDepartment(response.data.department);
      setDoubleCheck(true);
    } catch (err) {
      console.log(err);
    }
    // setDoubleCheck(true);
  };
  const openSection = async (e) => {
    e.preventDefault();
    try {
      const response = await Client.post("/api/section/create", {
        courseId: courseId,
        professorId: professorId,
        sectionId: sectionId,
        semester: semester,
        time: transformTime(time),
        classroom: classroom,
        maxStudents: maxStudents,
      });
      alert("節次開設成功");
      router.push("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`w-full ${
        !doubleCheck ? "h-full" : "h-screen"
      } flex flex-col pt-20 pb-7`}
    >
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="flex space-x-1 text-2xl font-bold mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 self-center"
          >
            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
            <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
            <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
          </svg>
          <div>{!doubleCheck ? "填入" : "確認"}節次資訊</div>
        </div>
        {!doubleCheck ? (
          <OpenSectionForm
            courseId={courseId}
            setCourseId={setCourseId}
            professorId={professorId}
            setProfessorId={setProfessorId}
            sectionId={sectionId}
            setSectionId={setSectionId}
            semester={semester}
            setSemester={setSemester}
            time={time}
            setTime={setTime}
            classroom={classroom}
            setClassRoom={setClassRoom}
            maxStudents={maxStudents}
            setMaxStudents={setMaxStudents}
          />
        ) : (
          <Section
            index={0}
            section={{
              section_id: sectionId,
              course_id: courseId,
              name: courseName,
              professor: professor,
              semester: semester,
              department: department,
              credits: credits,
              type: type,
              time: transformTime(time),
              classroom: classroom,
              cur_students: 0,
              max_students: maxStudents,
            }}
            demo={true}
          />
        )}
        <div className="flex space-x-3">
          <button
            onClick={cancel}
            className="inline-flex w-36 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
          >
            {!doubleCheck ? "取消" : "修改"}
          </button>
          <button
            onClick={!doubleCheck ? confirm : openSection}
            className="inline-flex w-36 justify-center gap-x-1.5 rounded-3xl px-3 py-2 text-sm font-semibold  bg-gray-700 hover:bg-gray-600 text-white "
          >
            確定
          </button>
        </div>
      </div>
    </div>
  );
}
