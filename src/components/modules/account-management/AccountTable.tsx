"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import UserBlockModal from "./UserBlockModal";
import { useAllusersQuery } from "@/redux/api/users.api";
import ErrorComponent from "@/utils/ErrorComponent";
import moment from "moment";
import emptyImg from "../../../../public/empty-data.png"
import Image from "next/image";
import Loader from "@/utils/Loader";
import React from "react";

const AccountTable = React.memo(({ currentPage, setCurrentPage, search }: { currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, search: string }) => {

  const { isLoading, isError, data, isSuccess, isFetching } = useAllusersQuery({ page: currentPage, search });


  const pageSize = 10; // items per page

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
      <table className="min-w-full table-auto text-left text-sm">
        <thead className="bg-[#268CBE] text-white">
          <tr>
            <th className="px-4 py-4 text-center">Serial</th>
            <th className="px-4 py-4 text-center">Name</th>
            <th className="px-4 py-4 text-center">Role</th>
            <th className="px-4 py-4 text-center">Date of Birth</th>
            {/* <th className="px-4 py-4 text-center">Number of Scan</th> */}
            <th className="px-4 py-4 text-center">Status</th>
            <th className="px-4 py-4 text-center">Joined Date</th>
            <th className="px-4 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.data?.results?.map((user, indx) => (
            <tr
              key={user?.id}
              className="border-b hover:bg-[#268CBE]/10 text-gray-800"
            >
              <td className="px-4 py-2 text-center">{(currentPage - 1) * pageSize + (indx + 1)}</td>
              <td className="flex items-center justify-center gap-2 px-4 py-2">
                <Image src={user?.profile_picture || "/empty-user.png"} alt="user image" className="h-8 w-8 rounded-full" height={500} width={500} />
                {user?.first_name} {user?.last_name}
              </td>
              <td className="px-4 py-2 text-center">{user?.role}</td>
              <td className="px-4 py-2 text-center">{user?.date_of_birth}</td>
              {/* <td className="px-4 py-2 text-center">{user?.}</td> */}
              <td
                className={cn(
                  "px-4 py-2 text-center font-medium",
                  user?.status === "PENDING"
                    ? "text-yellow-600"
                    : user.status === "ACTIVE"
                      ? "text-green-600"
                      : "text-red-600"
                )}
              >
                {user?.status}
              </td>
              <td className="px-4 py-2 text-center">{moment(user?.date_joined).format("DD-MM-YYYY")}</td>
              <td className=" flex items-center justify-center gap-2 px-4 py-2">
                <Link href={`/account-details/${user?.id}`}>
                  <Button className=" border-none shadow-none outline-none bg-transparent cursor-pointer hover:bg-transparent text-[#268CBE]">
                    <Eye className="size-5" />
                  </Button>
                </Link>
                <UserBlockModal id={user?.id} isBlocked={user?.status == "SUSPENDED"}>
                  <Button className=" border-none shadow-none outline-none bg-transparent cursor-pointer hover:bg-transparent">
                    <Ban className={`${user?.status == "SUSPENDED" ? "text-green-500" : "text-red-500"} size-5`} />
                  </Button>
                </UserBlockModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {
        isSuccess && data?.data?.results?.length <= 0 && <div className="flex justify-center items-center min-h-72">
          <Image src={emptyImg} className="h-36 w-auto" alt="empty-image" />
        </div>
      }

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

export default AccountTable;
