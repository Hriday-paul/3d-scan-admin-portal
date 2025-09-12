"use client"
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAllusersQuery } from "@/redux/api/users.api";
import moment from "moment";
import Image from "next/image";
import emptyImg from "../../../../public/empty-data.png"
import { Skeleton } from "@/components/ui/skeleton";
import ErrorComponent from "@/utils/ErrorComponent";
import Link from "next/link";
import { Eye } from "lucide-react";

const RecentAccountList = () => {

  const { isLoading, isError, data, isSuccess } = useAllusersQuery({});

  if (isError) {
    return <ErrorComponent />
  }

  return (
    isLoading ?

      <Skeleton className="h-96 w-full bg-slate-200" /> :

      <Card className="overflow-x-auto p-0 border-none shadow-none rounded-none">
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
                <td className="px-4 py-2 text-center">{indx}</td>

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

                <td className="px-4 py-2 text-center">
                  <Link href={`/account-details/${user?.id}`}>
                    <Button className=" border-none shadow-none outline-none bg-transparent cursor-pointer hover:bg-transparent text-[#268CBE]">
                      <Eye className="size-5" />
                    </Button>
                  </Link>
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
      </Card>
  );
};

export default RecentAccountList;
