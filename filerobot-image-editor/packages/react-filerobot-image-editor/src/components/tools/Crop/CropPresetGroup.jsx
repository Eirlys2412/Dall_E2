/** Thư viện Bên Ngoại */
import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@scaleflex/ui/core/accordion';

/** Thư viện Bên Trong */
import toPrecisedFloat from 'utils/toPrecisedFloat';
import { useStore } from 'hooks';
import CropPresetItem from './CropPresetItem';

/**
 * Component CropPresetGroup
 * 
 * Component này đại diện cho một nhóm các tùy chọn cắt trước trong ứng dụng chỉnh sửa đồ họa.
 * Nó chứa một danh sách các tùy chọn cắt trước và có thể mở rộng hoặc thu gọn.
 * 
 * @param {Object} props - Các thuộc tính được chuyển đến component.
 * @param {string} props.groupTitleKey - Khóa để lấy tiêu đề của nhóm từ nguồn dữ liệu ngôn ngữ.
 * @param {Array} props.items - Một mảng các tùy chọn cắt trước trong nhóm.
 * @param {function} props.onItemSelect - Hàm gọi lại được gọi khi một tùy chọn cắt trước được chọn.
 * @param {function} props.t - Hàm dịch ngôn ngữ.
 * @param {boolean} props.isExpanded - Một giá trị boolean cho biết liệu nhóm được mở rộng hay không.
 * @param {function} props.setExpandedGroup - Hàm gọi lại để cập nhật trạng thái mở rộng của nhóm.
 * 
 * @returns {JSX.Element} - Element CropPresetGroup đã được render.
 */
const CropPresetGroup = ({
  groupTitleKey,
  items,
  onItemSelect,
  t,
  isExpanded,
  setExpandedGroup,
}) => {
  const {
    adjustments: {
      crop: { ratio: currentRatio, ratioGroupKey, ratioTitleKey },
    },
  } = useStore();

  // Hàm xử lý thay đổi trạng thái mở rộng của nhóm
  const toggleExpand = () => {
    setExpandedGroup(isExpanded ? null : groupTitleKey);
  };

  // Hàm xử lý khi một tùy chọn cắt trước trong nhóm được chọn
  const onItemSelectFromGroup = (e, newRatio, cropProps) => {
    onItemSelect(e, newRatio, {
      ...cropProps,
      ratioGroupKey: groupTitleKey,
    });
  };

  return (
    <Accordion
      label={t(groupTitleKey)}
      onChange={toggleExpand}
      expanded={isExpanded}
    >
      {items.map(
        ({
          titleKey,
          ratio,
          width,
          height,
          descriptionKey,
          icon,
          disableManualResize,
        }) => {
          const newRatio = ratio ?? toPrecisedFloat(width / height);

          return (
            <CropPresetItem
              key={titleKey}
              titleKey={titleKey}
              t={t}
              description={t(descriptionKey)}
              size="sm"
              onClick={onItemSelectFromGroup}
              width={width}
              height={height}
              ratio={newRatio}
              Icon={icon}
              disableManualResize={disableManualResize}
              isActive={
                currentRatio === newRatio &&
                ratioTitleKey === titleKey &&
                ratioGroupKey === groupTitleKey
              }
            />
          );
        },
      )}
    </Accordion>
  );
};

/**
 * PropTypes cho CropPresetGroup component.
 * 
 * @type {Object}
 * @property {string} groupTitleKey - Giá trị bắt buộc cho khóa tiêu đề của nhóm.
 * @property {Array} items - Giá trị bắt buộc cho một mảng các tùy chọn cắt trước trong nhóm.
 * @property {function} onItemSelect - Giá trị bắt buộc cho hàm xử lý khi một tùy chọn cắt trước được chọn.
 * @property {function} t - Giá trị bắt buộc cho hàm dịch ngôn ngữ.
 * @property {boolean} isExpanded - Giá trị boolean cho biết liệu nhóm được mở rộng hay không.
 * @property {function} setExpandedGroup - Giá trị bắt buộc cho hàm xử lý cập nhật trạng thái mở rộng của nhóm.
 */
CropPresetGroup.propTypes = {
  groupTitleKey: PropTypes.string.isRequired,
  items: PropTypes.instanceOf(Array).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  setExpandedGroup: PropTypes.func.isRequired,
};

export default CropPresetGroup;
