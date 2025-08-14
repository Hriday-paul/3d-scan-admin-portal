"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import UserOverViewChart from "./UserOverViewChart";
import { NSDatePicker } from "@/components/ui/core/NSDatePicker";
import React, { useState } from "react";

export default function UserManagementChart() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Card className="w-full bg-[#E9F4F975] border border-[#268CBE]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <CardTitle className="text-xl font-semibold text-ns-title">
          User Overview
        </CardTitle>
        <div>
          <NSDatePicker date={date} setDate={setDate} />
        </div>
      </CardHeader>
      {/* ---------------------------------- Chart ---------------------------------- */}
      <UserOverViewChart />
    </Card>
  );
}
