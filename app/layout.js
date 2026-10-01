import "./globals.css";
import { Inter, Oswald } from "next/font/google";
import { StoreProvider } from "../components/Store";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["500", "700"] });

export const metadata = { title: "FitLog — Workout Library", description: "Pick a lift, lock it into today's plan, and log every set." };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} font-sans min-h-screen bg-bg text-white`}>
        <StoreProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
