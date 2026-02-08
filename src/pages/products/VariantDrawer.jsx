import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { VariantCard } from "./VariantCard";
import { useEffect, useState } from "react";
import foodsApi from "../../api/foodsApi";
import { mapVariants } from "../../mappers/variants";
import LoadingSpinner from "../../components/LoadingSpinner";
import { VariantModal } from "./VariantModal";
import { useLoader } from "../../contexts/LoaderContext";
import { toast } from "react-toastify";
import promoApi from "../../api/promotionApi";
import variantApi from "../../api/variantApi";
import { useConfirm } from "../../contexts/ConfirmContext";

export function VariantDrawer({ open, onClose, foodName, foodId }) {
  const { setLoading } = useLoader();

  const { confirm } = useConfirm();
  const [loadingPage, setLoadingPage] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variants, setVariants] = useState([]);
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const loadData = async () => {
      setLoadingPage(true);
      try {
        const [variantRes, promotionRes] = await Promise.all([
          foodsApi.getVariantsOfFood(foodId, controller.signal),
          promoApi.getPromotions(controller.signal),
        ]);
        const variants = variantRes.data?.map(mapVariants);
        const promotions = promotionRes.data;
        setVariants(variants);
        setPromotions(promotions.filter((p) => p.isActive));
      } catch (error) {
        if (error.name === "CanceledError") return;
        toast.warn("Đã có lỗi xảy ra khi tải dữ liệu!");
      } finally {
        if (!controller.signal.aborted) setLoadingPage(false);
      }
    };
    loadData();
    return () => controller.abort();
  }, [foodId]);

  const handleCreate = () => {
    setSelectedVariant(null);
    setOpenModal(true);
  };
  const handleUpdate = (variant) => {
    setSelectedVariant(variant);
    setOpenModal(true);
  };
  const submitCreate = async (payload) => {
    //payload: {weight_gram, originalPrice, stock, promotionId?}
    setLoading(true);
    try {
      const res = await foodsApi.createVariant(foodId, payload);
      const newVariant = res.data?.variant;
      setVariants((prev) => [...prev, mapVariants(newVariant)]);
    } catch (error) {
      toast.warn("Đã có lỗi xảy ra khi tạo variant!");
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };
  const submitDelete = async (variantId) => {
    const ok = await confirm({
      title: "Bạn có chắc chắn muốn xóa?",
      message: "Việc này có thể ảnh hưởng đến trải nghiệm của khách hàng!",
    });
    if (!ok) return;
    setLoading(true);
    try {
      await variantApi.deleteVariant(variantId);
      setVariants((prev) => prev.filter((p) => p.variantId !== variantId));
      toast.success("Xóa loại sản phẩm thành công");
    } catch (error) {
      toast.warn("Sản phẩm này không thể xóa, bạn hãy thử ẩn nó đi!");
    } finally {
      setLoading(false);
    }
  };
  const submitUpdate = async (variantId, payload) => {
    const ok = await confirm({
      title: "Xác nhận thay đổi!",
      message: "Bạn đã xem kĩ thông tin cập nhật rồi chứ?",
    });
    if (!ok) return;
    setLoading(true);
    try {
      await variantApi.updateVariant(variantId, payload);
      setVariants((prev) =>
        prev.map((p) =>
          p.variantId === variantId ? { variantId, ...payload } : p,
        ),
      );
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      toast.warn("Đã có lỗi khi cập nhật loại sản phẩm");
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };
  const handleSubmitModal = async (data) => {
    // selected có nghĩa là đang update
    if (selectedVariant) {
      await submitUpdate(selectedVariant.variantId, data);
    } else {
      await submitCreate(data);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-[420px] z-50 animate-zoomIn
        bg-gradient-to-b from-[#E8F5E8] via-[#F1F8E9] to-[#E8F5E8]
        shadow-xl border-l border-gray-200 flex flex-col"
      >
        {loadingPage ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-secondary">
                  Variant sản phẩm
                </h3>
                <p className="text-sm text-gray-500">{foodName}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-red-600 text-xl"
              >
                <ClearOutlinedIcon />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {variants.map((variant) => (
                <VariantCard
                  key={variant.variantId}
                  variant={variant}
                  onDelete={submitDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>

            {/* Footer action */}
            <div className="p-4 border-t border-gray-200">
              <button
                className="w-full py-2 rounded-xl bg-primary text-white font-semibold
              hover:bg-primary-md transition cursor-pointer"
                onClick={handleCreate}
              >
                Thêm loại sản phẩm
              </button>
            </div>
          </>
        )}
      </div>

      <VariantModal
        key={selectedVariant ? selectedVariant.variantId : "create"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialData={selectedVariant}
        onSubmit={handleSubmitModal}
        promotions={promotions}
      />
    </>
  );
}
