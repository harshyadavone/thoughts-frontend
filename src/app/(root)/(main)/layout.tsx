"use client";
import "../../globals.css";
import TopBar from "@/components/TopBar";
import LeftSidebar from "@/components/LeftSidebar";
import BottomBar from "@/components/BottomBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="min-h-screen flex flex-col md:flex-row">
          <div className="hidden md:block">
            <LeftSidebar />
          </div>
          <div className="flex-1 p-4 md:pt-0">
            <div className="block md:hidden">
              <TopBar />
            </div>
            {children}
            <div className="block md:hidden">
              <BottomBar />
            </div>
          </div>
        </div>
  );
}
