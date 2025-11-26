import { SubTitle } from "../components/SubTitle";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import profilePicture from "../assets/profile.jpg";
export default function MyAccount() {
  return (
    <>
      {/*subTitle */}
      <SubTitle handle={() => {}} title="Thông tin tài khoản" />
      {/* data */}
      <div className="flex-1 flex  py-1 gap-4.5 h-full">
        {/* col1 */}
        <div className="flex-1 bg-white shadow rounded-xl flex flex-col items-center py-4 gap-3">
          <div>
            <img
              src={profilePicture}
              alt="profile"
              className="w-50 h-50 object-cover rounded-full"
            />
          </div>
          <p className="font-bold text-2xl">Quảng trị viên</p>
          <p className="font-normal text-md">admin@giochatruyenthong.com</p>
          <div className="bg-gray-200 py-2 px-22 rounded-md text-md font-medium cursor-pointer active:scale-95 ">
            <button className="w-full">Đổi ảnh đại diện</button>
          </div>
        </div>
        {/* col2 */}
        <div className="flex-2  flex flex-col gap-4.5">
          <div className="bg-white shadow rounded-xl  flex flex-col gap-3 px-4.5 py-4  justify-around text-secondary font-medium text-sm">
            <div className="flex gap-2 items-center">
              <div className="text-blue-700 bg-blue-100 w-10 h-10 flex justify-center items-center rounded-md">
                <AccountCircleOutlinedIcon />
              </div>
              <p className="text-lg font-bold text-black">Thông tin cá nhân</p>
            </div>
            <div className="flex flex-col gap-1.5 justify-start">
              <label htmlFor="">Họ và tên</label>
              <input
                type="text"
                className="h-10 w-full border border-gray-300 rounded-md shadow text-black text-[16px] font-medium px-3 py-3"
                value="Quản trị viên"
              />
            </div>
            <div className="flex flex-col gap-1.5 justify-start">
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="h-10 w-full border border-gray-300 rounded-md shadow text-black text-[16px] font-medium px-3 py-3"
                value="admin@giochatruyenthong.com"
              />
            </div>
            <div className="flex flex-col gap-1.5 justify-start">
              <label htmlFor="">Số điện thoại</label>
              <input
                type="text"
                className="h-10 w-full border border-gray-300 rounded-md shadow text-black text-[16px] font-medium px-3 py-3"
                value=""
                placeholder="Chưa cập nhật"
              />
            </div>
            <button className="w-50 h-10 bg-primary text-white rounded-lg active:scale-95 cursor-pointer">
              Cập nhật thông tin
            </button>
          </div>
          <div className="bg-white shadow rounded-xl  flex flex-col gap-3 px-4.5 py-4  justify-around text-secondary font-medium text-sm">
            <div className="flex gap-2 items-center">
              <div className="text-primary bg-green-100 w-10 h-10 flex justify-center items-center rounded-md">
                <KeyOutlinedIcon />
              </div>
              <p className="text-lg font-bold text-black">Đổi mật khẩu</p>
            </div>
            <div className="flex flex-col gap-1.5 justify-start">
              <label htmlFor="">Mật khẩu hiện tại</label>
              <input
                type="password"
                className="h-10 w-full border border-gray-300 rounded-md shadow text-black text-[16px] font-medium px-3 py-3"
                value="Quản trị viên"
              />
            </div>
            <div className="flex flex-col gap-1.5 justify-start">
              <label htmlFor="">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                className="h-10 w-full border border-gray-300 rounded-md shadow text-black text-[16px] font-medium px-3 py-3"
                value="Quản trị viên"
              />
            </div>

            <button className="w-50 h-10 bg-primary text-white rounded-lg active:scale-95 cursor-pointer">
              Đổi mật khẩu
            </button>
          </div>
          <div className="bg-white shadow rounded-xl  flex flex-col gap-3 px-4.5 py-4  justify-around text-secondary font-medium text-sm">
            <div className="flex gap-2 items-center">
              <div className="text-primary bg-green-100 w-10 h-10 flex justify-center items-center rounded-md">
                <ShieldOutlinedIcon />
              </div>
              <p className="text-lg font-bold text-black">Bảo mật</p>
            </div>
            <div className="flex justify-between bg-blue-50 px-3 py-3 rounded-md">
              <div className="flex items-center">
                <div className="w-10 h-10 flex justify-center items-center">
                  <EmailOutlinedIcon />
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-bold text-md">Xác thực mật khẩu</p>
                  <p className="font-normal text-[13px]">Đã xác thực</p>
                </div>
              </div>
              <button className="bg-green-200 text-primary py-2 px-3 rounded-md">
                Đã kích hoạt
              </button>
            </div>
            <div className="flex justify-between bg-blue-50 px-3 py-3 rounded-md">
              <div className="flex items-center">
                <div className="w-10 h-10 flex justify-center items-center">
                  <KeyOutlinedIcon />
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-bold text-md">Xác thực 2 bước</p>
                  <p className="font-normal text-[13px]">Chưa kích hoạt</p>
                </div>
              </div>
              <button className="bg-gray-300 text-black py-2 px-3 rounded-md cursor-pointer active:scale-95">
                Kích hoạt
              </button>
            </div>
          </div>
          <div className="bg-white shadow rounded-xl  flex flex-col gap-3 px-4.5 py-4  justify-around text-secondary font-medium text-sm">
            <div className="flex gap-2 items-center">
              <p className="text-lg font-bold text-red-600">Vùng nguy hiểm</p>
            </div>

            <div className="text-[18px]">
              <p>Đăng xuất khỏi tất cả thiết bị và phiên làm việc hiện tại</p>
            </div>

            <button className="w-30 h-10 bg-red-600 text-white rounded-lg active:scale-95 cursor-pointer">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
