"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ScannerOverviewChart from "./ScannerOverviewChart";
import { NSDatePicker } from "@/components/ui/core/NSDatePicker";
import { useState } from "react";

export default function HeadScannerOverview() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Card className="w-full bg-[#E9F4F975] border border-[#268CBE]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl font-semibold text-ns-title">
          3D Head Scanner Overview
        </CardTitle>
        <div className="">
          <NSDatePicker date={date} setDate={setDate} />
        </div>
      </CardHeader>
      <ScannerOverviewChart />
    </Card>
  );
}
