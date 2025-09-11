"use client";

import { Card } from "@/components/ui/card";
import pImg from "@/assets/images/db-profile.png";
import Image from "next/image";
import NSButton from "@/components/ui/core/NSButton";
import { useUserDetailsQuery } from "@/redux/api/users.api";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

const UserDetails = ({ id }: { id: string }) => {

  const { isLoading, data, isError, isSuccess } = useUserDetailsQuery({ id });

  return (
    isLoading ?

      <Skeleton className="h-96 w-full bg-slate-200" /> :
      
      <Card className="border-[#268CBE] p-4 lg:p-6 w-full bg-[#268CBE]/5">
      <h2 className="text-slate-800 font-semibold text-xl mb-4">
        User Overview
      </h2>

      {/* Profile Image */}
      {/* <div className="flex items-center justify-center mb-6">
        <Image
          src={pImg}
          alt="Profile Image"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
      </div> */}

      {/* User Details Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 bg-white rounded-lg overflow-hidden">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">
                First Name
              </td>
              <td className="px-4 py-3">{data?.data?.first_name}</td>
              <td className="px-4 py-3 font-medium text-gray-700">Last Name</td>
              <td className="px-4 py-3">{data?.data?.last_name}</td>
              <td className="px-4 py-3 font-medium text-gray-700">Email</td>
              <td className="px-4 py-3">{data?.data?.email}</td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">Role</td>
              <td className="px-4 py-3">{data?.data?.role}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Date of Birth
              </td>
              <td className="px-4 py-3">{data?.data?.date_of_birth}</td>
              {/* <td className="px-4 py-3 font-medium text-gray-700">
                Contact Number
              </td>
              <td className="px-4 py-3">{data?.data?.contactNumber}</td> */}
            </tr>

            <tr>
              {/* <td className="px-4 py-3 font-medium text-gray-700">Address</td>
              <td className="px-4 py-3">{user.address}</td> */}
              <td className="px-4 py-3 font-medium text-gray-700">
                Joined Date
              </td>
              <td className="px-4 py-3">{moment(data?.data?.date_joined).format("DD-MM-YYYY")}</td>
              <td className="px-4 py-3 font-medium text-gray-700">Status</td>
              <td className="px-4 py-3">{data?.data?.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full flex items-center justify-between gap-4">
        <NSButton className=" w-full rounded-lg py-4">Approved</NSButton>
        <NSButton className=" w-full rounded-lg py-4 bg-[#E0EFF5] text-[#268CBE] inset-shadow-sm inset-shadow-indigo-[#E0EFF5]">
          Cancel
        </NSButton>
      </div>
    </Card>
  );
};

export default UserDetails;
