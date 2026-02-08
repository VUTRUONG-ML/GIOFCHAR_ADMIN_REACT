import { formatMoney } from "../../utils/formatMoney";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

export function VariantCard({ variant, onDelete, onUpdate }) {
  function getLabelDiscount(type, value) {
    if (type === "FIXED") return formatMoney(value);
    return `${value}%`;
  }
  const isInactive = !variant.isActive;
  return (
    <div
      className={`
        rounded-xl p-4 shadow-sm border
        ${
          isInactive
            ? "bg-gray-100 border-gray-200 opacity-80"
            : "bg-white border-gray-100"
        }
      `}
    >
      {/* Status badge */}
      {isInactive && (
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full
          bg-gray-500 text-white mb-2 inline-block"
        >
          Ngừng bán
        </span>
      )}

      {/* Top */}
      <div className="flex justify-between items-start mt-1">
        <p className="font-semibold text-secondary">
          {variant.weight_gram}g / phần
        </p>

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
          <p
            className={`text-sm line-through
            ${isInactive ? "text-gray-400" : "text-gray-400"}`}
          >
            {formatMoney(variant.originalPrice)}
          </p>
        )}
        <p
          className={`text-lg font-bold
            ${isInactive ? "text-gray-500" : "text-primary"}`}
        >
          {formatMoney(variant.price)}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-3 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Kho: <span className="font-semibold">{variant.stock} phần</span>
        </div>

        <div className="flex gap-2">
          {/* Update */}
          <button
            onClick={() => onUpdate(variant)}
            className="disabled:opacity-40"
          >
            <AppRegistrationOutlinedIcon className="text-blue-800 cursor-pointer active:scale-95" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(variant.variantId)}
            disabled={!variant.isActive}
            className="disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <DeleteForeverOutlinedIcon className="text-red-800 cursor-pointer active:scale-95" />
          </button>
        </div>
      </div>
    </div>
  );
}
