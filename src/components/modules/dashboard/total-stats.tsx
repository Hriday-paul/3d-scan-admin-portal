"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

const TotalStats = () => {
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 font-sora">
        <Card className="bg-[#E9F4F975] border border-[#268CBE]">
          <CardHeader>
            <CardTitle className=" flex items-center justify-between text-sm font-semibold text-ns-neutral-dark">
              Total Registered User
              <div className=" flex items-center gap-0.5 text-[#5F1011]">
                <ArrowDown className=" w-4 h-4" />
                12 %
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className=" text-2xl font-extrabold text-ns-title">200</h2>
            <p className=" mt-2 text-sc-clarity-ice">Last 30 days</p>
          </CardContent>
        </Card>
        <Card className="bg-[#E9F4F975] border border-[#268CBE]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-ns-neutral-dark">
              Total 3D Head Scanner
              <div className=" flex items-center gap-0.5 text-[#165940]">
                <ArrowUp className=" w-4 h-4" />
                12 %
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className=" text-2xl font-extrabold text-ns-title">47</h2>
            <p className=" mt-2 text-sc-clarity-ice">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default TotalStats;
