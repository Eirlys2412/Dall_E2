/** Thư viện Bên Ngoại */
import React from 'react';
import PropTypes from 'prop-types';
import { Blur as BlurIcon } from '@scaleflex/icons/blur';

/** Thư viện Bên Trong */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

/**
 * Component Blur
 * 
 * Component này đại diện cho nút của công cụ làm mờ trong ứng dụng chỉnh sửa đồ họa.
 * Nó hiển thị biểu tượng làm mờ và có thể được chọn hoặc hủy chọn dựa trên trạng thái của ứng dụng.
 * 
 * @param {Object} props - Các thuộc tính được chuyển đến component.
 * @param {function} props.selectTool - Hàm gọi lại để xử lý việc chọn công cụ làm mờ.
 * @param {boolean} [props.isSelected=false] - Một giá trị boolean cho biết liệu công cụ làm mờ đang được chọn hay không.
 * @param {function} props.t - Hàm dịch ngôn ngữ cho đa ngôn ngữ.
 * 
 * @returns {JSX.Element} - Element Blur đã được render.
 */
const Blur = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_blur-tool-button"
    id={TOOLS_IDS.BLUR}
    label={t('blurTool')}
    Icon={BlurIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

/**
 * Giá trị mặc định cho Blur component.
 * 
 * @type {Object}
 * @property {boolean} isSelected - Giá trị mặc định cho thuộc tính isSelected.
 */
Blur.defaultProps = {
  isSelected: false,
};

/**
 * PropTypes cho Blur component.
 * 
 * @type {Object}
 * @property {function} selectTool - Hàm bắt buộc để xử lý việc chọn công cụ làm mờ.
 * @property {boolean} [isSelected] - Giá trị boolean tùy chọn cho biết liệu công cụ làm mờ đang được chọn hay không.
 * @property {function} t - Hàm dịch ngôn ngữ cho đa ngôn ngữ.
 */
Blur.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default Blur;
