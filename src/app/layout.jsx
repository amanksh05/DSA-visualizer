// "use client"
import localFont from "next/font/local";
import "./globals.css";
import { Plus_Jakarta_Sans } from 'next/font/google'
import Header from "@/components/Header";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import Footer from "@/components/Footer";
import CanvasBackground from "@/components/CanvasBackground";

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "DSA Visulaizer",
  description: "Visualize the algortihms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body className={`min-h-screen bg-black flex flex-col ${jakarta.className}`}>
        <Header />
        <main className="flex-grow flex items-center justify-center">
        <CanvasBackground/>
          {/* <BackgroundAnimation/> */}
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
