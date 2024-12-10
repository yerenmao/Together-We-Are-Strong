import Navbar from "@/components/Navbar";

export default function SectionLayout({ children }) {
  return (
    <div className="bg-gray-200 h-auto">
      <Navbar />
      {children}
    </div>
  );
}
