import React from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
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

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle || 1));
  const cos = Math.cos(-RADIAN * (midAngle || 1));
  const sx = (cx || 0) + ((outerRadius || 0) + 10) * cos;
  const sy = (cy || 0) + ((outerRadius || 0) + 10) * sin;
  const mx = (cx || 0) + ((outerRadius || 0) + 30) * cos;
  const my = (cy || 0) + ((outerRadius || 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload?.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius || 0) + 6}
        outerRadius={(outerRadius || 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`PV ${value}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${((percent || 1) * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function BestSellingChart({ isAnimationActive = true }) {
  return (
    <>
      <PieChart
        style={{
          aspectRatio: 1,
        }}
        width={230}
        height={230}
        responsive
      >
        <Pie
          data={data}
          activeShape={renderActiveShape}
          labelLine={true}
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
    </>
  );
}
