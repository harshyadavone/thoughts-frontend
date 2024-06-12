import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Thoughts ",
  description: "Blog Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col md:flex-row">
            <div className="hidden md:block">
              {/* <LeftSidebar /> */}
            </div>
            <div className="flex-1 p-4 md:pt-0">
              <div className="block md:hidden">
                {/* <TopBar /> */}
              </div>
   
              {children}
          
              <div className="block md:hidden">
                {/* <BottomBar /> */}
              </div>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
