import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { VariantCard } from "./VariantCard";
import { useEffect, useState } from "react";
import foodsApi from "../../api/foodsApi";
import { mapVariants } from "../../mappers/variants";
import LoadingSpinner from "../../components/LoadingSpinner";
import { VariantModal } from "./VariantModal";
import { useLoader } from "../../contexts/LoaderContext";
import { toast } from "react-toastify";

export function VariantDrawer({ open, onClose, foodName, foodId }) {
  const { setLoading } = useLoader();

  const [loadingPage, setLoadingPage] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variants, setVariants] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const loadVariants = async () => {
      setLoadingPage(true);
      try {
        const res = await foodsApi.getVariantsOfFood(foodId, controller.signal);
        const variantRes = res.data?.map(mapVariants);
        setVariants(variantRes);
      } catch (error) {
        if (error.name === "CanceledError") return;
      } finally {
        if (!controller.signal.aborted) setLoadingPage(false);
      }
    };
    loadVariants();
    return () => controller.abort();
  }, [foodId]);

  const handleCreate = () => {
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
                <VariantCard key={variant.variantId} variant={variant} />
              ))}
            </div>

            {/* Footer action */}
            <div className="p-4 border-t border-gray-200">
              <button
                className="w-full py-2 rounded-xl bg-primary text-white font-semibold
              hover:bg-primary-md transition"
                onClick={handleCreate}
              >
                Thêm loại sản phẩm
              </button>
            </div>
          </>
        )}
      </div>

      <VariantModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialData={selectedVariant}
        onSubmit={submitCreate}
      />
    </>
  );
}
