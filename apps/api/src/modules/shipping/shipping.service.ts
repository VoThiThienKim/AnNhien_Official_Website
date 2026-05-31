import { BUSINESS_RULES, type ShippingOption } from "@an-nhien/shared";

export function estimateShipping(distanceKm: number, subtotal: number): ShippingOption {
  if (distanceKm <= 2) {
    return {
      provider: "shop",
      label: "Nhân viên An Nhiên giao",
      distanceKm,
      baseFee: 0,
      bufferFee: 0,
      totalFee: 0,
      etaMinutes: 20
    };
  }

  const ahamoveBase = Math.round(18000 + distanceKm * 5500);
  const grabBase = Math.round(20000 + distanceKm * 5000);
  const provider = ahamoveBase <= grabBase ? "ahamove" : "grabexpress";
  const baseFee = Math.min(ahamoveBase, grabBase);
  const totalFee =
    subtotal >= BUSINESS_RULES.freeShippingSubtotal ? 0 : baseFee + BUSINESS_RULES.shippingBufferFee;

  return {
    provider,
    label: provider === "ahamove" ? "Ahamove" : "GrabExpress",
    distanceKm,
    baseFee,
    bufferFee: totalFee === 0 ? 0 : BUSINESS_RULES.shippingBufferFee,
    totalFee,
    etaMinutes: Math.round(25 + distanceKm * 4)
  };
}

