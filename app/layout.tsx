import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBox from "@/components/ChatBox";

export const metadata = {
  title: "Piping Elements",
  description:
    "Engineering Intelligence | Supply Chain Expertise | Digital Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-slate-900">
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatBox />
      </body>
    </html>
  );
}
