import User from "@/components/User";

export default async function UserPage({ params }) {
  const { id } = await params;
  return <User id={id} />;
}
