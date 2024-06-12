import { z } from "zod";

export const FormSchema = z.object({
  fullName: z.string().min(1, { message: "Name can't be empty" }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const signinSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const formSchema = z
  .object({
    title: z.string({
      required_error: "Title is required",
    }),
    content: z.string({
      required_error: "Content is required",
    }),
    imageFile: z.instanceof(File).optional(),
  })
  .refine((data) => data.title && data.content, {
    message: "Title and Content are required",
    path: ["title"],
  });

export type BlogPostFormData = z.infer<typeof formSchema>;
