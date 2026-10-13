"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RotateCcw } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import NSInput from "@/components/ui/core/NSInput";
import NSButton from "@/components/ui/core/NSButton";
import { useResetKeenToolsQuotaMutation } from "@/redux/api/scan.api";

const resetQuotaSchema = z.object({
  max_scans: z.coerce
    .number({ invalid_type_error: "Please enter a valid number" })
    .int("Max scan limit must be a whole number")
    .positive("Max scan limit must be greater than 0")
    .min(1, "Max scan limit must be at least 1"),
});

type ResetQuotaFormValues = z.infer<typeof resetQuotaSchema>;

interface ResetQuotaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentMaxScans?: number;
}

export default function ResetQuotaModal({
  open,
  onOpenChange,
  currentMaxScans,
}: ResetQuotaModalProps) {
  const [resetQuota, { isLoading }] = useResetKeenToolsQuotaMutation();

  const form = useForm<ResetQuotaFormValues>({
    resolver: zodResolver(resetQuotaSchema),
    defaultValues: {
      max_scans: currentMaxScans ?? 40,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        max_scans: currentMaxScans ?? 40,
      });
    }
  }, [open, currentMaxScans, form]);

  const onSubmit = async (values: ResetQuotaFormValues) => {
    try {
      const res = await resetQuota({
        max_scans: values.max_scans,
      }).unwrap();

      toast.success(
        res?.message || "KeenTools scan quota has been reset successfully."
      );
      onOpenChange(false);
      form.reset();
    } catch (err: any) {
      toast.error(
        err?.data?.message ||
          err?.message ||
          "Failed to reset KeenTools scan quota. Please try again."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-ns-title flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#268CBE]/10 text-[#268CBE]">
              <RotateCcw className="size-5" />
            </span>
            Reset KeenTools Scan Quota
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 pt-1">
            Set a new maximum scan limit for KeenTools 3D scanning. This will
            reset the used scan count and apply the new quota.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-3"
          >
            <FormField
              control={form.control}
              name="max_scans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ns-title font-semibold text-sm">
                    Max Scan Limit
                  </FormLabel>
                  <FormControl>
                    <NSInput
                      type="number"
                      min={1}
                      placeholder="e.g. 60"
                      className="h-12 border-gray-300 focus:border-[#268CBE] focus:ring-[#268CBE] bg-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => onOpenChange(false)}
                className="rounded-lg px-4 py-2 border-gray-300 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </Button>

              <NSButton
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
                className="rounded-lg px-5 py-2"
              >
                Reset Quota
              </NSButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

