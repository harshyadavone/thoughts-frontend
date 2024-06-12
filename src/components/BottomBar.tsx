import { Add01Icon, DashboardCircleIcon, Home01Icon } from "./LeftSidebar";
import Link from "next/link"; // Import Link
import { SidebarItem } from "./Sidebar";
import { useSelector } from "react-redux";

const BottomBar = () => {
  const currentUser = useSelector((state: any) => state.user);
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-solid rounded-t-lg flex justify-around md:hidden">
      <Link href="/posts" passHref>
        <SidebarItem icon={<Home01Icon />} pathname="/posts" />
      </Link>
      <Link
        href={
          currentUser.currentUser
            ? `/dashboard/${currentUser.currentUser._id}`
            : "/auth/signin"
        }
        passHref
      >
        <SidebarItem
          icon={<DashboardCircleIcon />}
          pathname={
            currentUser.currentUser
              ? `/dashboard/${currentUser.currentUser._id}`
              : "/auth/signin"
          }
        />
      </Link>
      <Link href="/create-post" passHref>
        <SidebarItem icon={<Add01Icon />} pathname="/create-post" />
      </Link>
    </div>
  );
};

export default BottomBar;
