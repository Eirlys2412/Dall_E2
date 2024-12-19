/** Thư viện Bên Ngoại */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@scaleflex/ui/core/menu-item';

/** Thư viện Bên Trong */
import { useStore } from 'hooks';
import CropPresetGroup from './CropPresetGroup';

/**
 * Component CropPresetGroupsFolder
 * 
 * Component này đại diện cho một nhóm các tùy chọn cắt trước được sắp xếp trong một thư mục trong ứng dụng chỉnh sửa đồ họa.
 * 
 * @param {Object} props - Các thuộc tính được chuyển đến component.
 * @param {string} props.titleKey - Khóa để lấy tiêu đề của thư mục từ nguồn dữ liệu ngôn ngữ.
 * @param {Array} props.groups - Một mảng các nhóm tùy chọn cắt trước trong thư mục.
 * @param {function} props.onItemSelect - Hàm gọi lại được gọi khi một tùy chọn cắt trước được chọn từ thư mục.
 * @param {Object} props.prefixIconDimensions - Kích thước của biểu tượng tiền tố.
 * @param {function} props.t - Hàm dịch ngôn ngữ.
 * @param {function|undefined|string|HTMLElement} props.Icon - Biểu tượng của thư mục. 
 * Nếu là một chuỗi, nó sẽ được sử dụng như là một đoạn mã HTML. Nếu là một phần tử React, nó sẽ được hiển thị.
 * 
 * @returns {JSX.Element} - Element CropPresetGroupsFolder đã được render.
 */
const CropPresetGroupsFolder = ({
  titleKey,
  Icon,
  groups,
  onItemSelect,
  prefixIconDimensions,
  t,
}) => {
  const {
    adjustments: {
      crop: { ratioFolderKey, ratioGroupKey },
    },
  } = useStore();
  const [expandedGroup, setExpandedGroup] = useState('');

  // Hàm xử lý khi một tùy chọn cắt trước trong thư mục được chọn
  const onItemSelectFromFolder = (e, newRatio, cropProps) => {
    onItemSelect(e, newRatio, {
      ...cropProps,
      ratioFolderKey: titleKey,
    });
  };

  return (
    <MenuItem
      size="sm"
      list={[
        {
          content: t(titleKey),
          key: titleKey,
          active: titleKey === ratioFolderKey,
          prefix:
            Icon &&
            (typeof Icon === 'string' ? ( // eslint-disable-next-line react/no-danger
              <span dangerouslySetInnerHTML={{ __html: Icon }} />
            ) : (
              <Icon {...prefixIconDimensions} />
            )),
          subList: groups.map(({ titleKey: groupTitleKey, items }) => ({
            content: (
              <CropPresetGroup
                groupTitleKey={groupTitleKey}
                setExpandedGroup={setExpandedGroup}
                isExpanded={
                  expandedGroup === ''
                    ? ratioGroupKey === groupTitleKey
                    : expandedGroup === groupTitleKey
                }
                t={t}
                items={items}
                onItemSelect={onItemSelectFromFolder}
              />
            ),
            key: groupTitleKey,
            disableHover: true,
          })),
        },
      ]}
    />
  );
};

/**
 * PropTypes cho CropPresetGroupsFolder component.
 * 
 * @type {Object}
 * @property {string} titleKey - Giá trị bắt buộc cho khóa tiêu đề của thư mục.
 * @property {Array} groups - Giá trị bắt buộc cho một mảng các nhóm tùy chọn cắt trước trong thư mục.
 * @property {function} onItemSelect - Giá trị bắt buộc cho hàm xử lý khi một tùy chọn cắt trước được chọn từ thư mục.
 * @property {Object} prefixIconDimensions - Giá trị bắt buộc cho kích thước của biểu tượng tiền tố.
 * @property {function|undefined|string|HTMLElement} Icon - Giá trị tùy chọn cho biểu tượng thư mục. 
 * Nếu là một chuỗi, nó sẽ được sử dụng như là một đoạn mã HTML. Nếu là một phần tử React, nó sẽ được hiển thị.
 */
CropPresetGroupsFolder.propTypes = {
  titleKey: PropTypes.string.isRequired,
  groups: PropTypes.instanceOf(Array).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  prefixIconDimensions: PropTypes.instanceOf(Object).isRequired,
  Icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement),
  ]),
};

export default CropPresetGroupsFolder;
