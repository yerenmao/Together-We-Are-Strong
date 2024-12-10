import AddTA from "@/components/AddTA";

export default async function TA({ params }) {
  const { sectionid } = await params;
  return (
    <div className="w-full min-h-screen flex flex-col mt-20 pb-7">
      <AddTA sectionid={sectionid} />
    </div>
  );
}
