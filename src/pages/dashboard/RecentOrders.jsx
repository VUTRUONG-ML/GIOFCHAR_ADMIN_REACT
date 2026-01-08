import { formatMoney } from "../../utils/formatMoney";

export function RecentOrders({ recentOrders }) {
  const mapStatus = {
    delivered: {
      title: "Đã giao",
      style: "status-delivered",
    },
    delivering: {
      style: "status-delivering",
      title: "Đang giao",
    },
    unconfirmed: {
      style: "status-unconfirmed",
      title: "Chưa xác nhận",
    },
    cancelled: {
      style: "status-cancelled",
      title: "Đã hủy",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Đơn hàng gần đây</h3>
      </div>
      <div className="space-y-4">
        {recentOrders.slice(0, 4).map((order) => (
          <div
            key={order.orderId}
            className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <div>
              <p className="font-bold text-gray-800">{order.orderCode}</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {order.customerName}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">
                {formatMoney(order.amount)}
              </p>
              <span
                className={`inline-block mt-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  mapStatus[order.status].style
                }`}
              >
                {mapStatus[order.status].title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
