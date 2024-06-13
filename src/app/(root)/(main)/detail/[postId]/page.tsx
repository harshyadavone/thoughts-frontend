"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

interface AuthorDetails {
  fullName: string;
  email: string;
}

interface Post {
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  authorDetails: AuthorDetails;
  author: string;
}

const DetailPage = () => {
  const router = useRouter();
  const { postId } = useParams();

  const [post, setPost] = useState<Post | null>(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/${postId}`,
        { withCredentials: true }
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (!post) {
    return <Loader />;
  }

  const { title, content, imageUrl, createdAt, authorDetails, author } = post;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-4 mb-8 md:p-4">
      <img
        src={imageUrl}
        alt={title}
        className="rounded-md w-full mt-8 mb-8 md:mt-6 md:mb-6"
      />

      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-2 md:mb-4">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </p>
      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar
            className="text-gray-500 dark:text-gray-400"
            height={15}
            width={15}
          />
          <span className="text-xs md:text-sm">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={15}
            height={15}
            color={"#9013fe"}
            fill={"none"}
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
          <Button
            variant={"link"}
            onClick={() => router.push(`/dashboard/${author}`)}
            className="text-xs md:text-sm -ml-3"
          >
            {authorDetails?.fullName || "Anonymous"}
          </Button>
        </div>
      </div>
      <Button
        onClick={() => router.back()}
        className="mt-2 md:mt-4"
        variant={"link"}
      >
        Back to Posts
      </Button>
    </div>
  );
};

export default DetailPage;
