import type { Booking, MenuItem, Order } from "@an-nhien/shared";

export const featuredItems: MenuItem[] = [
  {
    id: "item-lotus-rice",
    categoryId: "cat-rice",
    name: "Cơm sen An Nhiên",
    description: "Gạo lứt, hạt sen, nấm và rau củ theo mùa.",
    price: 89000,
    images: ["/menu/Com_Sen_An_Nhien.png"],
    isActive: true,
    stockStatus: "in_stock",
    tags: ["signature"]
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

export const landingHighlights = [
  {
    title: "Tươi mỗi ngày",
    body: "Rau củ theo mùa, nước dùng rau củ và món ăn được chuẩn bị theo từng khung bếp."
  },
  {
    title: "Đặt món nhanh",
    body: "Menu rõ giá, giỏ hàng gọn, giao hàng trong bán kính 10km với phí minh bạch."
  },
  {
    title: "Đặt bàn an tâm",
    body: "Giữ chỗ theo số người, hỗ trợ nhóm gia đình và cọc online cho bàn lớn."
  }
];

export const testimonials = [
  {
    quote: "Không gian nhẹ, món ăn sạch vị và rất dễ đặt lại cho bữa trưa văn phòng.",
    name: "Minh Anh",
    meta: "Khách hàng thân thiết"
  },
  {
    quote: "Món chay có cảm giác hiện đại, không bị nặng dầu, phần giao đến vẫn đẹp.",
    name: "Hoàng Nam",
    meta: "Khách đặt online"
  },
  {
    quote: "Đặt bàn nhóm gia đình tiện, xác nhận nhanh và nhân viên chuẩn bị rất chu đáo.",
    name: "Chị Linh",
    meta: "Khách đặt bàn"
  }
];

export const demoOrders: Order[] = [
  {
    id: "order-demo-1",
    userId: "user-demo",
    customerName: "Minh Anh",
    customerPhone: "0900000000",
    address: "Quận 1, TP.HCM",
    status: "pending",
    subtotal: 247000,
    shippingFee: 34000,
    discount: 20000,
    total: 261000,
    paymentMethod: "cod",
    paymentStatus: "unpaid",
    items: [
      { itemId: "item-lotus-rice", quantity: 2, unitPrice: 89000 },
      { itemId: "item-herbal-tea", quantity: 1, unitPrice: 39000 }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const demoBookings: Booking[] = [
  {
    id: "booking-demo-1",
    userId: "user-demo",
    customerName: "Gia đình chị Linh",
    customerPhone: "0911111111",
    date: "2026-06-02",
    time: "18:30",
    seats: 8,
    depositAmount: 1200000,
    status: "pending",
    createdAt: new Date().toISOString()
  }
];
