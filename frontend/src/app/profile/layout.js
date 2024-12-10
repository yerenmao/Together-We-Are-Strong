import Navbar from "@/components/Navbar";

export default function ProfileLayout({ children }) {
  return (
    <div className="bg-gray-200 h-auto">
      <Navbar />
      {children}
    </div>
  );
}
