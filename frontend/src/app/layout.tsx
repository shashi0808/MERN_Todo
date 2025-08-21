import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MERN Todo App - Manage Your Tasks Efficiently",
  description: "A full-stack Todo application built with MERN stack featuring task management, filtering, sorting, and responsive design. Create, edit, delete, and organize your tasks with ease.",
  keywords: ["todo", "task management", "MERN", "React", "Next.js", "MongoDB", "productivity"],
  authors: [{ name: "MERN Todo App" }],
  openGraph: {
    title: "MERN Todo App - Manage Your Tasks Efficiently",
    description: "A full-stack Todo application built with MERN stack featuring task management, filtering, sorting, and responsive design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MERN Todo App - Manage Your Tasks Efficiently",
    description: "A full-stack Todo application built with MERN stack featuring task management, filtering, sorting, and responsive design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
