import { StatusOverview } from "./StatusOverview";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { CartIcon, MoneyIcon, PeopleIcon, TrendingUpIcon } from "./IconStatus";
import { VND } from "../../constants/currency";
import RevenueChart from "./charts/RevenueChart";
import { useState } from "react";
import BestSellingChart from "./charts/BestSellingChart";
export default function DashBoard() {
  const [range, setRange] = useState(7);
  return (
    <>
      <div className="flex flex-col h-full gap-4">
        {/* status overview */}
        <div className="flex-1 flex gap-4 mt-2">
          <StatusOverview
            icon={<CartIcon />}
            title={"Đơn hàng hôm nay"}
            content={"127"}
            statusIncrease={true}
            contentStatus={"12% so với hôm qua"}
          />
          <StatusOverview
            icon={<MoneyIcon />}
            title={"Doanh thu hôm nay"}
            content={`8.8M ${VND}`}
            statusIncrease={true}
            contentStatus={"8% so với hôm qua"}
          />
          <StatusOverview
            icon={<PeopleIcon />}
            title={"Khách hàng mới"}
            content={"23"}
            statusIncrease={false}
            contentStatus={"5% so với hôm qua"}
          />
          <StatusOverview
            icon={<TrendingUpIcon />}
            title={"Sản phẩm bán chạy"}
            content={"Giò lụa"}
          />
        </div>
        <div className="flex-2 flex gap-4">
          {/* revenue with week */}
          <div className="flex-2 flex flex-col bg-white rounded-xl shadow p-4 gap-2 min-h-80 min-w-120">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">Doanh thu</p>
              <select
                name=""
                id=""
                className="border px-2 py-1 rounded-lg text-sm border-secondary"
                value={range}
                onChange={(e) => setRange(e.target.value)}
              >
                <option value="7">7 ngày qua</option>
                <option value="30">30 ngày qua</option>
                <option value="90">90 ngày qua</option>
              </select>
            </div>
            {/* chart */}
            {/* ngày code ui 2/12/2025 */}
            <div className="flex-1 w-full h-full font-bold text-md text-secondary">
              <RevenueChart range={range} />
            </div>
          </div>
          {/* BestSelling */}
          <div className="flex-1 bg-white rounded-xl shadow p-4 flex flex-col">
            <p className="text-2xl font-extrabold">Sản phẩm bán chạy</p>
            {/* Chart */}
            <div className="flex-1 min-h-20 min-w-20 flex justify-center items-center relative">
              <BestSellingChart />
            </div>
            {/* List best sell */}
            <div className="flex flex-col ">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>{" "}
                  <p>Giò lụa</p>
                </div>
                <p className="text-md font-bold ">35%</p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary-orange"></div>{" "}
                  <p>Chả quế</p>
                </div>
                <p className="text-md font-bold ">25%</p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary-yellow"></div>{" "}
                  <p>Nem chua</p>
                </div>
                <p className="text-md font-bold ">20%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
