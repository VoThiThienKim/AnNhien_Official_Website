import { VI_MESSAGES, type MenuItem } from "@an-nhien/shared";
import { categories, menuItems, nextId } from "../../data/store";
import { HttpError } from "../../http";
import { emitRealtime } from "../../realtime";

export function listCategories() {
  return categories.filter((category) => category.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function listMenuItems(categoryId?: string) {
  return menuItems.filter((item) => item.isActive && (!categoryId || item.categoryId === categoryId));
}

export function createMenuItem(input: Omit<MenuItem, "id">) {
  const item: MenuItem = { ...input, id: nextId("item") };
  menuItems.push(item);
  return item;
}

export function updateStock(itemId: string, stockStatus: MenuItem["stockStatus"]) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);

  if (!item) {
    throw new HttpError(404, VI_MESSAGES.notFound);
  }

  item.stockStatus = stockStatus;
  emitRealtime("stock_updated", { itemId, stockStatus });

  if (stockStatus === "out_of_stock") {
    emitRealtime("cart_item_unavailable", { itemId });
  }

  return item;
}

