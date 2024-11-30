import ProfSection from "@/components/ProfSection";

export default function Prof() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col pt-20 pb-7">
        <div className="text-2xl font-semibold text-gray-600 p-14">
          本學期有開的課
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 w-full h-auto">
          <ProfSection />
          <ProfSection />
        </div>
        <div className="text-2xl font-semibold text-gray-600 p-14">
          過去有開的課
        </div>
        <div className="flex flex-col justify-center items-center space-y-5 w-full h-auto">
          <ProfSection />
          <ProfSection />
        </div>
      </div>
    </>
  );
}