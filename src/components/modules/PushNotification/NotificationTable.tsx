"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import PushNotificationModal from "./PushNotificationModal";

// Single user object
const user = {
  title: "Eleanor Pena",
  sendTo: "System Update",
  status: "All Clients",
  date: "11 July,2025",
};

// Generate 50 users with unique serial numbers
const allData = Array.from({ length: 50 }, (_, i) => ({
  serial: i + 1,
  ...user,
}));

const NotificationTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(allData.length / pageSize);

  const currentData = allData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Card className="overflow-x-auto p-0 border-none shadow-none rounded-none bg-transparent">
      {/* Table */}
      <table className="min-w-full table-auto text-left text-sm">
        <thead className="bg-[#268CBE] text-white">
          <tr>
            <th className="px-4 py-4 text-center">Serial</th>
            <th className="px-4 py-4 text-center">Title</th>
            <th className="px-4 py-4 text-center">Send To</th>
            <th className="px-4 py-4 text-center">Status</th>
            <th className="px-4 py-4 text-center">Date</th>
            <th className="px-4 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((user) => (
            <tr
              key={user.serial}
              className="border-b hover:bg-[#268CBE]/10 text-gray-800"
            >
              <td className="px-4 py-2 text-center">#{user.serial}</td>
              <td className="flex items-center justify-center gap-2 px-4 py-2">
                {user.title}
              </td>
              <td className="px-4 py-2 text-center">{user.sendTo}</td>
              <td className="px-4 py-2 text-center">{user.status}</td>
              <td className="px-4 py-2 text-center">{user.date}</td>
              <td className="px-4 py-2 flex items-center justify-center">
                <PushNotificationModal>
                  <Button className=" border-none shadow-none outline-none bg-transparent cursor-pointer hover:bg-transparent text-[#268CBE]">
                    <Eye />
                  </Button>
                </PushNotificationModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 p-4">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className=" rounded-full border border-[#268CBE] h-8 w-8 flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="text-[#268CBE]" />
        </Button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className=" rounded-full border border-[#268CBE] h-8 w-8 flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="text-[#268CBE]" />
        </Button>
      </div>
    </Card>
  );
};

export default NotificationTable;
