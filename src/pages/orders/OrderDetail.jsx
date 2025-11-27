import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { SubTitle } from "../../components/SubTitle";
import productPicture from "../../assets/product-template.jpg";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate, useParams } from "react-router";
import { VND } from "../../constants/currency";
export default function OrderDetail() {
  const { orderId } = useParams();

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/admin/orders");
  };
  return (
    <>
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
          title={`Chi tiết đơn hàng ${orderId}`}
          miniTitle="Ngày đặt: 2024-11-23 14:30"
        />
      </div>

      {/* data */}
      <div className="flex-1   min-w-full flex gap-4">
        <div className=" flex-2 flex flex-col gap-4">
          <div className="bg-white shadow rounded-xl flex-3 flex flex-col p-4 gap-6">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Sản phẩm đã đặt</p>
              <div className="bg-gray-200 text-sm px-3 py-1 text-red-600 font-medium rounded-xl">
                Hoàn thành
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <img
                  src={productPicture}
                  alt=""
                  className="w-13 h-13 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between text-md font-medium pt-2">
                  <p>Giò lụa đặc biệt</p>
                  <p>170.000 {VND}</p>
                </div>
                <div className="flex items-center justify-between text-secondary text-sm pb-2">
                  <p>Số lượng: 2</p>
                  <p>85.000 {VND} / sản phẩm</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 border-gray-200 border-b pb-6">
              <div>
                <img
                  src={productPicture}
                  alt=""
                  className="w-13 h-13 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between text-md font-medium pt-2">
                  <p>Giò lụa đặc biệt</p>
                  <p>170.000 {VND}</p>
                </div>
                <div className="flex items-center justify-between text-secondary text-sm pb-2">
                  <p>Số lượng: 2</p>
                  <p>85.000 {VND} / sản phẩm</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 font-medium">
              <div className="flex items-center justify-between text-md text-secondary">
                <p>Tạm tính</p>
                <p>265.000 {VND}</p>
              </div>
              <div className="flex items-center justify-between text-md text-secondary border-gray-200 border-b pb-4">
                <p>Phí vận chuyển</p>
                <p>25.000 {VND}</p>
              </div>
            </div>
            <div className="flex items-center justify-between font-bold text-lg -mt-3">
              <p className="">Tổng cộng</p>
              <p className="text-primary">290.000 {VND}</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl flex-1 flex flex-col gap-2 justify-around p-4">
            <p className="text-lg text-black font-bold">Cập nhật trạng thái</p>
            <div className="flex items-center justify-between gap-3">
              <select
                name=""
                id=""
                className="border border-gray-200 flex-1 px-4 py-2 rounded-xl focus:ring-primary focus:ring focus:outline-none"
              >
                <option value="pending">Chờ xác nhận</option>
                <option value="finished">Hoàn thành</option>
                <option value="cancel">Đã hủy</option>
              </select>
              <div className="bg-primary text-white px-4 py-2 rounded-xl">
                <button className="w-full cursor-pointer active:scale-95">
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-1 flex flex-col gap-4">
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
              <p className="">Nguyễn văn A</p>
            </div>
            <div className="text-md font-medium">
              <p className="text-sm text-secondary">Email</p>
              <p>nguyenvana@giochatruyenthong.com</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="text-green-600 bg-green-100 w-10 h-10 flex justify-center items-center rounded-md">
                <FmdGoodOutlinedIcon />
              </div>
              <p className="text-lg font-bold text-black">Địa chỉ giao hàng</p>
            </div>
            {/* adderss */}
            <p>123 Đường Láng, Đống Đa, Hà Nội</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="text-green-600 bg-green-100 w-10 h-10 flex justify-center items-center rounded-md">
                <LocalAtmOutlinedIcon />
              </div>
              <p className="text-lg font-bold text-black">Thanh toán</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-secondary">Phương thức</p>
              <p className="text-md font-medium">Tiền mặt</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-secondary">Trạng thái</p>
              <div className="bg-green-200 text-green-700 px-3 py-2 text-sm rounded-md">
                Đã thanh toán
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
