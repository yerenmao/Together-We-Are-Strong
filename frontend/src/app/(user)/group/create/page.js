import ChatRoom from "@/components/ChatRoom";
import CreateGroup from "@/components/CreateGroup";

export default function CreateGroupPage() {
  return (
    <>
      <div className="w-1/4">
        <ChatRoom />
      </div>
      <div className="w-3/4 ">
        <CreateGroup />;
      </div>
    </>
  );
}
