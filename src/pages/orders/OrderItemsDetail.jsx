import { formatMoney } from "../../utils/formatMoney";
import { OrderStatus } from "./OrderStatus";
import { getLabelDiscount } from "../../utils/promotionService";
export function OrderItemsDetail({ order }) {
  return (
    <div className="bg-white shadow rounded-xl flex-3 flex flex-col p-4 gap-6">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">Sản phẩm đã đặt</p>
        <OrderStatus status={order.orderStatus} />
      </div>

      {order?.items?.map((orderItem) => {
        const {
          orderItemId,
          foodName,
          image,
          quantity,
          unitPrice,
          totalPriceOnOneItem,
          discount_type,
          discount_value,
          discount_amount,
          weight_gram,
        } = orderItem;

        const hasDiscount = discount_amount > 0;
        const originalPrice = unitPrice + discount_amount;

        return (
          <div
            className="flex items-start gap-4 border-b border-gray-100 pb-4"
            key={orderItemId}
          >
            <img
              src={image}
              alt={foodName}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1 flex flex-col gap-1">
              {/* Tên + Tổng tiền */}
              <div className="flex justify-between font-semibold text-md">
                <div>
                  <p>{foodName}</p>
                  {weight_gram && (
                    <p className="text-xs text-gray-500">{weight_gram}g</p>
                  )}
                </div>
                <p className="text-primary">
                  {formatMoney(totalPriceOnOneItem)}
                </p>
              </div>

              {/* Giá đơn vị */}
              <div className="text-sm text-gray-600 flex flex-col">
                {hasDiscount && (
                  <div className="flex items-center gap-2">
                    <p className="line-through text-gray-400">
                      {formatMoney(originalPrice)}
                    </p>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                      {getLabelDiscount(discount_type, discount_value)}
                    </span>
                  </div>
                )}

                <p>{formatMoney(unitPrice)} / sản phẩm</p>
              </div>

              {/* Quantity */}
              <div className="text-sm text-gray-500">Số lượng: {quantity}</div>
            </div>
          </div>
        );
      })}

      {/* Summary */}
      <div className="flex flex-col gap-2 font-medium pt-2">
        <div className="flex justify-between text-md text-secondary">
          <p>Tạm tính</p>
          <p>{formatMoney(order.amountOrder)}</p>
        </div>

        <div className="flex justify-between text-md text-secondary border-b border-gray-200 pb-4">
          <p>Phí vận chuyển</p>
          <p>{formatMoney(25000)}</p>
        </div>
      </div>

      <div className="flex justify-between font-bold text-lg">
        <p>Tổng cộng</p>
        <p className="text-primary">{formatMoney(order.amountOrder + 25000)}</p>
      </div>
    </div>
  );
}
