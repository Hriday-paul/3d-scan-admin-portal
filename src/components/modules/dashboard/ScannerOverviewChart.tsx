import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const chartData = [
  { month: "Jan", value: 50 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 30 },
  { month: "May", value: 35 },
  { month: "Jun", value: 42 },
  { month: "Jul", value: 47 },
  { month: "Aug", value: 52 },
  { month: "Sep", value: 60 },
  { month: "Oct", value: 72 },
  { month: "Nov", value: 80 },
  { month: "Dec", value: 88 },
];

const ScannerOverviewChart = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity={1} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScannerOverviewChart;
