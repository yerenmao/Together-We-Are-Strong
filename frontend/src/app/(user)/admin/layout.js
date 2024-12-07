import Navbar from "@/components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
