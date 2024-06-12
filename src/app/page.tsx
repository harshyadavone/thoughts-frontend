import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";
import React from "react";
import { Twitter, Linkedin, Github } from "lucide-react";

const Page = () => {
  return (
    <div className="relative">
      <BackgroundBeams className="" />
      <div className="relative z-10">
        <div className="h-screen flex flex-col items-center justify-center relative">
          <div className="absolute top-4 left-4 flex gap-6 items-center">
            <div className="text-violet-500 text-3xl  font-semibold mb-1 font-other tracking-wider ">
              Thoughts
            </div>
            <div className="flex gap-4 border border-solid p-2 rounded-md">
              <Link
                href="https://twitter.com/harshyadavone"
                className="text-gray-600 hover:text-blue-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/harshdana"
                className="text-gray-600 hover:text-blue-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://github.com/harshyadavone"
                className="text-gray-600 hover:text-blue-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </Link>
            </div>
          </div>
          <div className="text-center mb-8">
            <span className="text-2xl tracking-wider font-normal font-other -mb-3">
              Hey There! Welcome to the{" "}
            </span>
            <span className="text-3xl tracking-wider font-normal font-other text-violet-600">
              Thoughts
            </span>
            <TextGenerateEffect
              words="A blog web app where you can share your thoughts"
              className="font-other tracking-wider font-normal -mt-2"
            />
          </div>
          <span className="font-other text-sm -mt-4  text-muted-foreground">
            *Backend deployed on Render; it may be down.
          </span>
          <span className="font-other text-sm text-muted-foreground">
            If no response, wait ~30 seconds.
          </span>
          <div className="flex gap-24 pt-5">
            <div className="flex gap-4">
              <Button className="font-other">
                <Link href={"/auth/signup"}>Sign Up</Link>
              </Button>
              <Button variant={"outline"} className="font-other z-1">
                <Link href={"/posts"}>Go To Posts</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
