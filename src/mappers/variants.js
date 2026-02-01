export function mapVariants(variant) {
  return {
    variantId: variant.variantId,
    originalPrice: variant.originalPrice,
    price:
      variant.typePromotion === "PERCENT"
        ? ((100 - variant.valuePromotion) / 100) * variant.originalPrice
        : variant.typePromotion === "FIXED"
          ? variant.originalPrice - variant.valuePromotion
          : variant.originalPrice,
    promotionType: variant.typePromotion,
    promotionValue: variant.valuePromotion,
    stock: variant.inStock,
    weight_gram: variant.weight_gram,
  };
}
