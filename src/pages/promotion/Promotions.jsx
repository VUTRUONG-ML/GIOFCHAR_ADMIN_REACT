import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import { SubTitle } from "../../components/SubTitle";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "../../contexts/ConfirmContext";
import { useLoader } from "../../contexts/LoaderContext";
import RunningWithErrorsRoundedIcon from "@mui/icons-material/RunningWithErrorsRounded";
import MoreTimeRoundedIcon from "@mui/icons-material/MoreTimeRounded";
import promoApi from "../../api/promotionApi";

const MOCK_PROMOTIONS = [
  {
    promotionId: 1,
    name: "Giảm giá khai trương",
    type: "PERCENT",
    value: 20,
    start_at: "2026-03-01",
    end_at: "2026-03-31",
    status: "UPCOMING",
  },
  {
    promotionId: 2,
    name: "Ưu đãi Valentine",
    type: "FIXED",
    value: 50000,
    start_at: "2026-02-10",
    end_at: "2026-02-14",
    status: "UPCOMING",
  },

  {
    promotionId: 3,
    name: "Flash Sale đầu tháng",
    type: "PERCENT",
    value: 15,
    start_at: "2026-02-01",
    end_at: "2026-02-05",
    status: "ACTIVE",
    isActive: true,
  },
  {
    promotionId: 4,
    name: "Ưu đãi thành viên VIP",
    type: "FIXED",
    value: 100000,
    start_at: "2026-01-15",
    end_at: "2026-02-28",
    status: "ACTIVE",
    isActive: false,
  },

  {
    promotionId: 5,
    name: "Sale Tết Nguyên Đán",
    type: "PERCENT",
    value: 30,
    start_at: "2026-01-15",
    end_at: "2026-01-31",
    status: "EXPIRED",
  },
  {
    promotionId: 6,
    name: "Ưu đãi cuối năm",
    type: "FIXED",
    value: 70000,
    start_at: "2025-12-01",
    end_at: "2025-12-31",
    status: "EXPIRED",
  },

  {
    promotionId: 7,
    name: "Kết thúc hôm nay",
    type: "PERCENT",
    value: 10,
    start_at: "2026-01-20",
    end_at: "2026-02-02",
    status: "ACTIVE",
    isActive: true,
  },
  {
    promotionId: 8,
    name: "Bắt đầu hôm nay",
    type: "FIXED",
    value: 30000,
    start_at: "2026-02-02",
    end_at: "2026-02-10",
    status: "ACTIVE",
    isActive: true,
  },
];

export default function Promotions() {
  const { confirm } = useConfirm();
  const { setLoading } = useLoader();

  const [promotions, setPromotions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const loadingPromotions = async () => {
      try {
        const res = await promoApi.getPromotions(controller.signal);
        setPromotions(res.data);
      } catch (error) {
        if (error.name === "CanceledError") return;
        toast.warn("Đã có lỗi xảy ra");
      } finally {
        setLoadingPage(false);
      }
    };
    loadingPromotions();
    return () => controller.abort();
  }, []);

  const toggleActive = async (promo) => {
    const nextActive = !promo.isActive;

    const ok = await confirm({
      title: "Xác nhận thay đổi?",
      message: `Bạn có chắc chắn muốn ${
        nextActive ? "hiển thị" : "ẩn"
      } promotion này?`,
    });
    if (!ok) return;

    setLoading(true);
    try {
      await promoApi.updateActivePromotion(promo.promotionId, {
        isActive: nextActive,
      });
      setPromotions((prev) =>
        prev.map((item) =>
          item.promotionId === promo.promotionId
            ? { ...item, isActive: nextActive }
            : item,
        ),
      );
      toast.success("Cập nhật promotion thành công");
    } catch (error) {
      console.log(">>> error:", error);
      toast.error("Đã có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const renderValue = (type, value) => {
    if (type === "PERCENT") return `Giảm ${value}%`;
    return `Giảm ${value.toLocaleString()}đ`;
  };

  const renderStatus = (promo) => {
    switch (promo.status) {
      case "UPCOMING":
        return (
          <div className="flex bg-blue-200 text-blue-700 items-center gap-1 py-1 px-2 rounded-2xl text-[10px]">
            <MoreTimeRoundedIcon />
            <p>Chưa tới hạn</p>
          </div>
        );
      case "ACTIVE":
        return (
          <div
            className={`flex items-center gap-1 py-1 px-2 rounded-2xl text-[10px]
        ${
          promo.isActive
            ? "bg-green-200 text-primary"
            : "bg-gray-300 text-gray-600"
        }`}
          >
            {promo.isActive ? (
              <CheckCircleOutlineOutlinedIcon />
            ) : (
              <DoDisturbOutlinedIcon />
            )}
            <p>{promo.isActive ? "Đang áp dụng" : "Đã tắt"}</p>
          </div>
        );

      case "EXPIRED":
        return (
          <div className="flex bg-secondary-orange text-white items-center gap-1 py-1 px-2 rounded-2xl text-[10px]">
            <RunningWithErrorsRoundedIcon />
            <p>Đã hết hạn</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAction = (status, promo) => {
    switch (status) {
      case "UPCOMING":
        return (
          <button className="bg-blue-200 px-2 py-1 rounded-md text-[14px] cursor-pointer active:scale-95">
            Sửa
          </button>
        );

      case "ACTIVE":
        return (
          <button
            className={`px-2 py-1 rounded-md text-[14px] cursor-pointer active:scale-95 ${
              promo.isActive
                ? "bg-red-200 text-red-700"
                : "bg-green-200 text-primary"
            }`}
            onClick={() => toggleActive(promo)}
          >
            {promo.isActive ? "Ẩn" : "Hiện"}
          </button>
        );

      case "EXPIRED":
        return (
          <button className="bg-green-200 text-primary px-2 py-1 rounded-md cursor-pointer active:scale-95">
            Duplicate
          </button>
        );

      default:
        return null;
    }
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
                        <td>{renderStatus(promo)}</td>
                        <td>
                          <div className="flex justify-center">
                            {renderAction(promo.status, promo)}
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
