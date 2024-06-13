import {
  DashboardCircleIcon,
  Home01Icon,
  Logout03Icon,
  PencilEdit02Icon,
} from "./LeftSidebar";
import Link from "next/link"; // Import Link
import { SidebarItem } from "./Sidebar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "@/redux/slice/userSlice";
import { toast } from "sonner";

const BottomBar = () => {
  const currentUser = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOut());
        toast.success("signed Out successfully", { position: "top-right" });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
        <SidebarItem icon={<PencilEdit02Icon />} pathname="/create-post" />
      </Link>

      <span onClick={handleSignout}>
        <SidebarItem icon={<Logout03Icon />} />
      </span>
    </div>
  );
};

export default BottomBar;
