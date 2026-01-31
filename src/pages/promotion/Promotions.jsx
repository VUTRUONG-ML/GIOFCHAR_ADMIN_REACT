import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import { SubTitle } from "../../components/SubTitle";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "../../contexts/ConfirmContext";
import { useLoader } from "../../contexts/LoaderContext";

const MOCK_PROMOTIONS = [
  {
    promotionId: 1,
    name: "Giảm giá khai trương",
    type: "PERCENT", // PERCENT | FIXED
    value: 20,
    start_at: "2024-10-01",
    end_at: "2024-10-31",
    isActive: true,
  },
  {
    promotionId: 2,
    name: "Ưu đãi cuối tuần",
    type: "FIXED",
    value: 50000,
    start_at: "2024-11-01",
    end_at: "2024-11-30",
    isActive: false,
  },
];

export default function Promotions() {
  const { confirm } = useConfirm();
  const { setLoading } = useLoader();

  const [promotions, setPromotions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    // mock loading
    setTimeout(() => {
      setPromotions(MOCK_PROMOTIONS);
      setLoadingPage(false);
    }, 500);
  }, []);

  const toggleActive = async (isActive, promotionId) => {
    const ok = await confirm({
      title: "Xác nhận thay đổi?",
      message: `Bạn có chắc chắn muốn ${
        isActive ? "hiển thị" : "ẩn"
      } promotion này?`,
    });
    if (!ok) return;

    setLoading(true);
    try {
      // mock update
      setPromotions((prev) =>
        prev.map((item) =>
          item.promotionId === promotionId ? { ...item, isActive } : item,
        ),
      );
      toast.success("Cập nhật promotion thành công");
    } finally {
      setLoading(false);
    }
  };

  const renderValue = (type, value) => {
    if (type === "PERCENT") return `Giảm ${value}%`;
    return `Giảm ${value.toLocaleString()}đ`;
  };

  return (
    <>
      {loadingPage ? (
        <LoadingSpinner />
      ) : (
        <>
          <SubTitle
            handle={() => {}}
            title="Quản lý khuyến mãi"
            miniTitle={`Tổng: ${promotions.length} promotion`}
            active={true}
            nameActive={"Khuyến mãi"}
          />

          <div className="flex-1 bg-white shadow rounded-xl py-1 px-4">
            {!promotions.length ? (
              <div>Danh sách promotion rỗng</div>
            ) : (
              <div className="mt-2 font-medium overflow-y-auto max-h-[calc(98vh-180px)]">
                <table className="w-full table-fixed">
                  <thead className="text-left">
                    <tr className="border-b border-gray-200">
                      <th className="w-[20%] py-2">Tên promotion</th>
                      <th className="w-[15%]">Loại</th>
                      <th className="w-[15%]">Giá trị</th>
                      <th className="w-[15%]">Bắt đầu</th>
                      <th className="w-[15%]">Kết thúc</th>
                      <th className="w-[10%]">Trạng thái</th>
                      <th className="w-[10%]">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map((promo) => (
                      <tr
                        key={promo.promotionId}
                        className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300"
                      >
                        <td className="py-2">{promo.name}</td>
                        <td className="text-secondary text-sm">
                          {promo.type === "PERCENT"
                            ? "Theo phần trăm"
                            : "Giá cố định"}
                        </td>
                        <td className="text-secondary text-sm">
                          {renderValue(promo.type, promo.value)}
                        </td>
                        <td className="text-secondary text-sm">
                          {promo.start_at}
                        </td>
                        <td className="text-secondary text-sm">
                          {promo.end_at}
                        </td>
                        <td>
                          {promo.isActive ? (
                            <div className="flex bg-green-200 items-center gap-1 text-primary py-1 px-2 rounded-2xl text-[10px]">
                              <CheckCircleOutlineOutlinedIcon />
                              <p>Đang áp dụng</p>
                            </div>
                          ) : (
                            <div className="flex bg-red-300 text-red-700 items-center gap-1 py-1 px-2 rounded-2xl text-[10px]">
                              <DoDisturbOutlinedIcon />
                              <p>Đã ẩn</p>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="flex justify-center">
                            {promo.isActive ? (
                              <button
                                className="bg-red-300 text-red-700 text-[14px] px-2 py-1 rounded-md active:scale-95 cursor-pointer"
                                onClick={() =>
                                  toggleActive(false, promo.promotionId)
                                }
                              >
                                Ẩn
                              </button>
                            ) : (
                              <button
                                className="bg-green-200 text-primary text-[14px] px-2 py-1 rounded-md active:scale-95 cursor-pointer"
                                onClick={() =>
                                  toggleActive(true, promo.promotionId)
                                }
                              >
                                Hiện
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
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
