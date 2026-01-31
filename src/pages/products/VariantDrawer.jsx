import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
const mockVariants = [
  {
    id: 1,
    name: "Nhỏ",
    price: 50000,
    finalPrice: 40000,
    promotionApplied: true,
    discountLabel: "-20%",
    stock: 12,
    weight_gram: 200,
    warning: "ok",
  },
  {
    id: 2,
    name: "Lớn",
    price: 70000,
    finalPrice: 70000,
    promotionApplied: false,
    discountLabel: null,
    stock: 2,
    weight_gram: 350,
    warning: "low",
  },
];

export function VariantDrawer({ open, onClose, productName }) {
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
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-secondary">
              Variant sản phẩm
            </h3>
            <p className="text-sm text-gray-500">{productName}</p>
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
          {mockVariants.map((variant) => (
            <div
              key={variant.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              {/* Top */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-secondary">{variant.name}</p>
                  <p className="text-xs text-gray-500">
                    {variant.weight_gram}g / phần
                  </p>
                </div>

                {variant.promotionApplied && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full
                    bg-secondary-orange text-white"
                  >
                    {variant.discountLabel}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mt-2">
                {variant.promotionApplied && (
                  <p className="text-sm text-gray-400 line-through">
                    {variant.price.toLocaleString()} đ
                  </p>
                )}
                <p className="text-lg font-bold text-primary">
                  {variant.finalPrice.toLocaleString()} đ
                </p>
              </div>

              {/* Footer */}
              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Kho:{" "}
                  <span className="font-semibold">{variant.stock} phần</span>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      variant.warning === "low"
                        ? "bg-red-200 text-red-700"
                        : "bg-green-200 text-primary"
                    }`}
                >
                  {variant.warning === "low" ? "Sắp hết" : "Ổn định"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer action */}
        <div className="p-4 border-t border-gray-200">
          <button
            className="w-full py-2 rounded-xl bg-primary text-white font-semibold
              hover:bg-primary-md transition"
          >
            Mở trang quản lý chi tiết
          </button>
        </div>
      </div>
    </>
  );
}
