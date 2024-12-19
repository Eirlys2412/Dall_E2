/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@scaleflex/ui/core/menu-item';

/** Internal Dependencies */
import { StyledMenuItemIcon, StyledRatioDescription } from './Crop.styled';

// Kích thước mặc định cho biểu tượng tiền tố
const PREFIX_ICONS_DIMENS = { height: 16, width: 16 };

/**
 * Component CropPresetItem
 * 
 * Component này đại diện cho một tùy chọn cắt trước trong một thư mục trong ứng dụng chỉnh sửa đồ họa.
 * 
 * @param {Object} props - Các thuộc tính được chuyển đến component.
 * @param {string} props.titleKey - Khóa để lấy tiêu đề của tùy chọn cắt trước từ nguồn dữ liệu ngôn ngữ.
 * @param {string} props.description - Mô tả của tùy chọn cắt trước.
 * @param {function} props.onClick - Hàm gọi lại được gọi khi tùy chọn cắt trước được chọn.
 * @param {Object|undefined} props.Icon - Biểu tượng của tùy chọn cắt trước. Nếu có, nó sẽ được hiển thị.
 * @param {boolean} props.isActive - Xác định xem tùy chọn cắt trước có đang hoạt động hay không.
 * @param {number|undefined} props.width - Chiều rộng của tùy chọn cắt trước.
 * @param {number|undefined} props.height - Chiều cao của tùy chọn cắt trước.
 * @param {function} props.t - Hàm dịch ngôn ngữ.
 * @param {boolean} props.disableManualResize - Xác định xem khả năng điều chỉnh thủ công có bị tắt hay không.
 * 
 * @returns {JSX.Element} - Element CropPresetItem đã được render.
 */
const CropPresetItem = ({
  titleKey,
  description,
  ratio,
  onClick,
  Icon,
  isActive,
  width,
  height,
  t,
  disableManualResize,
}) => {
  const handleOnClick = (e) =>
    onClick(e, ratio, {
      ratioTitleKey: titleKey,
      width,
      height,
      disableManualResize,
    });

  return (
    <MenuItem active={isActive} onClick={handleOnClick} size="sm">
      {Icon && (
        <StyledMenuItemIcon>
          {typeof Icon === 'string' ? (
            // eslint-disable-next-line react/no-danger
            <span dangerouslySetInnerHTML={{ __html: Icon }} />
          ) : (
            <Icon {...PREFIX_ICONS_DIMENS} />
          )}
        </StyledMenuItemIcon>
      )}
      {t(titleKey)}
      {description && (
        <StyledRatioDescription>{description}</StyledRatioDescription>
      )}
    </MenuItem>
  );
};

/**
 * PropTypes cho CropPresetItem component.
 * 
 * @type {Object}
 * @property {string} titleKey - Giá trị bắt buộc cho khóa tiêu đề của tùy chọn cắt trước.
 * @property {string} description - Giá trị bắt buộc cho mô tả của tùy chọn cắt trước.
 * @property {function} onClick - Giá trị bắt buộc cho hàm xử lý khi tùy chọn cắt trước được chọn.
 * @property {Object|undefined} Icon - Giá trị tùy chọn cho biểu tượng của tùy chọn cắt trước. Nếu có, nó sẽ được hiển thị.
 * @property {boolean} isActive - Giá trị bắt buộc cho xác định xem tùy chọn cắt trước có đang hoạt động hay không.
 * @property {number|undefined} width - Giá trị tùy chọn cho chiều rộng của tùy chọn cắt trước.
 * @property {number|undefined} height - Giá trị tùy chọn cho chiều cao của tùy chọn cắt trước.
 * @property {function} t - Giá trị bắt buộc cho hàm dịch ngôn ngữ.
 * @property {boolean} disableManualResize - Giá trị tùy chọn cho xác định xem khả năng điều chỉnh thủ công có bị tắt hay không.
 */
CropPresetItem.propTypes = {
  titleKey: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disableManualResize: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  Icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement),
  ]),
};

export default CropPresetItem;
