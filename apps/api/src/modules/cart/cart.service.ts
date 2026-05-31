import { BUSINESS_RULES, type CartSummary, VI_MESSAGES } from "@an-nhien/shared";
import { HttpError } from "../../http";
import { carts, menuItems } from "../../data/store";

export function getCart(cartId: string): CartSummary {
  const items = carts.get(cartId) ?? [];
  const lines = items.map((cartItem) => {
    const menuItem = menuItems.find((item) => item.id === cartItem.itemId);

    if (!menuItem) {
      throw new HttpError(404, VI_MESSAGES.notFound);
    }

    const isAvailable = menuItem.isActive && menuItem.stockStatus === "in_stock";

    return {
      ...cartItem,
      menuItem,
      lineTotal: cartItem.quantity * menuItem.price,
      isAvailable
    };
  });

  return {
    id: cartId,
    lines,
    subtotal: lines.reduce((total, line) => total + line.lineTotal, 0),
    unavailableItemIds: lines.filter((line) => !line.isAvailable).map((line) => line.itemId)
  };
}

export function addCartItem(cartId: string, itemId: string, quantity: number, note?: string) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);

  if (!item || !item.isActive) {
    throw new HttpError(404, VI_MESSAGES.notFound);
  }

  if (item.stockStatus === "out_of_stock") {
    throw new HttpError(409, VI_MESSAGES.outOfStock);
  }

  const items = carts.get(cartId) ?? [];
  const existing = items.find((cartItem) => cartItem.itemId === itemId && cartItem.note === note);

  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ itemId, quantity, note });
  }

  carts.set(cartId, items);
  return getCart(cartId);
}

export function updateCartItem(cartId: string, itemId: string, quantity: number) {
  const items = carts.get(cartId) ?? [];
  const nextItems = quantity <= 0 ? items.filter((item) => item.itemId !== itemId) : items;
  const existing = nextItems.find((item) => item.itemId === itemId);

  if (existing) {
    existing.quantity = quantity;
  }

  carts.set(cartId, nextItems);
  return getCart(cartId);
}

export function assertCartCheckoutReady(cartId: string) {
  const cart = getCart(cartId);

  if (cart.lines.length === 0) {
    throw new HttpError(400, "Giỏ hàng đang trống.");
  }

  if (cart.unavailableItemIds.length > 0) {
    throw new HttpError(409, VI_MESSAGES.outOfStock, { itemIds: cart.unavailableItemIds });
  }

  return cart;
}

export function isFreeShippingSubtotal(subtotal: number) {
  return subtotal >= BUSINESS_RULES.freeShippingSubtotal;
}

