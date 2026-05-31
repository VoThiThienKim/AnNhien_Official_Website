import { AppShell } from "../../../../components/app-shell";
import { PolicyArticle } from "../../../../components/policy-article";

export default function PrivacyPolicyPage() {
  return (
    <AppShell>
      <PolicyArticle
        eyebrow="Chính sách"
        title="Bảo mật thông tin"
        sections={[
          {
            title: "Thông tin thu thập",
            body: "An Nhiên thu thập tên, số điện thoại, email, địa chỉ giao hàng, lịch sử đơn hàng, lịch đặt bàn và ghi chú do khách cung cấp để xử lý dịch vụ."
          },
          {
            title: "Mục đích sử dụng",
            body: "Thông tin được dùng để xác nhận đơn, giao hàng, giữ bàn, gửi thông báo trạng thái, hỗ trợ khiếu nại và cải thiện trải nghiệm đặt món."
          },
          {
            title: "Bảo vệ dữ liệu",
            body: "Dữ liệu nhạy cảm và khóa tích hợp không được hardcode trong frontend. Tài khoản nhân viên cần phân quyền, và mọi truy cập admin phải được ghi nhận ở các giai đoạn sau."
          },
          {
            title: "Chia sẻ bên thứ ba",
            body: "Thông tin cần thiết có thể được gửi cho đơn vị thanh toán, giao hàng, bản đồ hoặc email/SMS để hoàn tất dịch vụ, theo đúng mục đích vận hành."
          }
        ]}
      />
    </AppShell>
  );
}

