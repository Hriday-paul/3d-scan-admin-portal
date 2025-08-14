"use client";

import { Card } from "@/components/ui/card";
import pImg from "@/assets/images/db-profile.png";
import Image from "next/image";
import NSButton from "@/components/ui/core/NSButton";

const UserDetails = () => {
  const user = {
    firstName: "Eleanor",
    lastName: "Pena",
    email: "eleanor.pena@example.com",
    role: "Private User",
    dob: "12-03-2001",
    contactNumber: "+1 234 567 890",
    address: "123 Main St, Springfield",
    joinedDate: "11 Feb, 2025",
    status: "Active",
  };

  return (
    <Card className="border-[#268CBE] p-4 lg:p-6 w-full bg-[#268CBE]/5">
      <h2 className="text-slate-800 font-semibold text-xl mb-4">
        User Overview
      </h2>

      {/* Profile Image */}
      <div className="flex items-center justify-center mb-6">
        <Image
          src={pImg}
          alt="Profile Image"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
      </div>

      {/* User Details Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 bg-white rounded-lg overflow-hidden">
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-700">
                First Name
              </td>
              <td className="px-4 py-3">{user.firstName}</td>
              <td className="px-4 py-3 font-medium text-gray-700">Last Name</td>
              <td className="px-4 py-3">{user.lastName}</td>
              <td className="px-4 py-3 font-medium text-gray-700">Email</td>
              <td className="px-4 py-3">{user.email}</td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">Role</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Date of Birth
              </td>
              <td className="px-4 py-3">{user.dob}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Contact Number
              </td>
              <td className="px-4 py-3">{user.contactNumber}</td>
            </tr>

            <tr>
              <td className="px-4 py-3 font-medium text-gray-700">Address</td>
              <td className="px-4 py-3">{user.address}</td>
              <td className="px-4 py-3 font-medium text-gray-700">
                Joined Date
              </td>
              <td className="px-4 py-3">{user.joinedDate}</td>
              <td className="px-4 py-3 font-medium text-gray-700">Status</td>
              <td className="px-4 py-3">{user.status}</td>
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
