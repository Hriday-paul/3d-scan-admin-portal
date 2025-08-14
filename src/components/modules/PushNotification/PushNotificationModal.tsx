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

          <div className=" space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <NSInput
                className=" py-6"
                type="text"
                placeholder="Enter Title"
              />
            </div>

            {/* Target Audience Select */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Target Audience
              </label>
              <Select>
                <SelectTrigger className="w-full py-6 focus:outline-none focus-visible:ring-0 focus-visible:border-neutral-200">
                  <SelectValue placeholder="All Clients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="groupA">Group A</SelectItem>
                  <SelectItem value="groupB">Group B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <Textarea placeholder="Write something here..." />
            </div>

            {/* Date and Time Pickers */}
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Date
                </label>
                <NSDatePicker className=" py-6" date={date} setDate={setDate} />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-semibold mb-2">
                  Select Time
                </label>
                <NSInput
                  className="py-6 border-none shadow-none bg-[#00000014]/40"
                  type="time"
                  placeholder="Enter Title"
                />
              </div>
            </div>
          </div>
        </section>

        <NSButton className="rounded-lg text-white flex items-center justify-center gap-2 py-3 mt-2">
          Send <ArrowRight />
        </NSButton>
      </DialogContent>
    </Dialog>
  );
};

export default PushNotificationModal;
