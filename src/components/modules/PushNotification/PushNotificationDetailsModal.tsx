"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { IContact, IPush_notification } from "@/redux/types";
import { X } from "lucide-react";

const PushNotificationDetailsModal = ({ children, data }: { children: React.ReactNode, data: IPush_notification }) => {
  const [open, setOpen] = useState(false);

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

        {/* ------------ Content ------------- */}

        <section className=" flex flex-col space-y-3">
          
          <div>
            <Label className="text-lg font-semibold text-slate-700">
              Message
            </Label>
            <p className="mt-2 text-sm font-medium py-2 text-zinc-800">
              {data?.message}
            </p>
          </div>
          {/* <div>
            <Textarea placeholder="Add Replay" />
          </div> */}
        </section>

        {/* <NSButton className="rounded-lg text-white flex items-center justify-center gap-2 py-3 mt-2">
          Submit <ArrowRight />
        </NSButton> */}
      </DialogContent>
    </Dialog>
  );
};

export default PushNotificationDetailsModal;
