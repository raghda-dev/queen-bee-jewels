import type { Metadata } from "next";
import React from "react";
import '../styles/global.scss';
import Footer from '../components/Footer';


export const metadata: Metadata = {
  title: "Queen Bee Jewels",
  description: "Elegant jewelry for everyone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow">
       {children}
       </main>
       <Footer year={new Date().getFullYear()}/>
       </body>
    </html>
  );
}
