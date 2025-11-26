import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import profile from "../assets/profile.jpg";
export default function Header({ title }) {
  return (
    <div className="h-18 bg-white shadow p-4 flex items-center justify-between fixed top-4 right-3 left-70 rounded-xl">
      {/* left-section */}
      <div className="flex flex-col flex-1">
        <p className="text-xl font-bold m-0 p-0">{title}</p>
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
  );
}
