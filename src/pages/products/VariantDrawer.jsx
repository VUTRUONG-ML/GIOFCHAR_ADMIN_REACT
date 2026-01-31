import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { formatMoney } from "../../utils/formatMoney";
const mockVariants = [
  {
    variantId: 1,
    originalPrice: 50000,
    price: 40000,
    promotionType: "PERCENT",
    promotionValue: 12,
    stock: 12,
    weight_gram: 200,
  },
  {
    variantId: 2,
    originalPrice: 70000,
    price: 60000,
    promotionType: "FIXED",
    promotionValue: 10000,
    stock: 2,
    weight_gram: 350,
  },
];

function getLabelDiscount(promotionType, promotionValue) {
  if (promotionType === "FIXED") return formatMoney(promotionValue);
  return `${promotionValue}%`;
}

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
          {mockVariants.map((variant, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              {/* Top */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-secondary">
                    {variant.weight_gram}g / phần
                  </p>
                </div>

                {variant.promotionType && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full
                    bg-secondary-orange text-white"
                  >
                    {getLabelDiscount(
                      variant.promotionType,
                      variant.promotionValue,
                    )}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mt-2">
                {variant.promotionType && (
                  <p className="text-sm text-gray-400 line-through">
                    {formatMoney(variant.originalPrice)}
                  </p>
                )}
                <p className="text-lg font-bold text-primary">
                  {formatMoney(variant.price)}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Kho:{" "}
                  <span className="font-semibold">{variant.stock} phần</span>
                </div>
                <div>
                  <button>
                    <AppRegistrationOutlinedIcon className="text-blue-800 cursor-pointer active:scale-95" />
                  </button>
                  <button>
                    <DeleteForeverOutlinedIcon className="text-red-800 cursor-pointer active:scale-95" />
                  </button>
                </div>
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
            Thêm loại sản phẩm
          </button>
        </div>
      </div>
    </>
  );
}
