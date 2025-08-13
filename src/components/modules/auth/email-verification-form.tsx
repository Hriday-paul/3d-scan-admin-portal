"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from "@/assets/images/ns-logo.png";
import Image from "next/image";
import NSInput from "@/components/ui/core/NSInput";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

export function EmailVerificationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);

    try {
      // Here you would typically send the email to your API
      console.log("Sending verification code to:", data.email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to password reset page
      router.push("/reset-password");
    } catch (error) {
      console.error("Error sending verification code:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" max-w-md mx-auto">
      <Form {...form}>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="w-full h-full"
            />
          </div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" font-semibold text-sm text-ns-neutral-dark">
                  Email
                </FormLabel>
                <FormControl>
                  <NSInput
                    placeholder="Enter your email"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href={"/reset-password"}>
            <Button
              type="submit"
              className="w-full bg-[#268CBE] hover:bg-[#268CBE] py-5 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Code"}
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
}
