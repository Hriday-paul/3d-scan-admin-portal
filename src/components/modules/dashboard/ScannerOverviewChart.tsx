import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type ScanOverviewProps = {
  data: {
    labels: string[];
    data: number[];
  };
};

const ScannerOverviewChart = ({ data }: ScanOverviewProps) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data?.labels?.map((label, indx) => ({
            month: label,
            value: data.data[indx] ?? 0,
          }))}
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
