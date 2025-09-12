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
import NSButton from "@/components/ui/core/NSButton";
import { useForgotPasswordMutation } from "@/redux/api/auth.api";
// import { useCookies } from "react-cookie";
import { toast } from "sonner";
// import { config } from "@/utils/config";

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

function ForgotPassForm() {
    const [postApi, { isLoading }] = useForgotPasswordMutation();
    const route = useRouter();
    // const [_, setCookie] = useCookies(['token']);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: FormValues) {
        try {
            const res = await postApi(values).unwrap();

            // setCookie('token', res?.data?.token, {
            //     httpOnly: false,
            //     maxAge: 14 * 24 * 60 * 60, // 14 days
            //     path: '/',
            //     sameSite: 'lax',
            //     secure: config.hasSSL,
            // });

            toast.success('Otp send to your email');

            route.push("/email-verify");

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
                <h3 className="text-xl font-semibold">Forgot Password</h3>
                <p className="text-sm text-zinc-500 mb-5 mt-2">Enter your email for send a otp code to your email</p>
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

                    {/* <Button
                        type="submit"
                        className="w-full bg-[#268CBE] hover:bg-[#268CBE] py-5 cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Send Code"}
                    </Button> */}

                    <NSButton disabled={isLoading} isLoading={isLoading} type="submit" className="w-full rounded-lg py-3">
                        Submit
                    </NSButton>

                </form>
            </Form>
        </div>
    );
}


export default ForgotPassForm