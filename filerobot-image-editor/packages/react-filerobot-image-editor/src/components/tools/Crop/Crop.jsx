/** Thư viện Bên Ngoại */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Crop as CropIcon } from '@scaleflex/icons/crop';

/** Thư viện Bên Trong */
import { useStore } from 'hooks';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';
import { StyledToolsBarItemButtonLabel } from 'components/ToolsBar/ToolsBar.styled';
import CropPresetsOption from './CropPresetsOption';

/**
 * Component Crop
 * 
 * Component này đại diện cho nút của công cụ cắt trong ứng dụng chỉnh sửa đồ họa.
 * Nó có thể được chọn hoặc hủy chọn dựa trên trạng thái của ứng dụng.
 * Nếu có tùy chọn cắt trước, nó sẽ hiển thị tùy chọn đó khi được chọn.
 * 
 * @param {Object} props - Các thuộc tính được chuyển đến component.
 * @param {function} props.selectTool - Hàm gọi lại để xử lý việc chọn công cụ cắt.
 * @param {boolean} [props.isSelected=false] - Một giá trị boolean cho biết liệu công cụ cắt đang được chọn hay không.
 * 
 * @returns {JSX.Element} - Element Crop đã được render.
 */
const Crop = ({ selectTool, isSelected }) => {
  const { config, t } = useStore();
  const [anchorEl, setAnchorEl] = useState();

  // Hàm xử lý việc chọn công cụ cắt và hiển thị tùy chọn cắt trước (nếu có)
  const selectToolAndShowPresets = (toolId, e) => {
    selectTool(toolId);
    setAnchorEl(e.currentTarget);
  };

  // Hàm đóng tùy chọn cắt trước
  const closeCropPresets = () => {
    setAnchorEl(null);
  };

  return (
    <ToolsBarItemButton
      className="FIE_crop-tool"
      id={TOOLS_IDS.CROP}
      Icon={CropIcon}
      onClick={selectToolAndShowPresets}
      isSelected={isSelected}
    >
      {!config[TOOLS_IDS.CROP].noPresets ? (
        <CropPresetsOption anchorEl={anchorEl} onClose={closeCropPresets} />
      ) : (
        <StyledToolsBarItemButtonLabel className="FIE_crop-tool-label">
          {t('cropTool')}
        </StyledToolsBarItemButtonLabel>
      )}
    </ToolsBarItemButton>
  );
};

/**
 * Giá trị mặc định cho Crop component.
 * 
 * @type {Object}
 * @property {boolean} isSelected - Giá trị mặc định cho thuộc tính isSelected.
 */
Crop.defaultProps = {
  isSelected: false,
};

/**
 * PropTypes cho Crop component.
 * 
 * @type {Object}
 * @property {function} selectTool - Hàm bắt buộc để xử lý việc chọn công cụ cắt.
 * @property {boolean} [isSelected] - Giá trị boolean tùy chọn cho biết liệu công cụ cắt đang được chọn hay không.
 */
Crop.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default Crop;
