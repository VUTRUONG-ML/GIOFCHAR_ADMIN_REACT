import { formatMoney } from "./formatMoney";

export function getLabelDiscount(type, value) {
  if (!type) return null;
  if (type === "PERCENT") return `-${value}%`;
  if (type === "FIXED") return `-${formatMoney(value)}`;
  return null;
}
