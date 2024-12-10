import Schedule from "@/components/Schedule";

export default async function SchedulePage({ params }) {
  const { userid } = await params;

  return <Schedule userid={userid} />;
}
