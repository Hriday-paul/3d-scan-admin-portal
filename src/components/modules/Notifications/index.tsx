"use client";

import { Bell, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Notification() {
  const notifications = [
    {
      id: 1,
      message: "New prewritten template added to Communication Toolkit.",
      timestamp: "Fri, 12:30pm",
      isActive: true,
    },
    {
      id: 2,
      message: "Multiple failed login attempts detected for user David Kim.",
      timestamp: "Fri, 12:30pm",
      isActive: false,
    },
    {
      id: 3,
      message: "System maintenance scheduled for May 20, 10 PM – 12 AM UTC",
      timestamp: "Fri, 12:30pm",
      isActive: true,
    },
    {
      id: 4,
      message: "Multiple failed login attempts detected for user David Kim.",
      timestamp: "Fri, 12:30pm",
      isActive: false,
    },
    {
      id: 5,
      message: "New prewritten template added to Communication Toolkit.",
      timestamp: "Fri, 12:30pm",
      isActive: true,
    },
    {
      id: 6,
      message: "Multiple failed login attempts detected for user David Kim.",
      timestamp: "Fri, 12:30pm",
      isActive: false,
    },
  ];

  return (
    <div className=" font-sora p-4 md:p-6 lg:p-8 border border-[#268CBE] bg-[#268CBE]/5 rounded-lg">
      {/* Header */}
      <div className="mb-4">
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 bg-transparent"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          >
            Mark as Delete
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className="p-4 bg-white shadow-sm border-none"
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  notification.isActive
                    ? " bg-[#268CBE] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 text-sm leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {notification.timestamp}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
