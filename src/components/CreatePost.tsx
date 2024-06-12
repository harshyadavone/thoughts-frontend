"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "./Loader";
import { Loader2 } from "lucide-react";
interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = () => {
  const currentUser = useSelector((state : any) => state.user)
  const router = useRouter()

  if(!currentUser.currentUser){
    router.push("/auth/signin")
  }
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    _id: "",
  });
  const [publishError, setPublishError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      setPublishError("Please select an image file before submitting.");
      return;
    }

    const postData = new FormData();
    postData.append("imageFile", imageFile);
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    postData.append("author" , currentUser.currentUser._id)

    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/`, {
        method: "POST",
        body: postData,
      });
  
      const data = await res.json();
      if (!res.ok) {
        setLoading(false)
        setPublishError(data.message);
        return;
      }
      toast.success("Post published successfully", { position: "top-right" })
      setPublishError(null);
      setLoading(false)
        router.push("/posts")
    } catch (error) {
      setPublishError("Something went wrong!");
    } finally{
      setLoading(false)
    }
  };

  

  return (
    <div className="p-3 max-w-3xl mx-auto mt-10 mb-10 min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <Input
            id="title"
            type="text"
            placeholder="Title"
            required
            className="flex-1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <Input
            type="file"
            id="file"
            accept="image/*"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files.length > 0) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </div>
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          className="mb-12 h-72"
          placeholder="Write something..."
          onChange={(content) => {
            setFormData({ ...formData, content });
          }}
        />
        <div className="flex justify-between">
          {loading ? (
            <Button disabled className="text-white bg-gray-400 w-full cursor-not-allowed">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Publishing...
            </Button>
          ) : (
            <Button type="submit" color="purple" className="w-full">
              Publish
            </Button>
          )}
        </div>
      </form>
      {publishError && <p className="text-red-500 mt-3">{publishError}</p>}
    </div>
  );
};

export default CreatePost;
