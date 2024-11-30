import ChatRoom from "@/components/ChatRoom";
import JoinGroup from "@/components/JoinGroup";

export default function JoinGroupPage() {
  return (
    <>
      <div className="w-1/4">
        <ChatRoom />
      </div>
      <div className="w-3/4 ">
        <JoinGroup />;
      </div>
    </>
  );
}
