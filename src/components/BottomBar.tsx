import { Add01Icon, DashboardCircleIcon, Home01Icon } from "./LeftSidebar";
import Link from "next/link"; // Import Link
import { SidebarItem } from "./Sidebar";

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-solid rounded-t-lg flex justify-around md:hidden">
      <Link href="/" passHref>
        <SidebarItem icon={<Home01Icon />} pathname="/posts" />
      </Link>
      <Link href="/dashboard" passHref>
        <SidebarItem icon={<DashboardCircleIcon />} pathname="/dashboard" />
      </Link>
      <Link href="/create-post" passHref>
        <SidebarItem icon={<Add01Icon />} pathname="/create-post" />
      </Link>
    </div>
  );
};

export default BottomBar;
