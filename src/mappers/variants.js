export function mapVariants(variant) {
  return {
    variantId: variant.variantId,
    originalPrice: variant.originalPrice,
    price:
      variant.typePromotion === "PERCENT"
        ? ((100 - variant.valuePromotion) / 100) * variant.originalPrice
        : variant.typePromotion === "FIXED"
          ? Math.max(variant.originalPrice - variant.valuePromotion, 0)
          : variant.originalPrice,
    promotionType: variant.typePromotion,
    promotionValue: variant.valuePromotion,
    stock: variant.inStock,
    weight_gram: variant.weight_gram,
    isActive: variant.isActive,
    promotionId: variant.promotionId,
  };
}
