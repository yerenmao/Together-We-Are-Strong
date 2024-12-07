import Voting from "@/components/Voting";

export default async function VotePage({ params }) {
  const { path, eventid } = await params;
  return <Voting path={path} eventid={eventid} />;
}
