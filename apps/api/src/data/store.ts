import type {
  Booking,
  CartItem,
  Category,
  LoyaltyAccount,
  MenuItem,
  Order,
  User,
  Voucher
} from "@an-nhien/shared";

export const categories: Category[] = [
  { id: "cat-rice", name: "Cơm & món chính", slug: "com-mon-chinh", sortOrder: 1, isActive: true },
  { id: "cat-noodle", name: "Bún, mì & phở", slug: "bun-mi-pho", sortOrder: 2, isActive: true },
  { id: "cat-drink", name: "Nước ép & trà", slug: "nuoc-ep-tra", sortOrder: 3, isActive: true }
];

export const menuItems: MenuItem[] = [
  {
    id: "item-lotus-rice",
    categoryId: "cat-rice",
    name: "Cơm sen An Nhiên",
    description: "Cơm gạo lứt, hạt sen, nấm và rau củ theo mùa.",
    price: 89000,
    images: ["/menu/Com_Sen_An_Nhien.png"],
    isActive: true,
    stockStatus: "in_stock",
    tags: ["signature", "healthy"]
  },
  {
    id: "item-mushroom-noodle",
    categoryId: "cat-noodle",
    name: "Bún nấm thanh vị",
    description: "Nước dùng rau củ, nấm tươi, đậu hũ non và rau thơm.",
    price: 79000,
    images: ["/menu/Bun_Nam_An_Nhien.png"],
    isActive: true,
    stockStatus: "in_stock",
    tags: ["fresh"]
  },
  {
    id: "item-green-curry",
    categoryId: "cat-rice",
    name: "Cà ri xanh rau củ",
    description: "Cốt dừa nhẹ, rau củ non, nấm và đậu hũ áp chảo.",
    price: 99000,
    images: ["/menu/Ca_Ri_Xanh_Rau_Cu.png"],
    isActive: true,
    stockStatus: "in_stock",
    tags: ["warm"]
  },
  {
    id: "item-fresh-roll",
    categoryId: "cat-rice",
    name: "Gỏi cuốn ngũ sắc",
    description: "Rau tươi, bún gạo, nấm, đậu hũ và sốt mè rang.",
    price: 69000,
    images: ["/menu/Goi_Cuon_Ngu_Sac.png"],
    isActive: true,
    stockStatus: "in_stock",
    tags: ["light"]
  },
  {
    id: "item-lotus-salad",
    categoryId: "cat-rice",
    name: "Gỏi sen nấm giòn",
    description: "Ngó sen, rau thơm, nấm chiên nhẹ và nước trộn chua ngọt.",
    price: 85000,
    images: ["/menu/Goi_Sen_Nam_Gion.png"],
    isActive: true,
    stockStatus: "in_stock",
    tags: ["signature"]
  },
  {
    id: "item-seared-tofu",
    categoryId: "cat-rice",
    name: "Đậu hũ áp chảo sốt mè",
    description: "Đậu hũ áp chảo, rau xanh, dưa góp và sốt mè gừng.",
    price: 82000,
    images: ["/menu/Dau_Hu_Ap_Chao_Sot_Me.png"],
    isActive: true,
    stockStatus: "in_stock",
    tags: ["protein"]
  },
  {
    id: "item-mushroom-hotpot",
    categoryId: "cat-noodle",
    name: "Lẩu nấm chay",
    description: "Nước dùng rau củ, nấm tươi, rau xanh, đậu hũ và bún gạo.",
    price: 189000,
    images: ["/menu/Lau_Nam_Chay.png"],
    isActive: true,
    stockStatus: "in_stock",
    tags: ["group"]
  },
  {
    id: "item-herbal-tea",
    categoryId: "cat-drink",
    name: "Trà thảo mộc ấm",
    description: "Trà sen, táo đỏ và thảo mộc nhẹ hương.",
    price: 39000,
    images: ["/menu/Tra_Thao_Moc_Am.png"],
    isActive: true,
    stockStatus: "in_stock",
    tags: ["drink"]
  }
];

export const vouchers: Voucher[] = [
  {
    id: "voucher-fresh20",
    code: "FRESH20",
    name: "Fresh welcome",
    type: "fixed",
    value: 20000,
    minOrder: 200000,
    startAt: "2026-01-01T00:00:00.000Z",
    endAt: "2026-12-31T23:59:59.000Z",
    totalQty: 1000,
    usedQty: 0,
    isActive: true
  },
  {
    id: "voucher-green10",
    code: "GREEN10",
    name: "Green day",
    type: "percent",
    value: 10,
    maxDiscount: 50000,
    minOrder: 200000,
    startAt: "2026-01-01T00:00:00.000Z",
    endAt: "2026-12-31T23:59:59.000Z",
    totalQty: 500,
    usedQty: 0,
    isActive: true
  }
];

export const users: User[] = [
  {
    id: "user-demo",
    phone: "0900000000",
    email: "demo@annhien.vn",
    name: "Khách Demo",
    role: "customer",
    createdAt: new Date().toISOString()
  }
];

export const carts = new Map<string, CartItem[]>();
export const orders: Order[] = [];
export const bookings: Booking[] = [];
export const loyaltyAccounts = new Map<string, LoyaltyAccount>();

export function nextId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
