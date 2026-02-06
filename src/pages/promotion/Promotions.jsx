import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { SubTitle } from "../../components/SubTitle";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "../../contexts/ConfirmContext";
import { useLoader } from "../../contexts/LoaderContext";
import RunningWithErrorsRoundedIcon from "@mui/icons-material/RunningWithErrorsRounded";
import MoreTimeRoundedIcon from "@mui/icons-material/MoreTimeRounded";
import promoApi from "../../api/promotionApi";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import PromotionModal from "./PromotionModal";

export default function Promotions() {
  const { confirm } = useConfirm();
  const { setLoading } = useLoader();

  const [promotions, setPromotions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("edit");
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const calcPromotionStatus = (start_at, end_at) => {
    const now = new Date();
    const start = new Date(start_at);
    const end = new Date(end_at);

    if (end < now) return "EXPIRED";
    if (start <= now && now < end) return "ACTIVE";
    return "UPCOMING";
  };

  const confirmStatusTransition = async (payload, currentStatus) => {
    const nextStatus = calcPromotionStatus(payload.start_at, payload.end_at);

    if (!currentStatus) {
      if (nextStatus === "ACTIVE") {
        return await confirm({
          title: "Promotion sẽ được kích hoạt ngay sau khi tạo!",
          message:
            "Sau khi kích hoạt, bạn sẽ không thể chỉnh lại thời gian. Bạn có chắc chắn muốn tiếp tục?",
        });
      }

      if (nextStatus === "EXPIRED") {
        return await confirm({
          title: "Promotion đã quá hạn",
          message:
            "Promotion sẽ được tạo ở trạng thái hết hạn. Bạn có muốn tiếp tục?",
        });
      }

      return true;
    }

    // UPCOMING sang ACTIVE
    if (currentStatus === "UPCOMING" && nextStatus === "ACTIVE") {
      return await confirm({
        title: "Promotion sẽ được kích hoạt ngay sau khi lưu!",
        message:
          "Sau khi kích hoạt, bạn sẽ không thể chỉnh lại thời gian bắt đầu / kết thúc. Bạn có chắc chắn muốn tiếp tục?",
      });
    }

    // UPCOMING sang EXPIRED
    if (currentStatus === "UPCOMING" && nextStatus === "EXPIRED") {
      return await confirm({
        title: "Promotion đã quá hạn",
        message:
          "Thời gian kết thúc đã ở trong quá khứ. Promotion sẽ chuyển sang trạng thái hết hạn. Bạn có muốn tiếp tục?",
      });
    }

    return true;
  };

  // Edit
  const handleEdit = (promotion) => {
    setMode("edit");
    setSelectedPromotion(promotion);
    setOpen(true);
  };

  // Duplicate
  const handleDuplicate = (promotion) => {
    setMode("duplicate");
    setSelectedPromotion(promotion);
    setOpen(true);
  };

  // Duplicate
  const handleCreate = (promotion) => {
    setMode("create");
    setSelectedPromotion(promotion);
    setOpen(true);
  };

  const submitEditPromotion = async (promotionId, payload, currentStatus) => {
    const accepted = await confirmStatusTransition(payload, currentStatus);
    if (!accepted) return;

    setLoading(true);
    try {
      const res = await promoApi.updatePromotion(promotionId, payload);
      const status = res.data?.newStatus;
      setPromotions((prev) =>
        prev.map((item) =>
          item.promotionId === promotionId
            ? { promotionId: item.promotionId, ...payload, status: status }
            : item,
        ),
      );

      toast.success("Cập nhật promotion thành công");
    } catch (error) {
      toast.error("Cập nhật promotion thất bại");
      return;
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const submitCreatePromotion = async (payload) => {
    const accept = await confirmStatusTransition(payload);
    if (!accept) return;

    setLoading(true);
    try {
      const res = await promoApi.createPromotion(payload);
      const newPromotion = res.data;
      setPromotions((prev) => [
        ...prev,
        {
          promotionId: newPromotion.promotionId,
          ...payload,
          status: newPromotion.status,
        },
      ]);

      toast.success("Tạo chương trình giảm giá thành công");
    } catch (error) {
      toast.error("Tạo chương trình giảm giá thất bại");
      return;
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleSubmitModal = async (data) => {
    if (mode === "edit") {
      await submitEditPromotion(
        selectedPromotion.promotionId,
        data,
        selectedPromotion.status,
      );
    } else {
      await submitCreatePromotion(data);
    }
  };
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
          <button
            className="bg-blue-200 px-2 py-1 rounded-md text-[14px] cursor-pointer active:scale-95"
            onClick={() => handleEdit(promo)}
          >
            <EditOutlinedIcon />
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
          <button
            className="bg-green-200 text-primary px-2 py-1 rounded-md cursor-pointer active:scale-95"
            onClick={() => handleDuplicate(promo)}
          >
            <ContentCopyOutlinedIcon />
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
            handleMove={() => handleCreate({})}
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
          <PromotionModal
            open={open}
            mode={mode}
            initialData={selectedPromotion}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmitModal}
          />
          ;
        </>
      )}
    </>
  );
}
