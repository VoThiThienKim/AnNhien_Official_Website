export const restaurantInfo = {
  name: "An Nhiên",
  tagline: "Nhà hàng chay - Vegan Cuisine",
  address: "123 Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1, TP.HCM",
  addressNote: "Địa chỉ beta, thay bằng địa chỉ chính thức khi khách hàng xác nhận.",
  phone: "0900 000 000",
  email: "hello@annhien.vn",
  hours: "08:00 - 21:00 hằng ngày",
  deliveryRadius: "Giao trong bán kính 10km",
  facebookUrl: "https://www.facebook.com/",
  zaloUrl: "https://zalo.me/",
  mapsQuery: "An Nhien Vegan Cuisine 123 Nguyen Thi Minh Khai District 1 Ho Chi Minh City"
};

export function googleMapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurantInfo.mapsQuery)}`;
}

export function googleMapsEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(restaurantInfo.mapsQuery)}&output=embed`;
}

