import { StatusOverview } from "./StatusOverview";
import { CartIcon, MoneyIcon, PeopleIcon, TrendingUpIcon } from "./IconStatus";
import { VND } from "../../constants/currency";
import RevenueChart from "./charts/RevenueChart";
import { useState } from "react";
import BestSellingChart from "./charts/BestSellingChart";

export default function DashBoard() {
  const [range, setRange] = useState(7);

  const recentOrders = [
    { id: '#DH2024-0891', customer: 'Nguyễn Văn A', total: '285,000 ₫', status: 'Hoàn thành' },
    { id: '#DH2024-0890', customer: 'Trần Thị B', total: '420,000 ₫', status: 'Đang xử lý' },
    { id: '#DH2024-0889', customer: 'Lê Văn C', total: '150,000 ₫', status: 'Chờ xác nhận' },
    { id: '#DH2024-0888', customer: 'Phạm Thị D', total: '680,000 ₫', status: 'Hoàn thành' },
  ];

  const warningStock = [
    { name: 'Giò lụa đặc biệt', stock: 12, unit: 'kg', alert: 'low' },
    { name: 'Chả quế Hà Nội', stock: 8, unit: 'kg', alert: 'critical' },
    { name: 'Nem chua Thanh Hóa', stock: 15, unit: 'kg', alert: 'low' },
    { name: 'Giò thủ truyền thống', stock: 5, unit: 'kg', alert: 'critical' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-6 w-full"> 
      
      {/* --- PHẦN 1: STATUS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
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
              onChange={(e) => setRange(e.target.value)}
            >
              <option value="7">7 ngày qua</option>
              <option value="30">30 ngày qua</option>
              <option value="90">90 ngày qua</option>
            </select>
          </div>
          
          {/* QUAN TRỌNG: Wrapper này khóa chiều cao lại, ép chart phải nằm gọn bên trong */}
          <div className="flex-1 w-full min-h-0 relative overflow-hidden">
            {/* Nếu biểu đồ vẫn tràn, có thể thêm style={{ height: '100%', width: '100%' }} vào đây */}
            <RevenueChart range={range} />
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Đơn hàng gần đây</h3>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-gray-800">{order.id}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{order.total}</p>
                  <span className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                    order.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tồn kho cảnh báo */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-xl font-bold text-gray-800">Tồn kho cảnh báo</h3>
          </div>
          <div className="space-y-4">
            {warningStock.map((item, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Còn lại: {item.stock} {item.unit}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.alert === 'critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {item.alert === 'critical' ? 'Rất thấp' : 'Thấp'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
      </div>

    </div>
  );
}