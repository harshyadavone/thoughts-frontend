import { useSelector } from "react-redux";
import Sidebar, { SidebarItem } from "./Sidebar";
import Link from "next/link";

const LeftSidebar = () => {
  const currentUser = useSelector((state: any) => state.user);
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
            icon={<Add01Icon />}
            text="Create Post"
            pathname="/create-post"
            margin
          />
        </Link>
      </Sidebar>
    </Sidebar>
  );
};

export default LeftSidebar;

export const Add01Icon = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M12 4V20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 12H20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
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