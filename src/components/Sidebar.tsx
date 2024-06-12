"use client";
import { createContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ModeToggle } from "./toggle-theme";
import TruncatedText from "./TruncatedText";
import { usePathname } from 'next/navigation'
import { useSelector } from "react-redux";


interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useSelector((state : any) => state.user)

  return (
    <div className="relative">
      <aside
        className={`fixed top-0 left-0 h-screen w-64 transition-transform duration-500 ease-in-out`}
      >
        <nav className="h-full flex flex-col bg-white dark:bg-[#0e0d0d] shadow-lg">
          <div className="border-b flex flex-col items-center pt-14 pb-5 bg-cover bg-center border-solid">
            <Link href="/">
              <div className="text-violet-500 text-2xl font-bold mb-3 font-other tracking-wider">
                Thoughts
              </div>
            </Link>

            <div className="flex items-center text-center w-auto bg-gray-100 dark:bg-gray-900  p-2 rounded-md gap-2">
              <div className="text-sm">
                <UserIcon />
              </div>
              <TruncatedText text={currentUser.currentUser ?  currentUser.currentUser.fullName : 'login'} maxLength={15} />
            </div>
          </div>
          <ul className="flex-1 px-3">{children}</ul>
        </nav>
      </aside>
      <div className="ml-64">
        <div className="fixed top-0 left-0 p-2">
          <div className="flex gap-2">
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



export const SidebarItem = ({
  icon,
  text,
  pathname,
  margin,
}: {
  icon: React.ReactNode;
  text?: string;
  pathname?: string;
  margin?: boolean;
}) => {
  const currentPathname = usePathname();
  const isActive = currentPathname === pathname;

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${isActive? "bg-gray-200 text-[#9013fe] dark:bg-gray-800 dark:text-[#9013fe]" : "hover:bg-gray-100 text-gray-600 dark:hover:bg-gray-900 dark:text-gray-300"}
      `}
    >
      {icon}
      <span
        className={`${margin? "ml-3" : " "}`}
      >
        {text}
      </span>
    </li>
  );
};

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
    color={"#9013fe"}
    fill={"none"}
    {...props}
  >
    <path
      d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const Menu11Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
    color={"#9013fe"}
    fill={"none"}
    {...props}
  >
    <path
      d="M20 12L10 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 5L4 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 19L4 19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);