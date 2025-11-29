export function formatMoney(money) {
  const formattedCurrency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number(money));
  return formattedCurrency;
}
