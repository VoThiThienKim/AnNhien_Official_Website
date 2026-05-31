import { AppShell } from "../../../../components/app-shell";
import { PolicyArticle } from "../../../../components/policy-article";

export default function TermsPolicyPage() {
  return (
    <AppShell>
      <PolicyArticle
        eyebrow="Chính sách"
        title="Điều khoản sử dụng"
        sections={[
          {
            title: "Giờ nhận đơn",
            body: "Website chỉ nhận đơn từ 08:00 đến 21:00 hằng ngày. Ngoài khung giờ, nút thanh toán cần được vô hiệu hóa ở giai đoạn tích hợp hoàn chỉnh."
          },
          {
            title: "Hủy đơn",
            body: "Khách được tự hủy trong 5 phút nếu đơn còn ở trạng thái chờ xác nhận. Sau thời gian này, khách cần gọi hotline để được hỗ trợ."
          },
          {
            title: "Voucher",
            body: "Voucher không áp dụng chồng nhiều mã. Điều kiện tối thiểu tính theo subtotal món ăn, không bao gồm phí giao hàng."
          },
          {
            title: "Đặt bàn",
            body: "Nhóm trên 6 người cần thanh toán cọc 100% để giữ chỗ. Xác nhận giữ chỗ được gửi qua email hoặc kênh liên hệ đã cung cấp."
          }
        ]}
      />
    </AppShell>
  );
}

