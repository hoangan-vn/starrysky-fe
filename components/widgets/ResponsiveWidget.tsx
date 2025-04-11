import React from 'react';

// Định nghĩa type cho props
type ResponsiveWidgetProps = {
  isMobile?: string;
  isTablet?: string;
  isLaptop?: string;
  isDesktop?: string;
  children: React.ReactNode;
};

export default function ResponsiveWidget({ isMobile, isTablet, isLaptop, isDesktop, children }: ResponsiveWidgetProps) {
  // Hàm để thêm class responsive vào children
  const addResponsiveClasses = (child: React.ReactNode) => {
    // Nếu child không phải là React element, trả về nguyên bản
    if (!React.isValidElement(child)) {
      return child;
    }

    // Đảm bảo child là ReactElement và có props
    const element = child as React.ReactElement<{ className?: string }>;

    // Lấy className hiện tại của child (nếu có), mặc định là chuỗi rỗng
    const existingClassName = element.props.className || '';

    // Tạo các class responsive dựa trên props
    const responsiveClasses = [
      isMobile ? `${isMobile}` : '', // Áp dụng cho tất cả (base)
      isTablet ? `sm:${isTablet}` : '', // Áp dụng từ sm trở lên
      isLaptop ? `md:${isLaptop}` : '', // Áp dụng từ md trở lên
      isDesktop ? `lg:${isDesktop}` : '' // Áp dụng từ lg trở lên
    ]
      .filter(Boolean) // Loại bỏ các giá trị rỗng
      .join(' '); // Kết hợp thành chuỗi

    // Kết hợp className hiện tại với các class responsive
    const newClassName = `${existingClassName} ${responsiveClasses}`.trim();

    // Clone element và thêm className mới
    return React.cloneElement(element, {
      className: newClassName
    });
  };

  // Xử lý children
  return <>{React.Children.map(children, addResponsiveClasses)}</>;
}
