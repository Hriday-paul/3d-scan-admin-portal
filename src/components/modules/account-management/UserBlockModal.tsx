"use client";

import { useState } from "react";
import NSButton from "@/components/ui/core/NSButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, X } from "lucide-react";
import { useBlock_userMutation } from "@/redux/api/users.api";
import { toast } from "sonner";

const UserBlockModal = ({ children, id }: { children: React.ReactNode, id: number }) => {
  const [handleBlockByApi, { isLoading }] = useBlock_userMutation();

  const [open, setOpen] = useState(false);

  const handleBlock = async () => {
    try {
      await handleBlockByApi({ id }).unwrap();
      toast.success("User blocked successfully");
    } catch (err: any) {
      toast.error(err?.data?.message)
    }
  }

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

        <h2 className="text-3xl font-bold text-slate-900">Block User</h2>
        <p className="font-medium text-slate-700">
          Are you sure you want to block this user?
        </p>

        <NSButton disabled={isLoading} isLoading={isLoading} className="rounded-lg text-white flex items-center justify-center gap-2 py-3 mt-2" onClick={handleBlock}>
          Confirm <ArrowRight />
        </NSButton>
      </DialogContent>
    </Dialog>
  );
};

export default UserBlockModal;
