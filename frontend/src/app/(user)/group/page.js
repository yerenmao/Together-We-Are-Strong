import Image from "next/image";
import Chat from "@/components/Chat";
import ChatRoom from "@/components/ChatRoom";

export default function GroupPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col border-l border-l-gray-400 relative">
        <nav className="flex h-14 border-b-gray-400 bg-gray-200 border-b justify-between"></nav>
        <div className="overflow-y-scroll basis-[85.5%] pt-1 pb-1 flex justify-center items-center">
          <p>Chat Box</p>
        </div>

        <div className="basis-[8%] border-t border-t-gray-400 ">
          <div className="placeholder:italic placeholder:text-slate-400bg-white bg-gray-200 focus:outline-none focus:border-none w-full h-full text-base pl-4" />
        </div>
      </div>
    </>
  );
}
