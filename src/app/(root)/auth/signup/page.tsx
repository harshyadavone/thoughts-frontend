"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema } from "@/lib/FormSchema";
import { toast } from "sonner";
import axios from "axios";

import { useRouter } from "next/navigation";
import LoadingButton from "@/components/LoadingButton";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SignUpForm() {
  const { currentUser } = useSelector((state : any) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  if(currentUser){
    router.push("/posts")
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`,
        data
      );

      if (response.status === 201) {
        toast.success("Account created successfully", {
          position: "top-right",
        });
        setLoading(false);
        router.push("/auth/signin");
      } else {
        setLoading(false);
        toast.error("Failed to Signin.", { position: "top-right" });
      }
    } catch (error: any) {
      setLoading(false);
      toast.error("An error occurred during Sign Up. Please try again.", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="rounded-lg p-8 max-w-md w-full ">
        <div className="pb-5">
          {" "}
          <h1 className="text-center text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            Create an account
          </h1>
          <h1 className="text-center">
            And share your thoughts on{" "}
            <span className="text-violet-500 font-other tracking-wider font-bold text-xl">
              Thoughts
            </span>
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-gray-100">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Harsh Yadav"
                      {...field}
                      className="w-full p-5 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-shadow duration-300 ease-in-out hover:shadow-[0_0_7px_rgba(59,130,246,0.7)]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-gray-100">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="email@example.com"
                      {...field}
                      className="w-full p-5 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-shadow duration-300 ease-in-out hover:shadow-[0_0_7px_rgba(59,130,246,0.7)]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-gray-100">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="w-full p-5 text-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-shadow duration-300 ease-in-out hover:shadow-[0_0_7px_rgba(59,130,246,0.7)]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              {loading ? (
                <LoadingButton />
              ) : (
                <Button
                  type="submit"
                  className="text-white transition-colors duration-300 w-full bg-blue-600 hover:bg-blue-700  dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Sign In
                </Button>
              )}
            </div>
          </form>
        </Form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?{" "}
            <button>
              <Link
                href="/auth/signin"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 font-medium transition-all duration-300"
              >
                Login
              </Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
