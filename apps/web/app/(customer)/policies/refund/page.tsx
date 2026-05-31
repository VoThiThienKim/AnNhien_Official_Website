import { AppShell } from "../../../../components/app-shell";
import { PolicyArticle } from "../../../../components/policy-article";

export default function RefundPolicyPage() {
  return (
    <AppShell>
      <PolicyArticle
        eyebrow="Chính sách"
        title="Đổi trả & hoàn tiền"
        sections={[
          {
            title: "Trường hợp hỗ trợ",
            body: "An Nhiên hỗ trợ khi món bị thiếu, giao nhầm, lỗi chất lượng rõ ràng hoặc đơn bị hủy do quán không thể phục vụ."
          },
          {
            title: "Thời gian phản hồi",
            body: "Khách nên liên hệ trong vòng 30 phút sau khi nhận món và gửi hình ảnh nếu có lỗi chất lượng hoặc sai món."
          },
          {
            title: "Phương thức hoàn tiền",
            body: "COD được xử lý theo thỏa thuận với nhân viên. Thanh toán online được hoàn qua kênh thanh toán gốc sau khi webhook/provider xác nhận."
          },
          {
            title: "Không áp dụng",
            body: "Không hỗ trợ đổi trả với món đã dùng quá nhiều, thông tin giao hàng do khách nhập sai hoặc yêu cầu thay đổi khẩu vị sau khi bếp đã chuẩn bị."
          }
        ]}
      />
    </AppShell>
  );
}

