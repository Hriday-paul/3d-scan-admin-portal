"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { useAllScansQuery } from "@/redux/api/scan.api";
import Loader from "@/utils/Loader";
import ErrorComponent from "@/utils/ErrorComponent";
import moment from "moment";

const ScanTable = React.memo(({ currentPage, setCurrentPage, search }: { currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, search: string }) => {

  const { isLoading, isError, isSuccess, data, isFetching } = useAllScansQuery({ page: currentPage, search, ordering : "-created_at" });

  const pageSize = 10;

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <Card className="overflow-x-auto p-0 border-none shadow-none rounded-none bg-transparent relative">

      {isFetching && <div className="absolute top-0 left-0 w-full h-full bg-white/60">
        <Loader />
      </div>}

      {/* Table */}
      <table className="w-full table-auto text-left text-sm overflow-x-auto">
        <thead className="bg-[#268CBE] text-white">
          <tr>
            <th className="px-4 py-4 text-center">Serial</th>
            <th className="px-4 py-4 text-center">Name</th>
            <th className="px-4 py-4 text-center">Email</th>
            <th className="px-4 py-4 text-center">Submission Date</th>
            <th className="px-4 py-4 text-center">Scan Status</th>
            <th className="px-4 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.results?.map((user, indx) => (
            <tr
              key={user?.scan_id}
              className="border-b hover:bg-[#268CBE]/10 text-gray-800"
            >
              <td className="px-4 py-2 text-center">#{(currentPage - 1) * pageSize + (indx + 1)}</td>
              <td className="flex items-center justify-center gap-2 px-4 py-2">
                {user.name}
              </td>
              <td className="px-4 py-2 text-center">{user?.email}</td>
              <td className="px-4 py-2 text-center">{moment(user?.submission_date).format("DD-MM-YYYY h:mm a")}</td>
              <td
                className={cn(
                  "px-4 py-2 text-center font-medium",
                  user?.status === "PROCESSING"
                    ? "text-yellow-600"
                    : user?.status === "COMPLETED"
                      ? "text-green-600"
                      : "text-red-600"
                )}
              >
                {user?.status}
              </td>
              <td className="px-4 py-2 flex items-center justify-center">
                <Link href={`/scan-submissions/${user?.scan_id}`}>
                  <Button className=" border-none shadow-none outline-none bg-transparent cursor-pointer hover:bg-transparent text-[#268CBE]">
                    <Eye className="size-6" />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {isSuccess && <div className="flex items-center justify-end gap-2 p-4">
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
          Page {currentPage} of {Math.ceil(data?.data?.count / pageSize)}
        </span>
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage >= Math.ceil(data?.data?.count / pageSize)}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data?.data?.count / pageSize)))
          }
          className=" rounded-full border border-[#268CBE] h-8 w-8 flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="text-[#268CBE]" />
        </Button>
      </div>}
    </Card>
  );
});

export default ScanTable;
