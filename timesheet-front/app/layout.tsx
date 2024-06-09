import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import DarkModeContext from "./components/DarkModeContext";
import AuthProvider from "./auth/Provider";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { ProjectProvider } from "./contexts/ProjectProvider";
import { WeekHourProvider } from "./contexts/WeekHourProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Timesheet",
  description: "Created to manage your time.",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <DarkModeContext>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <ProjectProvider>
                <WeekHourProvider>
                  <Theme accentColor="iris" radius="none">
                    <NavBar />
                    <main className="px-3">{children}</main>
                    <ReactQueryDevtools />
                    {/* <ThemePanel /> */}
                  </Theme>
                </WeekHourProvider>
              </ProjectProvider>
            </QueryClientProvider>
          </AuthProvider>
        </DarkModeContext>
      </body>
    </html>
  );
}
