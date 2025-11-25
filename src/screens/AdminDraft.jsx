import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import profile from "../assets/profile.jpg";
import { Menu } from "./Menu";
export default function AdminDraft() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className="
       w-64 bg-pink-100 shadow-lg p-4 fixed top-0 bottom-0 left-0
       flex flex-col
       rounded-xl
      "
      >
        <div className=" h-16 flex">
          <div className="h-[50px] w-[50px] bg-primary flex items-center justify-center mr-1.5 rounded-xl">
            <Inventory2Icon sx={{ color: "white" }} />
          </div>
          <div className=" flex-1 flex flex-col justify-center h-[50px]">
            <p className=" text-lg font-bold text-black">Giò Chả</p>
            <p className=" text-[12px] text-gray-500 font-normal">
              Admin Dashboard
            </p>
          </div>
        </div>
        <div className=" flex-1 flex flex-col gap-2 border-t border-gray-300 pt-3 mt-4">
          <Menu title="Tổng quan" icon={DashboardOutlinedIcon} />
          <Menu title="Sản phẩm" icon={FoodBankOutlinedIcon} />
          <Menu title="Đơn hàng" icon={ShoppingCartOutlinedIcon} />
          <Menu title="Khách hàng" icon={GroupOutlinedIcon} />
          <Menu title="Danh mục" icon={CategoryOutlinedIcon} />
          <Menu title="Tài khoản" icon={AccountCircleOutlinedIcon} />
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-18 bg-white shadow p-4 flex items-center justify-between fixed top-4 right-3 left-70 rounded-xl">
          {/* left-section */}
          <div className="flex flex-col flex-1">
            <p className="text-xl font-bold m-0 p-0">Tổng quan</p>
            <p className="text-[12px] text-gray-600 p-0 m-0">
              Chào mừng trở lại, Admin
            </p>
          </div>
          {/* right-section */}
          <div className="flex items-center flex-1 ">
            <div className="flex items-center flex-3 ">
              <div className="flex flex-1 border border-gray-300 py-2 px-3 justify-end rounded-xl items-center gap-1">
                <SearchOutlinedIcon sx={{ color: "gray" }} />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full focus:outline-none text-md"
                />
              </div>
              <div className="w-[50px] flex justify-center">
                <NotificationsOutlinedIcon />
              </div>
            </div>
            <div className="flex flex-1 items-center border-l border-l-gray-300 pl-3">
              <img
                src={profile}
                alt=""
                className="h-10 w-10 object-cover rounded-full mr-2"
              />
              <div>
                <p className="p-0 mr-0 font-bold text-[12px] text-black">
                  Admin User
                </p>
                <p className="p-0 m-0 font-medium text-[10px] text-gray-600">
                  Quản trị viên
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className=" bg-amber-100 p-6 mt-25 ml-70">
          {/* ...dashboard / page content... */}
        </div>
      </div>
    </div>
  );
}
