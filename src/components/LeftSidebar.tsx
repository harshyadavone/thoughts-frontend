import { useSelector } from "react-redux";
import Sidebar, { SidebarItem } from "./Sidebar";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { signOut } from "@/redux/slice/userSlice";
import { toast } from "sonner";

const LeftSidebar = () => {
  const currentUser = useSelector((state: any) => state.user);

  const dispatch = useDispatch()

  const handleSignout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signout`, {
        method: 'POST',
        credentials: "include",
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);  
      } else {
        dispatch(signOut());
        toast.success("signed Out successfully", { position: "top-right" });
      }
    } catch (error : any) {
      console.log(error.message)
    }
}

  return (
    <Sidebar>
      <Sidebar>
        <Link href="/posts" passHref>
          <SidebarItem
            icon={<Home01Icon />}
            text="Home"
            pathname="/posts"
            margin
          />
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
            text="Dashboard"
            pathname={
              currentUser.currentUser
                ? `/dashboard/${currentUser.currentUser._id}`
                : "/auth/signin"
            }
            margin
          />
        </Link>

        <Link href="/create-post" passHref>
          <SidebarItem
            icon={<PencilEdit02Icon />}
            text="Create Post"
            pathname="/create-post"
            margin
          />
        </Link>

        <span onClick={handleSignout} >
          <SidebarItem icon={<Logout03Icon />} text="Log Out" margin />
        </span>
      </Sidebar>
    </Sidebar>
  );
};

export default LeftSidebar;

export const PencilEdit02Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#9013fe"} fill={"none"} {...props}>
    <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);


export const DashboardCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
    color={"#9013fe"}
    fill={"none"}
    {...props}
  >
    <circle
      cx="17.75"
      cy="6.25"
      r="4.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="6.25"
      cy="6.25"
      r="4.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="17.75"
      cy="17.75"
      r="4.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="6.25"
      cy="17.75"
      r="4.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const Home01Icon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M15.0001 17C14.2006 17.6224 13.1504 18 12.0001 18C10.8499 18 9.79965 17.6224 9.00012 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M2.35151 13.2135C1.99849 10.9162 1.82198 9.76763 2.25629 8.74938C2.69059 7.73112 3.65415 7.03443 5.58126 5.64106L7.02111 4.6C9.41841 2.86667 10.6171 2 12.0001 2C13.3832 2 14.5818 2.86667 16.9791 4.6L18.419 5.64106C20.3461 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6487 13.2135L21.3477 15.1724C20.8473 18.4289 20.597 20.0572 19.4291 21.0286C18.2612 22 16.5538 22 13.1389 22H10.8613C7.44646 22 5.73903 22 4.57112 21.0286C3.40321 20.0572 3.15299 18.4289 2.65255 15.1724L2.35151 13.2135Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const Logout03Icon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
