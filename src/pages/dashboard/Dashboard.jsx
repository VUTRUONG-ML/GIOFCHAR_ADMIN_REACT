import { StatusOverview } from "./StatusOverview";
import { CartIcon, MoneyIcon, PeopleIcon, TrendingUpIcon } from "./IconStatus";
import { VND } from "../../constants/currency";
import RevenueChart from "./charts/RevenueChart";
import { useEffect, useState } from "react";
import BestSellingChart from "./charts/BestSellingChart";
import { formatMoney, formatVNDShort } from "../../utils/formatMoney";
import ordersApi from "../../api/ordersApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
import usersApi from "../../api/usersApi";
import foodsApi from "../../api/foodsApi";
import statistic from "../../api/statisticApi";
import { RecentOrders } from "./RecentOrders";
import { WarningStock } from "./WarningStock";

export default function DashBoard() {
  const [range, setRange] = useState(7);

  const [loadingPage, setLoadingPage] = useState(true);

  const [countOrder, setCountOrder] = useState({
    countTodayOrders: 0,
    status: "no_change",
    percent: 0,
  });

  const [revenue, setRevenue] = useState({
    revenueToday: 0,
    status: "no_change",
    percent: 0,
  });

  const [countUser, setCountUser] = useState({
    countUser: 0,
    status: "no_change",
    percent: 0,
  });

  const [bestSell, setBestSell] = useState("Giò lụa");

  const [dataChart, setDataChart] = useState({
    revenue7days: [],
    revenue30days: [],
    revenue90days: [],
  });

  const [recentOrders, setRecentOrders] = useState([
    {
      orderId: "start",
      orderCode: "DH2025-000004",
      status: "unconfirmed",
      customerName: "Nguyễn Văn a",
      amount: 0,
    },
  ]);

  const [warningStock, setWarningStock] = useState([
    {
      foodId: "start",
      foodName: "Món",
      stock: 0,
      status: "low",
    },
  ]);

  useEffect(() => {
    const controller = new AbortController();
    const loadData = async () => {
      setLoadingPage(true);
      try {
        const [
          countRes,
          revenueRes,
          userRes,
          foodRes,
          recentOrderRes,
          warningStockRes,
        ] = await Promise.all([
          ordersApi.getOverviewCount(controller.signal),
          ordersApi.getOverviewRevenue(controller.signal),
          usersApi.getOverView(controller.signal),
          foodsApi.getBestSelling(controller.signal),
          statistic.getRecentOrders(controller.signal),
          statistic.getLowStockProduct(controller.signal),
        ]);
        setCountOrder({
          countTodayOrders: countRes.data?.countTodayOrders ?? 0,
          status: countRes.data?.status ?? "no_change",
          percent: countRes.data?.percent ?? 0,
        });
        setRevenue({
          revenueToday: revenueRes.data?.revenueToday ?? 0,
          status: revenueRes.data?.status ?? "no_change",
          percent: revenueRes.data?.percent ?? 0,
        });
        setCountUser({
          countUser: userRes.data?.countUser ?? 0,
          status: userRes.data?.status ?? "no_change",
          percent: userRes.data?.percent ?? 0,
        });
        setBestSell(foodRes.data?.foods[0]?.foodName ?? "Giò");
        setRecentOrders(recentOrderRes.data?.orders ?? []);
        setWarningStock(warningStockRes.data?.products ?? []);
      } catch (error) {
        if (error.name === "CanceledError") return;
        toast.warn("Đã có lỗi xảy ra");
      } finally {
        setLoadingPage(false);
      }
    };
    loadData();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const loadRevenueChart = async () => {
      try {
        const res = await statistic.getRevenue(
          Number(range),
          controller.signal
        );
        const revenueRes = res.data?.revenue;
        setDataChart((data) => {
          return range === 7
            ? { ...data, revenue7days: revenueRes }
            : range === 30
            ? { ...data, revenue30days: revenueRes }
            : { ...data, revenue90days: revenueRes };
        });
      } catch (error) {
        if (error.name === "CanceledError") return;
        toast.warn("Không thể tải dữ liệu biểu đồ");
      }
    };

    loadRevenueChart();
    return () => controller.abort();
  }, [range]);

  if (loadingPage) return <LoadingSpinner />;
  return (
    <div className="flex flex-col gap-6 pb-6 w-full">
      {/* --- PHẦN 1: STATUS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        <StatusOverview
          icon={<CartIcon />}
          title={"Đơn hàng hôm nay"}
          content={countOrder.countTodayOrders}
          trend={countOrder.status}
          contentStatus={`${countOrder.percent}% so với hôm qua`}
        />
        <StatusOverview
          icon={<MoneyIcon />}
          title={"Doanh thu hôm nay"}
          content={formatVNDShort(revenue.revenueToday)}
          trend={revenue.status}
          contentStatus={`${revenue.percent}% so với hôm qua`}
        />
        <StatusOverview
          icon={<PeopleIcon />}
          title={"Khách hàng mới"}
          content={countUser.countUser}
          trend={countUser.status}
          contentStatus={`${countUser.percent}% so với hôm qua`}
        />
        <StatusOverview
          icon={<TrendingUpIcon />}
          title={"Sản phẩm bán chạy"}
          content={bestSell}
        />
      </div>

      {/* --- PHẦN 2: CHARTS (SỬA LỖI TRÀN HEADER) --- */}
      {/* Sử dụng Grid thay vì Flex để chia layout chuẩn hơn */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[450px]">
        {/* Revenue Chart: Chiếm 2 phần */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-[450px] lg:h-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Doanh thu</h3>
              <p className="text-sm text-gray-500">Tổng quan theo thời gian</p>
            </div>
            <select
              className="border border-gray-200 rounded-lg text-sm px-3 py-1 bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all cursor-pointer"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
            >
              <option value="7">7 ngày qua</option>
              <option value="30">30 ngày qua</option>
              <option value="90">90 ngày qua</option>
            </select>
          </div>

          {/* QUAN TRỌNG: Wrapper này khóa chiều cao lại, ép chart phải nằm gọn bên trong */}
          <div className="flex-1 w-full min-h-0 relative overflow-hidden">
            {/* Nếu biểu đồ vẫn tràn, có thể thêm style={{ height: '100%', width: '100%' }} vào đây */}
            <RevenueChart
              range={range}
              data={dataChart[`revenue${range}days`]}
            />
          </div>
        </div>

        {/* BestSelling Chart: Chiếm 1 phần */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-[450px] lg:h-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Top sản phẩm</h3>

          {/* Wrapper khóa chiều cao cho biểu đồ tròn */}
          <div className="flex-1 w-full min-h-0 relative flex items-center justify-center overflow-hidden">
            <BestSellingChart />
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600 font-medium">Giò lụa</span>
              </div>
              <span className="font-bold text-gray-800">35%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-600 font-medium">Chả quế</span>
              </div>
              <span className="font-bold text-gray-800">25%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-600 font-medium">Nem chua</span>
              </div>
              <span className="font-bold text-gray-800">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- PHẦN 3: ĐƠN HÀNG & TỒN KHO --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Đơn hàng gần đây */}
        <RecentOrders recentOrders={recentOrders} />

        {/* Tồn kho cảnh báo */}
        <WarningStock warningStock={warningStock} />
      </div>
    </div>
  );
}
