"use client";

import { Bell, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMarkReadAllNotificationMutation, useNotificationsQuery } from "@/redux/api/baseApi";
import ErrorComponent from "@/utils/ErrorComponent";
import Loader from "@/utils/Loader";
import { useState } from "react";
import { toast } from "sonner";
import NSButton from "@/components/ui/core/NSButton";
import moment from "moment";

export default function Notification() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, isSuccess, data, isError, isFetching } = useNotificationsQuery({ page: currentPage});
  const [handleMarkAllRead, { isLoading: markLoading }] = useMarkReadAllNotificationMutation();

  const pageSize = 10;

  const HandleReadAll = async () => {
    try {
      await handleMarkAllRead().unwrap();
      toast.success("All notification read successfully")
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong, try again")
    }
  }

  if (isError) {
    return <ErrorComponent />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className=" font-sora p-4 md:p-6 lg:p-8 border border-[#268CBE] bg-[#268CBE]/5 rounded-lg">
      {/* Header */}
      <div className="mb-4">
        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* <Button
            variant="outline"
            size="sm"
            className="text-gray-600 bg-transparent"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter All
          </Button> */}
          {/* <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent cursor-pointer"
          >
            Mark all read
          </Button> */}
          <NSButton onClick={HandleReadAll} isLoading={markLoading} disabled={markLoading} className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent cursor-pointer border  rounded px-3 py-1 text-sm font-normal">
            Mark all read
          </NSButton>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 relative">

        {isFetching && <div className="absolute top-0 left-0 w-full h-full bg-white/60">
          <Loader />
        </div>}

        {data?.data?.results?.map((notification) => (
          <Card
            key={notification?.id}
            className="p-4 bg-white shadow-sm border-none"
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg " bg-[#268CBE] text-white`}
              >
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className={`text-gray-900 text-sm leading-relaxed ${!notification?.is_read ? "font-semibold" : ""}`}>
                  {notification?.message}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {moment(notification?.created_at).format("DD-MM-YYYY h:mm a")}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isSuccess && <div className="flex items-center justify-end gap-2 p-4">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className=" rounded-full border border-[#268CBE] h-8 w-8 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="text-[#268CBE]" />
        </Button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {Math.ceil(data?.data?.count / pageSize)}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage >= Math.ceil(data?.data?.count / pageSize)}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data?.data?.count / pageSize)))
          }
          className=" rounded-full border border-[#268CBE] h-8 w-8 flex items-center justify-center cursor-pointer disabled:!cursor-not-allowed"
        >
          <ChevronRight className="text-[#268CBE]" />
        </Button>
      </div>}

    </div>
  );
}
