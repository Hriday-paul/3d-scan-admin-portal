"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStatsQuery } from "@/redux/api/dashboard.api";
import ErrorComponent from "@/utils/ErrorComponent";
import { ArrowDown, ArrowUp } from "lucide-react";

const TotalStats = () => {

  const { isLoading, isError, data, isSuccess } = useAdminStatsQuery({});

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 font-sora">
        <Card className="bg-[#E9F4F975] border border-[#268CBE]">
          <CardHeader>
            <CardTitle className=" flex items-center justify-between text-sm font-semibold text-ns-neutral-dark">
              {isLoading ? <Skeleton className="h-4 w-40 bg-slate-200" /> : "Total Registered User"}
              <div className=" flex items-center gap-0.5">
                {isSuccess ? data?.data?.total_registered_user?.change >= 0 ? <ArrowDown className=" w-4 h-4 text-[#165940]" /> : <ArrowDown className=" w-4 h-4 text-red-500 rotate-180" /> : <></>}
                {data?.data?.total_registered_user?.change}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <>
              <Skeleton className="h-8 w-20 mb-2 bg-slate-200" />
              <Skeleton className="h-4 w-28 bg-slate-200" />
            </> : <>
              <h2 className=" text-2xl font-extrabold text-ns-title">{data?.data?.total_registered_user?.count}</h2>
              <p className=" mt-2 text-sc-clarity-ice">Last 30 days</p>
            </>}
          </CardContent>
        </Card>
        <Card className="bg-[#E9F4F975] border border-[#268CBE]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-ns-neutral-dark">
              {isLoading ? <Skeleton className="h-4 w-40 bg-slate-200" /> : "Total 3D Head Scanner"}
              <div className=" flex items-center gap-0.5">
                {isSuccess ? data?.data?.total_3d_head_scanner?.change >= 0 ? <ArrowDown className=" w-4 h-4 text-[#165940]" /> : <ArrowDown className=" w-4 h-4 text-red-500 rotate-180" /> : <></>}
                {data?.data?.total_3d_head_scanner?.change}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? <>
              <Skeleton className="h-8 w-20 mb-2 bg-slate-200" />
              <Skeleton className="h-4 w-28 bg-slate-200" />
            </> : <>
              <h2 className=" text-2xl font-extrabold text-ns-title">{data?.data?.total_3d_head_scanner?.count}</h2>
              <p className=" mt-2 text-sc-clarity-ice">Last 30 days</p>
            </>}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TotalStats;
