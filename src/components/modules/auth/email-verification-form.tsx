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
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import logo from "@/assets/images/ns-logo.png";
import Image from "next/image";
import NSInput from "@/components/ui/core/NSInput";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import NSButton from "@/components/ui/core/NSButton";
import { useVerifyOtpMutation } from "@/redux/api/auth.api";
import { useCookies } from "react-cookie";
import { config } from "@/utils/config";
import { toast } from "sonner";


const formSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{6}$/, { message: "OTP must be 6 digits" }),
});

type FormValues = z.infer<typeof formSchema>;

export function EmailVerificationForm() {
  const [postVerify, { isLoading }] = useVerifyOtpMutation();
  const route = useRouter();
  const [_, setCookie] = useCookies(['accessToken', 'refreshToken', "token"]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await postVerify(values).unwrap();


      setCookie('token', res?.data?.password_change_ticket, {
        httpOnly: false,
        maxAge: 14 * 24 * 60 * 60, // 14 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      toast.success('Email Verified Successfully');

      route.push("/reset-password");

    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
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
        <h3 className="text-xl font-semibold">Verify email</h3>
        <p className="text-sm text-zinc-500 mb-5 mt-2">Enter otp code for your email</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="size-12 text-xl"/>
                      <InputOTPSlot index={1} className="size-12 text-xl"/>
                      <InputOTPSlot index={2} className="size-12 text-xl"/>
                      <InputOTPSlot index={3} className="size-12 text-xl"/>
                      <InputOTPSlot index={4} className="size-12 text-xl"/>
                      <InputOTPSlot index={5} className="size-12 text-xl"/>
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <NSButton disabled={isLoading} isLoading={isLoading} type="submit" className="w-full rounded-lg py-3">
            Submit
          </NSButton>

        </form>
      </Form>
    </div>
  );
}
