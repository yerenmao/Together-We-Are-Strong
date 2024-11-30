"use client";

import LoginNavbar from "@/components/LoginNavbar";

export default function Home() {
  return (
    <>
      <LoginNavbar />
      <div className="pt-20 bg-gray-300 w-full h-screen flex flex-col justify-center items-center">
        <p className="text-4xl font-extralight p-4  rounded-2xl mb-12">
          Together We Are Strong
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/5TJebt_lUmk?si=rKN9MBinL9OlY2VC"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-3xl"
        ></iframe>
      </div>
    </>
  );
}
