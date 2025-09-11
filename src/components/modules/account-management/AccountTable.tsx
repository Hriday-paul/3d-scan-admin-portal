"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import UserBlockModal from "./UserBlockModal";
import { useAllusersQuery } from "@/redux/api/users.api";
import ErrorComponent from "@/utils/ErrorComponent";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import emptyImg from "../../../../public/empty-data.png"
import Image from "next/image";

const AccountTable = () => {

  const { isLoading, isError, data, isSuccess } = useAllusersQuery({});

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // items per page

  const totalPages = Math.ceil(50 / pageSize);

  if (isError) {
    return <ErrorComponent />
  }

  return (
    isLoading ?

      <Skeleton className="h-96 w-full bg-slate-200" /> :

      <Card className="overflow-x-auto p-0 border-none shadow-none rounded-none bg-transparent">
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
            {data?.data?.map((user, indx) => (
              <tr
                key={user?.id}
                className="border-b hover:bg-[#268CBE]/10 text-gray-800"
              >
                <td className="px-4 py-2 text-center">{indx + 1}</td>
                <td className="flex items-center justify-center gap-2 px-4 py-2">
                  {user?.first_name} {user?.last_name}
                </td>
                <td className="px-4 py-2 text-center">{user?.role}</td>
                <td className="px-4 py-2 text-center">{user?.date_of_birth}</td>
                {/* <td className="px-4 py-2 text-center">{user?.}</td> */}
                <td
                  className={cn(
                    "px-4 py-2 text-center font-medium",
                    user?.status === "Pending"
                      ? "text-yellow-600"
                      : user.status === "Active"
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
                      <Eye />
                    </Button>
                  </Link>
                  <UserBlockModal id={user?.id}>
                    <Button className=" border-none shadow-none outline-none bg-transparent cursor-pointer hover:bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M16.1542 11.8835L11.4189 7.148C11.6507 7.02576 11.8993 6.93241 12.1645 6.86795C12.4299 6.80332 12.7154 6.771 13.0209 6.771C14.0028 6.771 14.8316 7.11062 15.5074 7.78987C16.1831 8.46894 16.5209 9.30293 16.5209 10.2918C16.5209 10.5766 16.4868 10.8602 16.4188 11.1428C16.3507 11.4255 16.2625 11.6724 16.1542 11.8835ZM6.52496 18.7334C7.46673 18.0363 8.47514 17.4933 9.55017 17.1044C10.625 16.7155 11.775 16.521 13 16.521C13.589 16.521 14.1331 16.5797 14.6324 16.697C15.1318 16.8144 15.5752 16.9419 15.9627 17.0795L12.6626 13.7793C11.8069 13.6918 11.0871 13.3578 10.5032 12.7773C9.91913 12.1966 9.58682 11.4785 9.50629 10.6231L6.34594 7.4627C5.72645 8.20298 5.23615 9.03733 4.87504 9.96575C4.51393 10.8942 4.33337 11.9056 4.33337 13.0002C4.33337 14.135 4.52855 15.1822 4.91892 16.1418C5.3091 17.1015 5.84444 17.9653 6.52496 18.7334ZM19.6791 18.4959C20.2707 17.7556 20.7499 16.9282 21.1166 16.0137C21.4834 15.0992 21.6667 14.0947 21.6667 13.0002C21.6667 10.5988 20.8226 8.55398 19.1344 6.86579C17.4462 5.17759 15.4014 4.3335 13 4.3335C11.9404 4.3335 10.9462 4.5099 10.0176 4.8627C9.08921 5.21551 8.25143 5.70166 7.50429 6.32114L19.6791 18.4959ZM13 23.2918C11.582 23.2918 10.2469 23.0231 8.99496 22.4856C7.7428 21.948 6.65071 21.2134 5.71869 20.2815C4.78684 19.3495 4.05216 18.2574 3.51464 17.0052C2.97713 15.7533 2.70837 14.4182 2.70837 13.0002C2.70837 11.5711 2.97713 10.2332 3.51464 8.98668C4.05216 7.74013 4.78684 6.65084 5.71869 5.71881C6.65071 4.78696 7.7428 4.05228 8.99496 3.51477C10.2469 2.97725 11.582 2.7085 13 2.7085C14.4291 2.7085 15.767 2.97725 17.0135 3.51477C18.2601 4.05228 19.3494 4.78696 20.2814 5.71881C21.2132 6.65084 21.9479 7.74013 22.4854 8.98668C23.0229 10.2332 23.2917 11.5711 23.2917 13.0002C23.2917 14.4182 23.0229 15.7533 22.4854 17.0052C21.9479 18.2574 21.2132 19.3495 20.2814 20.2815C19.3494 21.2134 18.2601 21.948 17.0135 22.4856C15.767 23.0231 14.4291 23.2918 13 23.2918ZM13 21.6668C13.9848 21.6668 14.9293 21.506 15.8335 21.1845C16.7375 20.8629 17.5486 20.4265 18.2667 19.8753C17.5625 19.3307 16.7479 18.9064 15.8229 18.6023C14.8979 18.2981 13.957 18.146 13 18.146C12.0431 18.146 11.1108 18.2929 10.2031 18.5866C9.29549 18.8804 8.47225 19.3099 7.73342 19.8753C8.45149 20.4265 9.26254 20.8629 10.1666 21.1845C11.0708 21.506 12.0153 21.6668 13 21.6668Z"
                          fill="#FE5858"
                        />
                      </svg>
                    </Button>
                  </UserBlockModal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {
          isSuccess && data?.data?.length <= 0 && <div className="flex justify-center items-center min-h-72">
            <Image src={emptyImg} className="h-36 w-auto" alt="empty-image" />
          </div>
        }

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

export default AccountTable;
