import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { SubTitle } from "../../components/SubTitle";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import ordersApi from "../../api/ordersApi";
import PaymentStatus from "./PaymentStatus";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import { OrderItemsDetail } from "./OrderItemsDetail";
export default function OrderDetail() {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("unconfirmed");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/admin/orders");
  };

  useEffect(() => {
    const controller = new AbortController();
    const loadOrder = async () => {
      setLoading(true);
      try {
        const response = await ordersApi.getOrderItems(
          orderId,
          controller.signal
        );
        setOrder(response.data);
        setOrderStatus(response.data.orderStatus);
      } catch (error) {
        //processed
        if (error.name === "CanceledError") return;
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadOrder();
    return () => {
      controller.abort();
    };
  }, [orderId]);

  const handleUpdateOrder = async () => {
    try {
      await ordersApi.updateOrderStatus(orderId, {
        status: orderStatus,
      });
      toast.success(`Cập nhật đơn hàng ${order.orderCode} thành công`);
      navigate("/admin/orders");
    } catch (error) {
      // processed
    }
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : order ? (
        <>
          {" "}
          {/*subTitle */}
          <div className="flex items-center gap-3">
            <div
              className="text-secondary cursor-pointer active:scale-95"
              onClick={handleBack}
            >
              <ArrowBackOutlinedIcon />
            </div>
            <SubTitle
              handle={() => {}}
              title={`Chi tiết đơn hàng #${order.orderCode}`}
              miniTitle={`Ngày đặt: ${order.createdAt}`}
            />
          </div>
          {/* data */}
          <div className="flex-1   min-w-full flex gap-4">
            <div className=" flex-2 flex flex-col gap-4">
              {/* information order */}
              <OrderItemsDetail order={order} />
              {/* Update order status */}
              <div className="bg-white shadow rounded-xl flex-1 flex flex-col gap-2 justify-around p-4">
                <p className="text-lg text-black font-bold">
                  Cập nhật trạng thái
                </p>
                <div className="flex items-center justify-between gap-3">
                  <select
                    value={orderStatus}
                    onChange={(e) => {
                      setOrderStatus(e.target.value);
                      setDisabled(false);
                    }}
                    className="border border-gray-200 flex-1 px-4 py-2 rounded-xl focus:ring-primary focus:ring focus:outline-none"
                  >
                    <option value="delivering">Đang giao</option>
                    <option value="cancelled">Đã hủy</option>
                    <option value="delivered">Đã giao</option>
                    <option value="unconfirmed">Chờ xác nhận</option>
                  </select>
                  <div
                    className={`${
                      disabled
                        ? "bg-gray-400 text-white"
                        : "bg-primary text-white"
                    } px-4 py-2 rounded-xl`}
                  >
                    <button
                      className={
                        disabled
                          ? " cursor-not-allowed"
                          : `w-full active:scale-95 
                              cursor-pointer`
                      }
                      onClick={handleUpdateOrder}
                      disabled={disabled}
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex-1 flex flex-col gap-4">
              {/* infor delivery */}
              <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <div className="text-blue-700 bg-blue-100 w-10 h-10 flex justify-center items-center rounded-md">
                    <AccountCircleOutlinedIcon />
                  </div>
                  <p className="text-lg font-bold text-black">
                    Thông tin khách hàng
                  </p>
                </div>
                <div className="text-md font-medium">
                  <p className="text-sm text-secondary">Họ và tên</p>
                  <p className="">{order.userName}</p>
                </div>
                <div className="text-md font-medium">
                  <p className="text-sm text-secondary">Email</p>
                  <p>{order.email}</p>
                </div>
              </div>
              <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="text-green-600 bg-green-100 w-10 h-10 flex justify-center items-center rounded-md">
                    <FmdGoodOutlinedIcon />
                  </div>
                  <p className="text-lg font-bold text-black">
                    Địa chỉ giao hàng
                  </p>
                </div>
                {/* adderss */}
                <p>{order.address || "123 Đường Láng, Đống Đa, Hà Nội"}</p>
              </div>
              {/* payment */}
              <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="text-green-600 bg-green-100 w-10 h-10 flex justify-center items-center rounded-md">
                    <LocalAtmOutlinedIcon />
                  </div>
                  <p className="text-lg font-bold text-black">Thanh toán</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-normal text-secondary">
                    Phương thức
                  </p>
                  <p className="text-md font-medium">
                    {order.paymentType === "COD" ? "Tiền mặt" : "Chuyển khoản"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-normal text-secondary">
                    Trạng thái
                  </p>
                  <PaymentStatus status={order.paymentStatus} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No order found</div>
      )}
    </>
  );
}
