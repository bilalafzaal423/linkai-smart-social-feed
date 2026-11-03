import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkAI - Your AI Social Manager | Smart Social Feed",
  description: "Enterprise-grade AI social management dashboard for high-performing LinkedIn content creators and founders.",
  keywords: ["AI", "LinkedIn", "Social Media Manager", "Agentic AI", "Content Strategy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-blue-600 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
