"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import {
  AiOutlineHome,
  AiOutlineFieldTime,
  AiFillProject,
} from "react-icons/ai";
import { TbClockHour3 } from "react-icons/tb";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, DropdownMenu, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DarkModeTrigger from "./components/DarkModeTrigger";
import { ThemeContext } from "./components/DarkModeContext";
import AvatarImg from "./images/avatar.jpg";

const NavBar = () => {
  const currentPath = usePathname();
  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};

  const links = [
    { label: "Dashboard", href: "/", icon: <AiOutlineHome /> },
    { label: "Timesheet", href: "/timesheet", icon: <AiOutlineFieldTime /> },
    { label: "Projects", href: "/project", icon: <AiFillProject /> },
    { label: "Week Hours", href: "/hours", icon: <TbClockHour3 /> },
  ];
  return (
    <nav
      className="border-b mb-5 px-5 py-3"
      style={
        theme === "dark" ? { background: "#212225" } : { background: "white" }
      }
    >
      <Flex justify="between">
        <Flex align="center" gap="3">
          {/* <Link href="/">
            <AiFillBug />
          </Link> */}
          <ul className="flex space-x-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={
                    theme == "light"
                      ? classnames({
                          "flex text-white bg-indigo-600":
                            link.href === currentPath,
                          "flex text-zinc-500": link.href !== currentPath,
                          "hover:text-zinc-400 transition-colors": true,
                          "pt-2 pb-2 pl-3 pr-3 flex items-center space-x-1":
                            true,
                        })
                      : classnames({
                          "flex text-white bg-indigo-600":
                            link.href === currentPath,
                          "flex text-zinc-500": link.href !== currentPath,
                          "hover:text-zinc-200 transition-colors": true,
                          "pt-2 pb-2 pl-3 pr-3 flex items-center space-x-1":
                            true,
                        })
                  }
                  href={link.href}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="4rem" />;

  if (status === "unauthenticated")
    return (
      <Flex direction="row">
        <DarkModeTrigger />
        <Link
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2"
          href="/api/auth/signin"
        >
          Login
        </Link>
      </Flex>
    );

  return (
    <Flex direction="row">
      <DarkModeTrigger />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={AvatarImg.src}
            fallback="?"
            className="cursor-pointer"
            referrerPolicy="no-referrer" // If don't work then open next.config.js file
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>{session!.user!.name}</DropdownMenu.Label>
          <Link className="cursor-pointer" href="/api/auth/signout">
            <DropdownMenu.Item>Log out</DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default NavBar;
