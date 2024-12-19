/** Thư viện Bên Ngoại */
import React from 'react';
import PropTypes from 'prop-types';
import { ArrowTool as ArrowIcon } from '@scaleflex/icons/arrow-tool';

/** Thư viện Bên Trong */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

/**
 * Component ArrowButton
 * 
 * Component này đại diện cho nút của công cụ mũi tên trong ứng dụng chỉnh sửa đồ họa.
 * Nó hiển thị biểu tượng mũi tên và có thể được chọn hoặc hủy chọn dựa trên trạng thái của ứng dụng.
 * 
 * @param {Object} props - Các thuộc tính được chuyển đến component.
 * @param {function} props.selectTool - Hàm gọi lại để xử lý việc chọn công cụ mũi tên.
 * @param {boolean} [props.isSelected=false] - Một giá trị boolean cho biết liệu công cụ mũi tên đang được chọn hay không.
 * @param {function} props.t - Hàm dịch ngôn ngữ cho đa ngôn ngữ.
 * 
 * @returns {JSX.Element} - Element ArrowButton đã được render.
 */
const ArrowButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_arrow-tool-button"
    id={TOOLS_IDS.ARROW}
    label={t('arrowTool')}
    Icon={ArrowIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

/**
 * Giá trị mặc định cho ArrowButton component.
 * 
 * @type {Object}
 * @property {boolean} isSelected - Giá trị mặc định cho thuộc tính isSelected.
 */
ArrowButton.defaultProps = {
  isSelected: false,
};

/**
 * PropTypes cho ArrowButton component.
 * 
 * @type {Object}
 * @property {function} selectTool - Hàm bắt buộc để xử lý việc chọn công cụ mũi tên.
 * @property {boolean} [isSelected] - Giá trị boolean tùy chọn cho biết liệu công cụ mũi tên đang được chọn hay không.
 * @property {function} t - Hàm dịch ngôn ngữ cho đa ngôn ngữ.
 */
ArrowButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default ArrowButton;
