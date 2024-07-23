import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import DarkModeContext from "./providers/DarkModeProvider";
import AuthProvider from "./auth/Provider";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { ProjectProvider } from "./providers/ProjectProvider";
import { WeekHourProvider } from "./providers/WeekHourProvider";
import ReactQueryProvider from "./providers/ReactQueryProvider";

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
            <ReactQueryProvider>
              <ProjectProvider>
                <WeekHourProvider>
                  <Theme accentColor="iris" radius="none">
                    <NavBar />
                    <main className="px-3">{children}</main>
                    {/* <ThemePanel /> */}
                  </Theme>
                </WeekHourProvider>
              </ProjectProvider>
            </ReactQueryProvider>
          </AuthProvider>
        </DarkModeContext>
      </body>
    </html>
  );
}
