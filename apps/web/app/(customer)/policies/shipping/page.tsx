import { AppShell } from "../../../../components/app-shell";
import { PolicyArticle } from "../../../../components/policy-article";

export default function ShippingPolicyPage() {
  return (
    <AppShell>
      <PolicyArticle
        eyebrow="Chính sách"
        title="Giao hàng"
        sections={[
          {
            title: "Phạm vi giao",
            body: "Beta hỗ trợ giao trong bán kính 10km. Đơn dưới 2km ưu tiên shop giao; đơn xa hơn dùng adapter Ahamove hoặc GrabExpress."
          },
          {
            title: "Cách tính phí",
            body: "Phí giao hiển thị là giá API đối tác cộng 2.000 VND dự phòng. Đơn từ 500.000 VND được freeship theo cấu hình beta."
          },
          {
            title: "Thời gian dự kiến",
            body: "Thời gian giao phụ thuộc khoảng cách, thời tiết và tình trạng tài xế. Nhân viên sẽ xác nhận nếu đơn cần thêm thời gian chuẩn bị."
          },
          {
            title: "Địa chỉ không hợp lệ",
            body: "Nếu địa chỉ thiếu thông tin hoặc nằm ngoài phạm vi giao, hệ thống sẽ yêu cầu khách cập nhật trước khi thanh toán."
          }
        ]}
      />
    </AppShell>
  );
}

