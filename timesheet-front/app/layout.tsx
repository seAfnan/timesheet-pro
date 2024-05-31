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

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Timesheet",
  description: "Created to manage your time.",
};

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
            <ProjectProvider>
              <WeekHourProvider>
                <Theme accentColor="iris" radius="none">
                  <NavBar />
                  <main className="px-3">{children}</main>
                  {/* <ThemePanel /> */}
                </Theme>
              </WeekHourProvider>
            </ProjectProvider>
          </AuthProvider>
        </DarkModeContext>
      </body>
    </html>
  );
}
