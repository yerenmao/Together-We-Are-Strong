import Syllabus from "@/components/Syllabus";

export default async function SectionPage({ params }) {
  const { sectionid } = await params;
  return (
    <div className="w-full min-h-screen flex flex-col pt-20 pb-7">
      <Syllabus sectionid={sectionid} />
    </div>
  );
}
