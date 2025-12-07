import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { SubTitle } from "../../components/SubTitle";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ordersApi from "../../api/ordersApi";
import { OrderStatus } from "./OrderStatus";

import { formatMoney } from "../../utils/formatMoney";
import LoadingSpinner from "../../components/LoadingSpinner";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const moveDetail = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };
  useEffect(() => {
    const controller = new AbortController();
    const loadOrders = async () => {
      setLoading(true);
      try {
        const response = await ordersApi.getOrders(controller.signal);
        setOrders(response.data?.orders);
        setQuantity(response.data?.total);
      } catch (error) {
        // processed
        if (error.name === "CanceledError") return;
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadOrders();
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/*subTitle */}
          <SubTitle
            handle={() => {}}
            title="Quản lý đơn hàng"
            miniTitle={`Tổng: ${quantity} đơn hàng`}
          />
          {/* data */}
          <div className="flex-1 bg-white shadow rounded-xl py-1 px-4">
            {/* categy */}
            <div className="flex text-secondary gap-5 h-15 items-center font-bold">
              <div className=" py-1 px-3 rounded-md bg-primary text-white ">
                Tất cả
              </div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">
                Chờ xác nhận
              </div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Đang xử lý</div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Hoàn thành</div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Đã hủy</div>
            </div>
            {/* table */}
            {!quantity ? (
              <div>Danh sách rỗng </div>
            ) : (
              <div className="pt-3 mt-2 font-medium overflow-y-auto max-h-[calc(98vh-260px)]">
                <table className="w-full table-fixed">
                  <thead className="text-left">
                    <tr className="border-b border-gray-200">
                      <th className="w-[20%] py-2">Mã đơn hàng</th>
                      <th className="w-[20%]">Khách hàng</th>
                      <th className="w-[10%]">Sản phẩm</th>
                      <th className="w-[15%]">Tổng tiền</th>
                      <th className="w-[20%]">Thời gian</th>
                      <th className="w-[15%]">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      return (
                        <tr
                          key={order.orderId}
                          className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear cursor-pointer"
                          onClick={() => {
                            moveDetail(order.orderId);
                          }}
                        >
                          <td className="py-2">
                            #{order.orderCode ?? order.orderId}
                          </td>
                          <td>
                            <div className="flex flex-col justify-center py-3">
                              <p className="text-black">{order.userName}</p>
                              <p className="text-[12px] text-secondary">
                                {order.email}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div className="flex bg-amber-100 text-[16px] justify-center py-2 rounded-2xl items-center w-[50%] gap-2">
                              <Inventory2OutlinedIcon />
                              <p>{order.totalQuantity}</p>
                            </div>
                          </td>
                          <td>{formatMoney(order.amount)}</td>
                          <td className="text-secondary text-[14px]">
                            {order.time}
                          </td>
                          <td>
                            <OrderStatus status={order.status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
