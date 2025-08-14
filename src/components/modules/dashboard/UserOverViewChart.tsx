import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", uv: 90 },
  { name: "Feb", uv: 75 },
  { name: "Mar", uv: 85 },
  { name: "Apr", uv: 40 },
  { name: "May", uv: 80 },
  { name: "Jun", uv: 70 },
  { name: "Jul", uv: 60 },
  { name: "Aug", uv: 65 },
  { name: "Sep", uv: 100 },
  { name: "Oct", uv: 80 },
  { name: "Nov", uv: 70 },
  { name: "Dec", uv: 90 },
];

const UserOverViewChart = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
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
            dataKey="uv"
            stroke="none"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserOverViewChart;
