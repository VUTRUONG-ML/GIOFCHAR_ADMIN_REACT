import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { SubTitle } from "../../components/SubTitle";
import profilePicture from "../../assets/profile.jpg";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import { useEffect, useState } from "react";
import usersApi from "../../api/usersApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [quantityUser, setQuantityUser] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const loadUsersData = async () => {
      setLoading(true);
      try {
        const response = await usersApi.getUsers(controller.signal);
        setUsers(response.data?.users);
        setQuantityUser(response.data?.totalUser);
      } catch (error) {
        if (error.name === "CanceledError") return;
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadUsersData();
    return () => controller.abort();
  }, []);

  const updateActive = async (isActive, userId) => {
    try {
      await usersApi.updateActiveUser({ isActive }, userId);

      // cập nhật ui
      setUsers((prev) =>
        prev.map((user) => {
          return user.userId === userId
            ? { ...user, isActiveAccount: isActive }
            : user;
        })
      );
      toast.success("Cập nhật tài khoản khách hàng thành công");
    } catch (error) {
      // processed
    }
  };
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/*subTitle */}
          <SubTitle
            handle={() => {}}
            title="Quản lý khách hàng"
            miniTitle={`Tổng: ${quantityUser} khách hàng`}
          />
          {/* data */}
          <div className="flex-1 bg-white shadow rounded-xl py-1 px-4">
            {/* table */}
            {!quantityUser ? (
              <div>Danh sách khách hàng rỗng</div>
            ) : (
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
                    {users.map((user) => {
                      return (
                        <tr
                          className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-linear"
                          key={user.userId}
                        >
                          <td className="py-2">
                            <div className="flex gap-2 items-center">
                              <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={profilePicture}
                                alt="profile"
                              />
                              <p>{user.userName}</p>
                            </div>
                          </td>
                          <td className="text-[14px] text-secondary">
                            {user.email}
                          </td>
                          <td className="text-[14px] text-secondary">
                            {user.phone}
                          </td>
                          <td className="text-[14px] text-secondary">
                            {user.registerDate}
                          </td>
                          <td>
                            <div className="flex justify-center items-center ">
                              <div className="bg-blue-200 text-blue-700 py-2 px-3 rounded-full">
                                {user.orderCount}
                              </div>
                            </div>
                          </td>
                          <td>
                            {user.isActiveAccount ? (
                              <div className="flex bg-green-200  items-center gap-1 text-primary py-1 px-2 rounded-2xl text-[10px] max-w-25">
                                <CheckCircleOutlineOutlinedIcon />
                                <p>Hoạt động</p>
                              </div>
                            ) : (
                              <div className="flex bg-red-300 text-red-700  items-center gap-1  py-1 px-2 rounded-2xl text-[10px] max-w-25">
                                <DoDisturbOutlinedIcon />
                                <p>Đã chặn</p>
                              </div>
                            )}
                          </td>
                          <td>
                            {user.isActiveAccount ? (
                              <button
                                className="bg-red-300 text-red-700 text-[14px] px-2 py-1 cursor-pointer rounded-md active:scale-95"
                                onClick={() => {
                                  updateActive(0, user.userId);
                                }}
                              >
                                <p>Chặn</p>
                              </button>
                            ) : (
                              <button
                                className=" text-[14px] px-2 py-1 cursor-pointer rounded-md active:scale-95 bg-green-200 text-primary"
                                onClick={() => {
                                  updateActive(1, user.userId);
                                }}
                              >
                                <p>Bỏ chặn</p>
                              </button>
                            )}
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
