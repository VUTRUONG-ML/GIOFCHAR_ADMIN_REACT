import React, { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import statisticApi from "../../../api/statisticApi";

const COLORS = ["#10B981", "#F59E0B", "#3B82F6", "#EC4899", "#8B5CF6"];

// Hàm cắt ngắn tên
const truncateText = (text, maxLength = 20) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// Tooltip hiển thị khi di chuột vào biểu đồ
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-100 rounded-xl shadow-2xl text-sm z-50">
        <p className="font-bold text-gray-800 mb-1">{data.fullName}</p>
        <div className="flex items-center gap-2 text-gray-600">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: payload[0].fill }}
          ></span>
          <span>
            Đã bán: <b className="text-gray-900">{data.value}</b>
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function BestSellingChart({ isAnimationActive = true }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await statisticApi.getTopProduct();
        if (res?.data?.topProducts) {
          const formattedData = res.data.topProducts.map((item) => ({
            name: item.foodName === "remaining" ? "Khác" : item.foodName,
            fullName: item.foodName === "remaining" ? "Sản phẩm khác" : item.foodName,
            value: Number(item.countSold),
          }));
          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Lỗi lấy Top sản phẩm:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  const totalSold = chartData.reduce((acc, cur) => acc + cur.value, 0);

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="h-[420px] w-full flex items-center justify-center text-gray-400 bg-white rounded-xl border border-gray-100">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  // Empty State
  if (chartData.length === 0) {
    return (
      <div className="h-[420px] w-full flex items-center justify-center text-gray-400 bg-white rounded-xl border border-gray-100">
        Chưa có dữ liệu
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
      <h3 className="text-gray-800 font-bold text-lg mb-2 shrink-0">
        Top Bán Chạy
      </h3>

      <div className="flex-1 w-full relative min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              cornerRadius={5}
              dataKey="value"
              isAnimationActive={isAnimationActive}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />} 
              wrapperStyle={{ zIndex: 1000 }} 
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Icon & Text ở giữa (Overlay) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-green-50 p-1.5 rounded-full mb-0.5">
            <Inventory2OutlinedIcon
              sx={{ fontSize: 22 }}
              className="text-green-600"
            />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
            TOTAL
          </p>
          <p className="text-xl font-extrabold text-gray-800">{totalSold}</p>
        </div>
      </div>

      {/* PHẦN 2: DANH SÁCH SẢN PHẨM (Nằm dưới) */}
      {/* Sử dụng Grid 2 cột nếu màn hình rộng, 1 cột nếu hẹp */}
      <div className="mt-2 pt-3 border-t border-gray-50 max-h-[140px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 gap-y-2 gap-x-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              {/* Tên và Màu */}
              <div className="flex items-center gap-2 overflow-hidden">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span 
                    className="text-gray-600 font-medium truncate" 
                    title={item.fullName}
                >
                    {truncateText(item.name, 20)}
                </span>
              </div>
              
              {/* Số lượng (Thay vì %) */}
              <span className="font-bold text-gray-800 shrink-0 pl-2">
                {item.value} <span className="text-[10px] font-normal text-gray-400">cái</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}