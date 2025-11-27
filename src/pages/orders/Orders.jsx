import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { SubTitle } from "../../components/SubTitle";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
export default function Orders() {
  return (
    <>
      {/*subTitle */}
      <SubTitle
        handle={() => {}}
        title="Quản lý đơn hàng"
        miniTitle="Tổng 2 đơn hàng"
      />
      {/* data */}
      <div className="flex-1 bg-white shadow rounded-xl py-1 px-4">
        {/* categy */}
        <div className="flex text-secondary gap-5 h-15 items-center font-bold">
          <div className=" py-1 px-3 rounded-md bg-primary text-white ">
            Tất cả
          </div>
          <div className="bg-gray-200 py-1 px-3 rounded-md">Chờ xác nhận</div>
          <div className="bg-gray-200 py-1 px-3 rounded-md">Đang xử lý</div>
          <div className="bg-gray-200 py-1 px-3 rounded-md">Hoàn thành</div>
          <div className="bg-gray-200 py-1 px-3 rounded-md">Đã hủy</div>
        </div>
        {/* table */}
        <div className="pt-3 mt-2 font-medium">
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
              <tr className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear cursor-pointer">
                <td className="py-2">#DH2024-0891</td>
                <td>
                  <div className="flex flex-col justify-center py-3">
                    <p className="text-black">Nguyên Văn A</p>
                    <p className="text-[12px] text-secondary">
                      nguyenvana@gmail.com
                    </p>
                  </div>
                </td>
                <td>
                  <div className="flex bg-amber-100 text-[16px] justify-center py-2 rounded-2xl items-center w-[50%] gap-2">
                    <Inventory2OutlinedIcon />
                    <p>3</p>
                  </div>
                </td>
                <td>285.000 d</td>
                <td className="text-secondary text-[14px]">2024-11-23 14:30</td>
                <td>
                  <div className="flex bg-green-200  justify-start items-center gap-1 text-primary py-1 px-2 rounded-2xl text-[12px] w-30">
                    <DoneOutlinedIcon />
                    <p>Hoàn thành</p>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear cursor-pointer">
                <td className="py-2">#DH2024-0891</td>
                <td>
                  <div className="flex flex-col justify-center py-3">
                    <p className="text-black">Nguyên Văn A</p>
                    <p className="text-[12px] text-secondary">
                      nguyenvana@gmail.com
                    </p>
                  </div>
                </td>
                <td>
                  <div className="flex bg-amber-100 text-[16px] justify-center py-2 rounded-2xl items-center w-[50%] gap-2">
                    <Inventory2OutlinedIcon />
                    <p>3</p>
                  </div>
                </td>
                <td>285.000 d</td>
                <td className="text-secondary text-[14px]">2024-11-23 14:30</td>
                <td>
                  <div className="flex bg-red-300  justify-start items-center gap-1 text-red-700 py-1 px-2 rounded-2xl text-[12px] w-30">
                    <ClearOutlinedIcon />
                    <p>Đã hủy</p>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear cursor-pointer">
                <td className="py-2">#DH2024-0891</td>
                <td>
                  <div className="flex flex-col justify-center py-3">
                    <p className="text-black">Nguyên Văn A</p>
                    <p className="text-[12px] text-secondary">
                      nguyenvana@gmail.com
                    </p>
                  </div>
                </td>
                <td>
                  <div className="flex bg-amber-100 text-[16px] justify-center py-2 rounded-2xl items-center w-[50%] gap-2">
                    <Inventory2OutlinedIcon />
                    <p>3</p>
                  </div>
                </td>
                <td>285.000 d</td>
                <td className="text-secondary text-[14px]">2024-11-23 14:30</td>
                <td>
                  <div className="flex bg-amber-200  justify-start items-center gap-1 text-red-700 py-1 px-2 rounded-2xl text-[12px] w-30">
                    <MoreHorizOutlinedIcon />
                    <p>Chờ xác nhận</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
