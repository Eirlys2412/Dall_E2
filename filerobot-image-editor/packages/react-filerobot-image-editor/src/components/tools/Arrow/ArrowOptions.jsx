/** Thư viện Bên Ngoại */
import React from 'react';
import PropTypes from 'prop-types';

/** Thư viện Bên Trong */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';

/**
 * Component ArrowOptions
 * 
 * Component này đại diện cho các tùy chọn của công cụ mũi tên trong ứng dụng chỉnh sửa đồ họa.
 * Sử dụng hook `useAnnotation` để quản lý thông tin chú thích về công cụ mũi tên.
 * 
 * @param {Object} props - Các thuộc tính được chuyển đến component.
 * @param {function} props.t - Hàm dịch ngôn ngữ cho đa ngôn ngữ.
 * 
 * @returns {JSX.Element} - Element ArrowOptions đã được render.
 */
const ArrowOptions = ({ t }) => {
  // Sử dụng hook useAnnotation để quản lý thông tin chú thích của công cụ mũi tên
  const [arrow, saveArrow] = useAnnotation({
    name: TOOLS_IDS.ARROW,
  });

  return (
    <AnnotationOptions
      className="FIE_arrow-tool-options"
      annotation={arrow}
      updateAnnotation={saveArrow}
      t={t}
      hidePositionField
      hideFillOption
    />
  );
};

/**
 * PropTypes cho ArrowOptions component.
 * 
 * @type {Object}
 * @property {function} t - Hàm dịch ngôn ngữ cho đa ngôn ngữ (bắt buộc).
 */
ArrowOptions.propTypes = {
  t: PropTypes.func.isRequired,
};

export default ArrowOptions;
