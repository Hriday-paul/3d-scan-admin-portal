"use client";

import { useState } from "react";
import NSButton from "@/components/ui/core/NSButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import NSInput from "@/components/ui/core/NSInput";
import { NSDatePicker } from "@/components/ui/core/NSDatePicker";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSendPushNotificationMutation } from "@/redux/api/PushNotificaction.api";
import { toast } from "sonner";

const PushNotificationModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="[&>button:last-child]:hidden">
        {/* Custom close button */}
        <div
          className="flex items-center justify-end hover:cursor-pointer transform transition duration-300 ease-in-out"
          onClick={() => setOpen(false)}
        >
          <div className="hover:text-red-500 rounded-full border hover:border-red-500 flex items-center justify-center p-1">
            <X className="w-4 h-4" />
          </div>
        </div>

        {/* ------------- Content ------------- */}
        <section className="flex flex-col ">
          <h2 className="text-xl font-bold text-center">Push Notification</h2>

          <SendNotificationForm />
        </section>

      </DialogContent>
    </Dialog>
  );
};

export default PushNotificationModal;


const formSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  message: z.string().min(10, { message: "message min 10 character" }),

});

const SendNotificationForm = () => {

  const [handleSendPushNotification, { isLoading }] = useSendPushNotificationMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await handleSendPushNotification(values).unwrap();
      toast.success('Push notification send successfully');
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
    }
  }


  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-ns-title font-semibold text-sm">
                Title
              </FormLabel>
              <FormControl>
                <NSInput
                  placeholder="Enter title"
                  type="text"
                  className={`h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-ns-title font-semibold text-sm">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter message"
                  rows={5}
                  className={`h-12 border-gray-300 focus:border-teal-500 focus:ring-teal-500`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <NSButton type="submit" isLoading={isLoading} disabled={isLoading} className="w-full rounded-lg text-white flex items-center justify-center gap-2 py-3 mt-2">
          Send <ArrowRight />
        </NSButton>

      </form>

    </Form>
  )

}
