import Navbar from "@/components/Navbar";

// export const metadata = {
//   title: "Together We Are Strong",
//   description: "Database Mangement Project",
// };

export default function StuLayout({ children }) {
  return (
    <div className="bg-gray-200 h-auto">
      <Navbar />
      {children}
    </div>
  );
}
