// app/(main)/layout.tsx


import Footer from './components/Footer';

export const metadata = {
  title: "Queen Bee Jewels",
  description: "Elegant jewelry for everyone.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
