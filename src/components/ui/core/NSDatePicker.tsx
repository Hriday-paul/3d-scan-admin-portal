"use client";

import * as React from "react";
import { CalendarDays, Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Calendar } from "../calendar";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  className?: string;
}

export function NSDatePicker({ date, setDate, className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className={`${className} justify-between font-normal border-none shadow-none bg-[#00000014]/40 rounded-lg cursor-pointer`}
        >
          <Button variant="outline" id="date">
            {date ? date.toLocaleDateString() : "This Month"}
            <CalendarDays className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 bg-[#E9F4F975] border border-[#268CBE] cursor-pointer"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
