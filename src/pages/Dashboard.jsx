import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { SubTitle } from "../components/SubTitle";
import profilePicture from "../assets/profile.jpg";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
export default function DashBoard() {
  return (
    <>
      {/*subTitle */}
      <SubTitle
        handle={() => {}}
        title="Quản lý khách hàng"
        miniTitle="Tổng: 2 khách hàng"
      />
      {/* data */}
      <div className="flex-1 bg-white shadow rounded-xl py-1 px-4">
        {/* table */}
        <div className="pt-6 mt-2 font-medium overflow-y-auto max-h-[calc(98vh-250px)]">
          <table className="w-full table-fixed">
            <thead className="text-left">
              <tr className="border-b border-gray-200">
                <th className="w-[20%] py-2"> Họ và tên</th>
                <th className="w-[20%]">Email</th>
                <th className="w-[12%]">Số điện thoại</th>
                <th className="w-[10%]">Ngày đăng ký</th>
                <th className="w-[13%] text-center">Tổng đơn</th>
                <th className="w-[15%]">Trạng thái</th>
                <th className="w-[10%]">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear">
                <td className="py-2">
                  <div className="flex gap-2 items-center">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={profilePicture}
                      alt="profile"
                    />
                    <p>Nguyễn văn A</p>
                  </div>
                </td>
                <td className="text-[14px] text-secondary">
                  nguyenvana@gmail.com
                </td>
                <td className="text-[14px] text-secondary">0918888231</td>
                <td className="text-[14px] text-secondary">2025-02-18</td>
                <td>
                  <div className="flex justify-center items-center ">
                    <div className="bg-blue-200 text-blue-700 py-2 px-3 rounded-full">
                      12
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex bg-green-200  items-center gap-1 text-primary py-1 px-2 rounded-2xl text-[10px] max-w-25">
                    <CheckCircleOutlineOutlinedIcon />
                    <p>Hoạt động</p>
                  </div>
                </td>
                <td>
                  <button className="bg-red-300 text-red-700 text-[14px] px-2 py-1 cursor-pointer rounded-md active:scale-95">
                    <p>Chặn</p>
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear">
                <td className="py-2">
                  <div className="flex gap-2 items-center">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={profilePicture}
                      alt="profile"
                    />
                    <p>Nguyễn văn A</p>
                  </div>
                </td>
                <td className="text-[14px] text-secondary">
                  nguyenvana@gmail.com
                </td>
                <td className="text-[14px] text-secondary">0918888231</td>
                <td className="text-[14px] text-secondary">2025-02-18</td>
                <td>
                  <div className="flex justify-center items-center ">
                    <div className="bg-blue-200 text-blue-700 py-2 px-3 rounded-full">
                      12
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex bg-red-300 text-red-700  items-center gap-1  py-1 px-2 rounded-2xl text-[10px] max-w-25">
                    <DoDisturbOutlinedIcon />
                    <p>Đã chặn</p>
                  </div>
                </td>
                <td>
                  <button className=" text-[14px] px-2 py-1 cursor-pointer rounded-md active:scale-95 bg-green-200 text-primary">
                    <p>Bỏ chặn</p>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
