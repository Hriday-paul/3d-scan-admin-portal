"use client";

import { useState } from "react";
import moment from "moment";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Gauge,
  RotateCcw,
  Scan,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import NSButton from "@/components/ui/core/NSButton";
import { useGetKeenToolsQuotaQuery } from "@/redux/api/scan.api";
import ResetQuotaModal from "./ResetQuotaModal";

export default function KeenToolsQuotaStats() {
  const [isResetOpen, setIsResetOpen] = useState(false);
  const { data, isLoading, isError, refetch, isFetching } =
    useGetKeenToolsQuotaQuery();

  if (isLoading) {
    return (
      <Card className="w-full bg-[#E9F4F975] border border-[#268CBE]/30 p-5 lg:p-6 rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#268CBE]/20">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 bg-slate-200" />
            <Skeleton className="h-4 w-32 bg-slate-200" />
          </div>
          <Skeleton className="h-10 w-36 rounded-lg bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <Skeleton className="h-28 rounded-lg bg-slate-200" />
          <Skeleton className="h-28 rounded-lg bg-slate-200" />
          <Skeleton className="h-28 rounded-lg bg-slate-200" />
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full bg-red-50/60 border border-red-200 p-5 rounded-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-red-700">
            <AlertCircle className="size-5 shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">
                Failed to load KeenTools scan quota
              </h4>
              <p className="text-xs text-red-600">
                Could not retrieve quota details. Please try again.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  const maxScans = data?.max_scans ?? 0;
  const usedScans = data?.used_scans ?? 0;
  const remainingScans = data?.remaining_scans ?? 0;
  const isLimitReached =
    data?.is_limit_reached ?? (maxScans > 0 && remainingScans <= 0);

  const percentageUsed =
    maxScans > 0
      ? Math.min(100, Math.round((usedScans / maxScans) * 100))
      : 0;

  return (
    <>
      <Card className="w-full bg-[#E9F4F975] border border-[#268CBE]/30 p-5 lg:p-6 rounded-xl shadow-xs font-sora relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#268CBE]/20">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-lg lg:text-xl font-bold text-ns-title">
                KeenTools Scan Quota
              </h3>
              {isLimitReached ? (
                <Badge
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white gap-1 px-2.5 py-0.5 text-xs font-medium"
                >
                  <AlertTriangle className="size-3.5" /> Limit Reached
                </Badge>
              ) : (
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 px-2.5 py-0.5 text-xs font-medium">
                  <CheckCircle2 className="size-3.5" /> Quota Available
                </Badge>
              )}
            </div>

            {data?.updated_at && (
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <Clock className="size-3.5 text-gray-400" />
                Last updated:{" "}
                {moment(data.updated_at).format("MMM DD, YYYY · hh:mm A")}
              </p>
            )}
          </div>

          <NSButton
            onClick={() => setIsResetOpen(true)}
            className="rounded-lg text-sm px-4 py-2.5 flex items-center gap-2 shadow-xs"
          >
            <RotateCcw className="size-4" /> Reset Quota
          </NSButton>
        </div>

        {/* Warning if limit reached */}
        {isLimitReached && (
          <div className="mt-4 p-3.5 rounded-lg bg-red-100/80 border border-red-200 text-red-800 flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-red-600 shrink-0" />
              <span>
                <strong>Quota Limit Reached:</strong> Scan processing may be
                restricted. Reset or increase your maximum scan limit to
                continue.
              </span>
            </div>
            <Button
              size="sm"
              onClick={() => setIsResetOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white shrink-0 h-8 text-xs cursor-pointer"
            >
              Reset Now
            </Button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          {/* Max Scans */}
          <div className="bg-white/85 border border-slate-200/80 rounded-xl p-4 transition-all hover:shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Scan Limit
              </span>
              <div className="p-2 rounded-lg bg-[#268CBE]/10 text-[#268CBE]">
                <Gauge className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-ns-title">
                {maxScans}
              </h2>
              <p className="text-xs text-gray-500 mt-1">Total allowed quota</p>
            </div>
          </div>

          {/* Used Scans */}
          <div className="bg-white/85 border border-slate-200/80 rounded-xl p-4 transition-all hover:shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Used Scans
              </span>
              <div
                className={`p-2 rounded-lg ${
                  isLimitReached
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                <Scan className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-ns-title">
                {usedScans}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {percentageUsed}% of quota used
              </p>
            </div>
          </div>

          {/* Remaining Scans */}
          <div className="bg-white/85 border border-slate-200/80 rounded-xl p-4 transition-all hover:shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remaining Scans
              </span>
              <div
                className={`p-2 rounded-lg ${
                  remainingScans <= 5
                    ? "bg-red-100 text-red-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                <CheckCircle2 className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <h2
                className={`text-2xl lg:text-3xl font-extrabold ${
                  remainingScans <= 0 ? "text-red-600" : "text-ns-title"
                }`}
              >
                {remainingScans}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Available for processing
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-4 border-t border-[#268CBE]/15 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-gray-600">
            <span>Quota Utilization</span>
            <span>
              {usedScans} / {maxScans} scans ({percentageUsed}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isLimitReached || percentageUsed >= 100
                  ? "bg-red-500"
                  : percentageUsed >= 80
                  ? "bg-amber-500"
                  : "bg-[#268CBE]"
              }`}
              style={{ width: `${percentageUsed}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Reset Quota Modal */}
      <ResetQuotaModal
        open={isResetOpen}
        onOpenChange={setIsResetOpen}
        currentMaxScans={data?.max_scans}
      />
    </>
  );
}

