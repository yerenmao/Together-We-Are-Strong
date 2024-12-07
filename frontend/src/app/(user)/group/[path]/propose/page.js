import ProposeEvent from "@/components/ProposeEvent";

export default async function ProposePage({ params }) {
  const { path } = await params;
  return <ProposeEvent path={path} />;
}
