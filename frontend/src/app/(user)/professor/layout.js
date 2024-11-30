import Navbar from "@/components/Navbar";

// export const metadata = {
//   title: "Together We Are Strong",
//   description: "Database Mangement Project",
// };

export default function ProfLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-200 min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
