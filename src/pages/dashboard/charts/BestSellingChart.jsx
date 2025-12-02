import React from "react";
import { Cell, Pie, PieChart } from "recharts";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
// data trả về value giảm dần
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#4caf50", "#ffb74d", "#fdd835", "#4a5565"];

// Custom label function
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function BestSellingChart({ isAnimationActive = true }) {
  return (
    <div className="flex-1 min-h-20 min-w-20 flex justify-center items-center relative">
      <PieChart
        style={{
          aspectRatio: 1,
        }}
        width={240}
        height={240}
        responsive
      >
        <Pie
          data={data}
          labelLine={false}
          innerRadius={52}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={isAnimationActive}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute left-[50%] right-[50%] flex flex-col justify-center items-center font-bold">
        <Inventory2OutlinedIcon
          sx={{ fontSize: 35 }}
          className="text-primary"
        />
        <p className="text-2xl ">100%</p>
      </div>
    </div>
  );
}
