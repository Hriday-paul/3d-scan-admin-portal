import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type UserOverviewProps = {
  data: {
    labels: string[];
    data: number[];
  };
};

const UserOverViewChart = ({ data }: UserOverviewProps) => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data?.labels?.map((label, indx) => ({
            name: label,
            user: data.data[indx] ?? 0,
          }))}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#167CB7" stopOpacity={1} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="user"
            stroke="none"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserOverViewChart;

