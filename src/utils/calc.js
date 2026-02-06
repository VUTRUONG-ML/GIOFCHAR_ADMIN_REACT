export function calcFinalPrice(originalPrice, promotion) {
  if (!promotion) return originalPrice;

  if (promotion.type === "FIXED") {
    return Math.max(0, originalPrice - promotion.value);
  }

  if (promotion.type === "PERCENT") {
    return Math.max(0, Math.round(originalPrice * (1 - promotion.value / 100)));
  }

  return originalPrice;
}
