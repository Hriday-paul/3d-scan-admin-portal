"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/images/ns-logo.png";
import Image from "next/image";
import NSInput from "@/components/ui/core/NSInput";
import NSButton from "@/components/ui/core/NSButton";
import { useResetPasswordMutation } from "@/redux/api/auth.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCookies } from "react-cookie";

const formSchema = z
  .object({
    new_password: z
      .string()
      .min(10, { message: "Password must be at least 10 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
        {
          message:
            "Password must include uppercase, lowercase, number, and special character.",
        }
      ),

    new_password_confirmation: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
  });

type FormValues = z.infer<typeof formSchema>;

export function ResetPasswordForm() {

  const [cookies] = useCookies(["token"]);

  const [postReset, { isLoading }] = useResetPasswordMutation()
  const route = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password: "",
      new_password_confirmation: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await postReset({ ...values, password_change_ticket: cookies?.token }).unwrap();

      toast.success('Password Reset Successfully');

      route.push("/login");

    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
    }
  }

  return (
    <div className=" max-w-md mx-auto">
      <Form {...form}>
        <div className="flex justify-center">
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
          <div className="text-center mb-6">
            <h2 className="text-lg font-medium">
              Set new password to Nobelsports
            </h2>
          </div>

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" font-semibold text-sm text-ns-neutral-dark">
                  New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <NSInput
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" font-semibold text-sm text-ns-neutral-dark">
                  Confirmed Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <NSInput
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
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
