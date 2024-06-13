"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { AspectRatio } from "./ui/aspect-ratio";
import TruncatedText from "./TruncatedText";

type Post = {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
  authorDetails?: {
    fullName?: string;
    email?: string;
  };
};

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-2 md:gap-3 ">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/detail/${post._id}`}
          className="group mb-2 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-900 p-4 rounded-md"
        >
          <div className="grid lg:grid-cols-[2fr_3fr] gap-5 ">
            <AspectRatio ratio={16 / 6}>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="rounded-md w-full h-full object-cover"
              />
            </AspectRatio>
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
                <TruncatedText text={post.title} maxLength={15} />
              </h3>
              <p className="mb-4 text-gray-600">
                <TruncatedText text={post.content} maxLength={25} dangerous />
              </p>
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex  items-center gap-1">
                  <Calendar className="text-gray-500" height={15} width={15} />
                  <span className="text-sm text-center">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <UserIcon />
                  <span className="text-sm text-center">
                    {post?.authorDetails?.fullName
                      ? post?.authorDetails?.fullName
                      : "Anonymous"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostList;

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={15}
    height={15}
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
