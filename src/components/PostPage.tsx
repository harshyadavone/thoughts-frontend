'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import PostList from "@/components/PostList";
import PaginationSelector from "@/components/PaginationSelector";
import Loader from "./Loader";

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

type Pagination = {
  total: number;
  page: number;
  pages: number;
};

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    pages: 1,
  });
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (page: number) => {
    setLoading(true); 
    try {
      const response = await axios.get<{
        data: Post[];
        pagination: Pagination;
      }>(`${process.env.NEXT_PUBLIC_API_BASE_URL as string}/api/post/get-posts?page=${page}`,  {withCredentials: true});
      const { data, pagination } = response.data;
      setPosts(data);
      setPagination(pagination);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchPosts(page);
  };

  if(loading){
    return (
      <Loader />
    )
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <main className="flex-1 p-2 md:pt-0">
        <div className="flex flex-col h-screen overflow-y-hidden md:pt-4">
          <div className="overflow-auto h-full mt-10 md:mt-0 mb-10 md:mb-0 custom-scrollbar">
            {/* Conditional rendering based on loading state */}
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader />
              </div>
            ) : (
              <>
                <PostList posts={posts} />
                <PaginationSelector
                  page={pagination.page}
                  pages={pagination.pages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostsPage;
