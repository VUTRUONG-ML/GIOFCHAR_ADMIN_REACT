import { VND } from "../constants/currency";

export function formatMoney(money) {
  const formattedCurrency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number(money));
  return formattedCurrency;
}

export function formatVNDShort(amount) {
  if (amount < 1000000) {
    return formatMoney(amount);
  }

  const million = amount / 1000000;
  const rounded = Math.floor(million * 10) / 10;

  return `${rounded}M ${VND}`;
}
