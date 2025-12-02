import { StatusOverview } from "./StatusOverview";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { CartIcon, MoneyIcon, PeopleIcon, TrendingUpIcon } from "./IconStatus";
import { VND } from "../../constants/currency";
import RevenueChart from "./charts/RevenueChart";
import { useState } from "react";
export default function DashBoard() {
  const [range, setRange] = useState(7);
  return (
    <>
      <div className="flex flex-col h-full gap-4">
        {/* status overview */}
        <div className="flex-1 flex gap-4">
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
            <RevenueChart range={range} />
          </div>
          {/* BestSelling */}
          <div className="flex-1 bg-white rounded-xl shadow p-4 flex flex-col">
            <p className="text-2xl font-extrabold">Sản phẩm bán chạy</p>
            {/* Chart */}
            <div className="flex-1 min-40">chart</div>
            {/* List best sell */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="flex">
                  <div>color</div> <p>Giò lụa</p>
                </div>
                <p>35%</p>
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <div>color</div> <p>Chả quế</p>
                </div>
                <p>25%</p>
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <div>color</div> <p>Nem chua</p>
                </div>
                <p>20%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
