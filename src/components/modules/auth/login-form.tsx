"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import logo from "@/assets/images/ns-logo.png";
import Image from "next/image";
import NSInput from "@/components/ui/core/NSInput";
import NSButton from "@/components/ui/core/NSButton";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().default(false),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission here
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="max-w-md w-full space-y-8">
        <div className="text-start">
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
          <h3 className=" text-4xl text-ns-title leading-11 font-bebas mb-2 font-black">
            WELCOME BACK
          </h3>
          <p className=" text-ns-neutral-dark text-sm">
            Enter your email and password to access your account
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-ns-title font-semibold text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <NSInput
                      placeholder="Enter your email"
                      type="email"
                      className="h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-ns-title font-semibold text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <NSInput
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        className="h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500 pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <FormField
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border border-[#268CBE] data-[active=true]:bg-[#268CBE]
                         data-[state=checked]:bg-[#268CBE] data-[state=checked]:border-[#268CBE] cursor-pointer"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal text-[#268CBE] cursor-pointer">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Link
                href="/email-verify"
                className="text-sm text-[#268CBE] hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <Link href="/dashboard">
              <NSButton type="submit" className="w-full rounded-lg py-3">
                Sign In
              </NSButton>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}
