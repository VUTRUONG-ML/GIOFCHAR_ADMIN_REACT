import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatMoney } from "../../../utils/formatMoney.js";
import { data } from "react-router";

const margin = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 5,
};

// Hàm vẽ bo góc
const getPath = (x, y, width, height, r = 8) => {
  const radius = Math.min(r, width / 2, height);

  return `
    M ${x},${y + height}
    L ${x},${y + radius}
    A ${radius}, ${radius} 0 0 1 ${x + radius}, ${y}
    L ${x + width - radius}, ${y}
    A ${radius}, ${radius} 0 0 1 ${x + width}, ${y + radius}
    L ${x + width},${y + height}
    Z
  `;
};

// Sample data
const data7Days = [
  { name: "T4", uv: 4000000 },
  { name: "T5", uv: 3000000 },
  { name: "T6", uv: 3000000 },
  { name: "T7", uv: 2000000 },
  { name: "CN", uv: 2780000 },
  { name: "T2", uv: 1890000 },
  { name: "T3", uv: 1890000 },
];
const data30Days = [
  { name: "week1", uv: 40000000 },
  { name: "week2", uv: 30000000 },
  { name: "week3", uv: 30000000 },
  { name: "week4", uv: 20000000 },
];
const data90Days = [
  { name: "month1", uv: 100000000 },
  { name: "month2", uv: 90000000 },
  { name: "month3", uv: 90000000 },
];
function getTooltipIntro(name, range) {
  if (range === 7) {
    const map = {
      T2: "30/11/2025",
      T3: "01/12/2025",
      T4: "25/11/2025",
      T5: "26/11/2025",
      T6: "27/11/2025",
      T7: "28/11/2025",
      CN: "29/11/2025",
    };
    return map[name] || "";
  } else if (range === 30) {
    const map = {
      week1: "03/11 - 09/11",
      week2: "10/11 - 16/11",
      week3: "17/11 - 23/11",
      week4: "24/11 - 30/11",
    };
    return map[name] || "";
  } else if (range === 90) {
    const map = {
      month1: "09/2025",
      month2: "10/2025",
      month3: "11/2025",
    };
    return map[name] || "";
  }
  return "";
}
function getLabel(name, range) {
  if (range === 7) {
    const map = {
      T2: "Thứ 2",
      T3: "Thứ 3",
      T4: "Thứ 4",
      T5: "Thứ 5",
      T6: "Thứ 6",
      T7: "Thứ 7",
      CN: "Chủ nhật",
    };
    return map[name] || name;
  } else if (range === 30) {
    const map = {
      week1: "Tuần 1",
      week2: "Tuần 2",
      week3: "Tuần 3",
      week4: "Tuần 4",
    };
    return map[name] || name;
  } else if (range === 90) {
    const map = { month1: "Tháng 1", month2: "Tháng 2", month3: "Tháng 3" };
    return map[name] || name;
  }
  return name;
}

// Custom Bar (JS version)
function RoundedBar(props) {
  const { fill, x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return <></>;
  }

  return <path d={getPath(x, y, width, height)} fill={fill} stroke="none" />;
}

function CustomTooltip(props) {
  console.log("check payload", props);
  const active = props.active;
  const payload = props.payload;

  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          border: "1px solid #d88488",
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "1px 1px 2px #d88488",
        }}
      >
        <p className="label" style={{ margin: "0", fontWeight: "700" }}>
          {payload[0].payload.name}
        </p>
        <p className="intro" style={{ margin: "0" }}>
          {getLabel(payload[0].payload.name, 7)}
        </p>
        <p
          className="desc"
          style={{
            margin: "0",
            borderTop: "1px dashed #f5f5f5",
            textAlign: "center",
          }}
        >
          {`${formatMoney(payload[0].value)}`}
        </p>
      </div>
    );
  }

  return null;
}

export default function RevenueChart({ range }) {
  return (
    <div
      className="flex-1 w-full h-full font-bold text-md text-secondary"
      key={range}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={
            range === 7 ? data7Days : range === 30 ? data30Days : data90Days
          }
          margin={margin}
        >
          <XAxis
            dataKey="name"
            tickFormatter={(name) => getLabel(name, range)}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={(props) => (
              <CustomTooltip {...props} range={range} active />
            )}
          />
          <Bar dataKey="uv" fill="#4caf50" shape={<RoundedBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
