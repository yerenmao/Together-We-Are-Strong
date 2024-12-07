import Chat from "@/components/Chat";
import ChatRoom from "@/components/ChatRoom";

export default async function GroupPath({ params }) {
  const { path } = await params;
  return <Chat path={path} />;
}
