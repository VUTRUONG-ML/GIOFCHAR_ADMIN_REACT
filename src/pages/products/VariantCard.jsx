import { formatMoney } from "../../utils/formatMoney";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

export function VariantCard({ variant, onDelete }) {
  function getLabelDiscount(promotionType, promotionValue) {
    if (promotionType === "FIXED") return formatMoney(promotionValue);
    return `${promotionValue}%`;
  }
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(variant.variantId);
  };
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
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
            {getLabelDiscount(variant.promotionType, variant.promotionValue)}
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
          Kho: <span className="font-semibold">{variant.stock} phần</span>
        </div>
        <div>
          <button>
            <AppRegistrationOutlinedIcon className="text-blue-800 cursor-pointer active:scale-95" />
          </button>
          <button onClick={handleDelete}>
            <DeleteForeverOutlinedIcon className="text-red-800 cursor-pointer active:scale-95" />
          </button>
        </div>
      </div>
    </div>
  );
}
