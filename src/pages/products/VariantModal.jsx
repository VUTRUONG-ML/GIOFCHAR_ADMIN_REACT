import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { useEffect, useState } from "react";

import { formatMoney } from "../../utils/formatMoney";
import { calcFinalPrice } from "../../utils/calc";
import { InputCreate } from "../../components/InputCreate";
import promoApi from "../../api/promotionApi";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";

export function VariantModal({
  open,
  onClose,
  initialData, // null = create | object = update
  onSubmit,
}) {
  const [form, setForm] = useState(() => ({
    weight: initialData?.weight_gram ?? 0,
    originalPrice: initialData?.originalPrice ?? 0,
    stock: initialData?.stock ?? 0,
    promotionId: initialData?.promotionId ?? "",
  }));
  const [promotions, setPromotions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const loadPromotions = async () => {
      try {
        const res = await promoApi.getPromotions(controller.signal);
        const promotionRes = res.data;
        setPromotions(promotionRes.filter((p) => p.isActive));
      } catch (error) {
        if (error.name === "CanceledError") return;
        toast.warn("Đã có lỗi xảy ra khi tải giảm giá!");
      } finally {
        setLoadingPage(false);
      }
    };
    loadPromotions();
    return () => controller.abort();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  /*
  get variant:{
    variantId,
    weight_gram,
    originalPrice,
    stock,
    promotionId
  }

  get promotions:{
    promotionsId,
    typePromotion,
    valuePromotion
  }
*/
  // const promotions = MOCK_PROMOTIONS.filter((p) => p.isActive);

  const selectedPromotion = promotions.find(
    (p) => p.promotionId === Number(form.promotionId),
  );

  const finalPrice = calcFinalPrice(form.originalPrice, selectedPromotion);

  if (!open) return null;

  if (loadingPage) return <LoadingSpinner />;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      weight_gram: Number(form.weight),
      originalPrice: Number(form.originalPrice),
      stock: Number(form.stock),
      promotionId: selectedPromotion.promotionId,
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center animate-zoomIn">
        <div className="w-[420px] bg-white rounded-2xl shadow-xl p-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-secondary">
              {initialData ? "Cập nhật loại sản phẩm" : "Thêm loại sản phẩm"}
            </h3>
            <button onClick={onClose}>
              <ClearOutlinedIcon className="text-gray-500 hover:text-red-600" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-3">
            <InputCreate
              label="Khối lượng (gram)"
              placeHolder="VD: 300"
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
            />

            <InputCreate
              label="Giá gốc"
              type="number"
              name="originalPrice"
              placeHolder="VD: 45000"
              value={form.originalPrice}
              onChange={handleChange}
            />

            {/* Promotion */}
            <div>
              <label className="text-sm font-bold">Khuyến mãi</label>
              <select
                className="w-full border border-gray-300 rounded-lg py-2 px-3"
                value={form.promotionId}
                name="promotionId"
                onChange={handleChange}
              >
                <option value="">Không áp dụng</option>
                {promotions.map((p) => (
                  <option key={p.promotionId} value={p.promotionId}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Final price (readonly) */}
            <div>
              <label className="text-sm font-bold">Giá bán</label>
              <div className="text-lg font-bold text-primary">
                {formatMoney(finalPrice)}
              </div>
            </div>

            <InputCreate
              label="Tồn kho"
              placeHolder="VD: 20"
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
            />
          </div>

          {/* Footer */}
          <div className="mt-5">
            <button
              onClick={handleSubmit}
              className="w-full py-2 rounded-xl bg-primary text-white font-semibold
              hover:bg-primary-md transition"
            >
              {initialData ? "Lưu thay đổi" : "Tạo loại sản phẩm"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
