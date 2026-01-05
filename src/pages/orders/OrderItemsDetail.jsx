import { formatMoney } from "../../utils/formatMoney";
import { OrderStatus } from "./OrderStatus";

export function OrderItemsDetail({ order }) {
  return (
    <div className="bg-white shadow rounded-xl flex-3 flex flex-col p-4 gap-6">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Sản phẩm đã đặt</p>
        <OrderStatus status={order.orderStatus} />
      </div>
      {order?.items?.map((orderItem) => {
        return (
          <div className="flex items-center gap-3" key={orderItem.orderItemId}>
            <div>
              <img
                src={orderItem.image}
                alt=""
                className="w-13 h-13 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between text-md font-medium pt-2">
                <p>{orderItem.foodName}</p>
                <p>{formatMoney(orderItem.totalPriceOnOneItem)}</p>
              </div>
              <div className="flex items-center justify-between text-secondary text-sm pb-2">
                <p>Số lượng: {orderItem.quantity}</p>
                <p>{formatMoney(orderItem.price)} / sản phẩm</p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex flex-col gap-2 font-medium">
        <div className="flex items-center justify-between text-md text-secondary">
          <p>Tạm tính</p>
          <p>{formatMoney(order.amountOrder)}</p>
        </div>
        <div className="flex items-center justify-between text-md text-secondary border-gray-200 border-b pb-4">
          <p>Phí vận chuyển</p>
          <p>{formatMoney(25000)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between font-bold text-lg -mt-3">
        <p className="">Tổng cộng</p>
        <p className="text-primary">{formatMoney(order.amountOrder + 25000)}</p>
      </div>
    </div>
  );
}
