"use client";

import { useRef, useState } from "react";
import { SquarePen } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import defaultImg from "@/assets/images/db-profile.png";
import EditProfileForm from "./EditProfileForm";
import ChangePassForm from "./ChangePassForm";
import { useGetUserProfileQuery } from "@/redux/api/auth.api";
import Loader from "@/utils/Loader";
import ErrorComponent from "@/utils/ErrorComponent";

const EditProfile = () => {
  const { isLoading, isSuccess, isError, data } = useGetUserProfileQuery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(file);
    }
  };

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <>
      {/* ----- Change Profile Picture ----- */}
      {isSuccess && <section className="w-full bg-[linear-gradient(180deg,#0D5C9E_0%,rgba(29,129,191,0)_100%)] flex items-center justify-center gap-4 py-12">
        <div className="w-32 h-32 rounded-full overflow-hidden relative border border-white group">
          <Image
            src={previewImage ? URL.createObjectURL(previewImage) : data?.data?.profile_picture}
            alt="Profile Preview"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover"
          />

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Pencil Icon */}
          <div
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer shadow hover:scale-105 transition"
            onClick={handleIconClick}
          >
            <SquarePen className="w-5 h-5 text-black" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">{data?.data?.full_name}</h2>
          <p className="text-sm text-white">Admin</p>
        </div>
      </section>}

      <section>
        <Tabs defaultValue="editProfile" className="mt-6">
          <div className=" flex items-center justify-center">
            <TabsList className="flex flex-wrap space-x-6 bg-transparent cursor-pointer">
              <TabsTrigger
                value="editProfile"
                className=" font-semibold cursor-pointer px-4 py-2 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:font-semibold focus:outline-none whitespace-nowrap shadow-none data-[state=active]:shadow-none data-[state=active]:rounded-none transition-colors data-[state=active]:bg-transparent"
              >
                Edit Profile
              </TabsTrigger>
              <TabsTrigger
                value="changePass"
                className=" font-semibold cursor-pointer px-4 py-2 text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:font-semibold focus:outline-none whitespace-nowrap shadow-none data-[state=active]:shadow-none data-[state=active]:rounded-none transition-colors data-[state=active]:bg-transparent"
              >
                Change Password
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="editProfile">
            {isSuccess && <EditProfileForm defaultData={data?.data} image={previewImage} />}
          </TabsContent>

          <TabsContent value="changePass">
            <ChangePassForm />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default EditProfile;
