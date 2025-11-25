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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import productPicture from "../assets/product-template.jpg";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Menu } from "./Menu";
export default function AdminDraft() {
  return (
    <div className="flex min-h-screen bg-gray-100 pb-5">
      {/* Sidebar */}
      <div
        className="
       w-64 bg-pink-100 shadow-md p-4 fixed top-0 bottom-0 left-0
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
        {/* logout */}
        <div className="flex items-center mb-4 border-t border-gray-300 pt-8 pl-5 text-primary cursor-pointer">
          <LogoutOutlinedIcon className="mr-2" />
          <p className="text-lg font-bold">Đăng xuất</p>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col ">
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
        <div className=" mt-22 ml-70 mr-3 flex flex-col min-h-[calc(95vh-80px)]">
          {/* title */}
          <div className=" flex items-center justify-between h-20">
            {/* left-section */}
            <div>
              <p className="text-xl font-bold">Quản lý sản phẩm</p>
              <p className="text-[13px] text-secondary">
                Tổng sản phẩm: 4 sản phẩm
              </p>
            </div>
            {/* r-section */}
            <button className="flex bg-primary text-white text-sm items-center px-4 py-2 rounded-md cursor-pointer active:scale-98">
              <AddOutlinedIcon className="mr-2" />
              <p>Thêm sản phẩm</p>
            </button>
          </div>
          {/* data */}
          <div className="flex-1 bg-white shadow rounded-xl py-1 px-4">
            {/* categy */}
            <div className="flex text-secondary gap-5 h-15 items-center font-bold">
              <div className=" py-1 px-3 rounded-md bg-primary text-white ">
                Tất cả
              </div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Giò</div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Chả</div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Nem</div>
              <div className="bg-gray-200 py-1 px-3 rounded-md">Khác</div>
            </div>
            {/* table */}
            <div className="pt-3 mt-2 font-medium">
              <table className="w-full table-fixed">
                <thead className="text-left">
                  <tr className="border-b border-gray-200">
                    <th className="w-[40%] py-2">Sản phẩm</th>
                    <th className="w-[10%]">Danh mục</th>
                    <th className="w-[10%]">Giá</th>
                    <th className="w-[10%]">Tồn kho</th>
                    <th className="w-[20%]">Trạng thái</th>
                    <th className="w-[10%]">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear">
                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        <img
                          src={productPicture}
                          alt="Ảnh sp"
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <p>Giò lụa đặc biệt</p>
                          <p className="text-[12px] text-secondary font-normal">
                            Giò lụa cao cấp từ thịt heo nạc tươi...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="bg-green-200 text-center w-[50%] text-sm rounded-2xl text-primary">
                        Giò
                      </div>
                    </td>
                    <td>85.000 d</td>
                    <td>45 kg</td>
                    <td>
                      <div className="flex bg-green-200 w-[50%] justify-center items-center gap-1 text-primary py-1 rounded-2xl text-[14px]">
                        <VisibilityOutlinedIcon />
                        <p>Đang bán</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <button>
                          <EditOutlinedIcon className="text-blue-800 cursor-pointer" />
                        </button>
                        <button>
                          <DeleteForeverOutlinedIcon className="text-red-800 cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear">
                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        <img
                          src={productPicture}
                          alt="Ảnh sp"
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <p>Giò lụa đặc biệt</p>
                          <p className="text-[12px] text-secondary font-normal">
                            Giò lụa cao cấp từ thịt heo nạc tươi...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="bg-green-200 text-center w-[50%] text-sm rounded-2xl text-primary">
                        Giò
                      </div>
                    </td>
                    <td>85.000 d</td>
                    <td>45 kg</td>
                    <td>
                      <div className="flex bg-gray-200 w-[50%] justify-center items-center gap-1 text-gray-700 py-1 rounded-2xl text-[14px]">
                        <VisibilityOffOutlinedIcon />
                        <p>Tạm ẩn</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <button>
                          <EditOutlinedIcon className="text-blue-800 cursor-pointer" />
                        </button>
                        <button>
                          <DeleteForeverOutlinedIcon className="text-red-800 cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
