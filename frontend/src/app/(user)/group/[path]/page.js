import Chat from "@/components/Chat";
import ChatRoom from "@/components/ChatRoom";

export default async function GroupPath({ params }) {
  const { path } = await params;
  return (
    <>
      <div className="w-1/4">
        <ChatRoom path={path} />
      </div>
      <div className="w-3/4 ">
        <Chat path={path} />;
      </div>
    </>
  );
}
