import StoreProvider from "./StoreProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter, Orbitron } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata = {
  title: "Nexus Dashboard",
  description: "Futuristic Data Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} antialiased min-h-screen bg-[url('/grid-bg.svg')] bg-fixed bg-cover`}>
        <StoreProvider>
          <Navbar />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
