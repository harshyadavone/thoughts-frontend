"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { signinSchema } from "@/lib/FormSchema";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/slice/userSlice";
import LoadingButton from "@/components/LoadingButton";

interface SignInFormData {
  email: string;
  password: string;
}

interface RootState {
  user: {
    loading: boolean;
    error: string | null;
  };
}

const SignInForm = () => {
  const { loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setSubmitting(true);
    try {
      dispatch(signInStart());
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("User signed in successfully", { position: "top-right" });
        dispatch(signInSuccess(response.data));
        router.push("/");
      } else {
        dispatch(signInFailure(response.data));
        toast.error("Failed to Signin.", { position: "top-right" });
      }
    } catch (error: any) {
      dispatch(signInFailure(error));
      toast.error("An error occurred during sign in. Please try again.", {
        position: "top-right",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <span className="text-violet-500 text-2xl font-bold text-center font-other tracking-wider">
            Thoughts
          </span>
        </div>
        <h1 className="text-center text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Login here
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            Don't have an account?{" "}
            <button>
              <Link
                href="/auth/signup"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 font-medium transition-colors duration-300"
              >
                Register
              </Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
