import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Menu } from "./Menu";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useConfirm } from "../contexts/ConfirmContext";
export default function Sidebar() {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const { confirm } = useConfirm();
  const handleLogout = async () => {
    const ok = await confirm({
      title: "Xác nhận thoát phiên làm việc!",
      message: "Bạn có chắc chắn muốn kết thúc phiên làm việc hiện tại?",
    });
    if (!ok) return;
    logout();
    navigate("/auth");
  };
  return (
    <div
      className="
       w-64 bg-white shadow-md p-4 fixed top-0 bottom-0 left-0
       flex flex-col
       rounded-xl
      "
    >
      <div className=" h-16 flex pt-2 mb-3">
        <div className="h-[50px] w-[50px] bg-primary flex items-center justify-center mr-1.5 rounded-xl">
          <Inventory2OutlinedIcon sx={{ color: "white" }} />
        </div>
        <div className=" flex-1 flex flex-col justify-center h-[50px]">
          <p className=" text-lg font-bold text-black">Giò Chả</p>
          <p className=" text-[12px] text-gray-500 font-normal">
            Admin Dashboard
          </p>
        </div>
      </div>
      <div className=" flex-1 flex flex-col gap-2 border-t border-gray-300 pt-7 mt-4">
        <Menu title="Tổng quan" icon={DashboardOutlinedIcon} to="/admin/" />
        <Menu title="Sản phẩm" icon={FoodBankOutlinedIcon} to="products" />
        <Menu title="Đơn hàng" icon={ShoppingCartOutlinedIcon} to="orders" />
        <Menu title="Khách hàng" icon={GroupOutlinedIcon} to="users" />
        <Menu title="Danh mục" icon={CategoryOutlinedIcon} to="categories" />
        <Menu title="Tài khoản" icon={AccountCircleOutlinedIcon} to="my" />
      </div>
      {/* logout */}
      <div
        className="flex items-center pb-4 border-t border-gray-300 pt-8 pl-5 text-primary cursor-pointer"
        onClick={handleLogout}
      >
        <LogoutOutlinedIcon className="mr-2" />
        <p className="text-lg font-bold">Đăng xuất</p>
      </div>
    </div>
  );
}
