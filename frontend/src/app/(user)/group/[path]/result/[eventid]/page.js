import Result from "@/components/Result";

export default async function ResultPage({ params }) {
  const { path, eventid } = await params;
  return <Result path={path} eventid={eventid} />;
}
