import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Together We Are Strong",
  description: "Created by Tristan Chen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
