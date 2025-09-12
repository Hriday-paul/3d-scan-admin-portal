"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import NSInput from "@/components/ui/core/NSInput";
import { NSDatePicker } from "@/components/ui/core/NSDatePicker";
import NotificationTable from "./NotificationTable";
import PushNotificationModal from "./PushNotificationModal";
import NSButton from "@/components/ui/core/NSButton";

export default function PushNotifications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Card className="w-full border-none shadow-none p-4 lg:p-6 bg-transparent">
      {/* Header */}
      <div className=" flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <NSInput
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full py-6 bg-[#00000014]/40 border-none shadow-none rounded-lg"
          />
        </div>
        <div className="w-full">
          <NSDatePicker
            className="w-full shadow-md py-6"
            date={date}
            setDate={setDate}
          />
        </div>
      </div>

      <PushNotificationModal>
        <NSButton className="w-full rounded-lg py-3">
          Send Notification
        </NSButton>
      </PushNotificationModal>

      <div className="">
        <NotificationTable />
      </div>
    </Card>
  );
}
