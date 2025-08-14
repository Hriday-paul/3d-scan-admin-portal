"use client";

import { useState } from "react";
import NSButton from "@/components/ui/core/NSButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import NSInput from "@/components/ui/core/NSInput";
import { Textarea } from "@/components/ui/textarea";

const ContactDetailsModal = ({ children }: { children: React.ReactNode }) => {
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
            <Label className=" text-lg font-semibold text-slate-700">
              Name
            </Label>
            <NSInput placeholder="Aria Tabascos" className="mt-2 py-6" />
          </div>
          <div>
            <Label className=" text-lg font-semibold text-slate-700">
              Email
            </Label>
            <NSInput placeholder="aria1234@gmail.com" className="mt-2 py-6" />
          </div>
          <div>
            <Label className=" text-lg font-semibold text-slate-700">
              Message
            </Label>
            <p className="mt-2 text-sm font-medium text-slate-700">
              I am experiencing multiple issues with the app. First, I am unable
              to log in to my account despite entering the correct credentials.
              I have tried resetting my password several times but never
              received the password reset email. Additionally, some surveys that
              I should be eligible for are not appearing in my survey list.
              After completing a few surveys, my points have not been credited
              to my account, which is quite frustrating as I rely on these
              rewards. Furthermore, I attempted to redeem my points for a gift
              card, but the redemption process failed with an error message. On
              top of that, the app occasionally crashes when I try to start a
              survey, and I am not receiving any notifications about new
              surveys. I also tried updating my profile information, but the
              changes do not seem to save. Please assist me in resolving these
              issues as soon as possible.
            </p>
          </div>
          <div>
            <Textarea placeholder="Add Replay" />
          </div>
        </section>

        <NSButton className="rounded-lg text-white flex items-center justify-center gap-2 py-3 mt-2">
          Submit <ArrowRight />
        </NSButton>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDetailsModal;
