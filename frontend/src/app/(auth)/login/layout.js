import LoginNavbar from "@/components/LoginNavbar";

export default function LoginLayout({ children }) {
  return (
    <div className="bg-gray-200 h-auto">
      <LoginNavbar />
      {children}
    </div>
  );
}
