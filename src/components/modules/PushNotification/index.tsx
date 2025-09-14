"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import NSInput from "@/components/ui/core/NSInput";
import { NSDatePicker } from "@/components/ui/core/NSDatePicker";
import NotificationTable from "./NotificationTable";
import PushNotificationModal from "./PushNotificationModal";
import NSButton from "@/components/ui/core/NSButton";

export default function PushNotifications() {

  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [search]);

  return (
    <Card className="w-full border-none shadow-none p-4 lg:p-6 bg-transparent">
      {/* Header */}
      <div className=" flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <NSInput
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full py-6 bg-[#00000014]/40 border shadow-none rounded-lg"
          />
        </div>
      </div>

      <PushNotificationModal>
        <NSButton className="w-full rounded-lg py-3">
          Send Notification
        </NSButton>
      </PushNotificationModal>

      <div className="">
        <NotificationTable currentPage={currentPage} setCurrentPage={setCurrentPage} search={debouncedInputValue}/>
      </div>
    </Card>
  );
}
