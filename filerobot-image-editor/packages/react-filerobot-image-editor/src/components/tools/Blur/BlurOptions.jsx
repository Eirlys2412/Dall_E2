/** Thư viện Bên Ngoại */
import React from 'react';
import Konva from 'konva';

/** Thư viện Bên Trong */
import { useFinetune } from 'hooks';
import restrictNumber from 'utils/restrictNumber';
import Slider from 'components/common/Slider';

// Giá trị tối thiểu cho radius và giá trị mặc định của filter
const MIN_VALUE = 0;
const DEFAULT_VALUE = {
  blurRadius: MIN_VALUE,
};
const MAX_VALUE = 100;
const sliderStyle = { width: 150, padding: 0 };

/**
 * Component BlurOptions
 * 
 * Component này đại diện cho tùy chọn của công cụ làm mờ trong ứng dụng chỉnh sửa đồ họa.
 * Sử dụng hook useFinetune để quản lý các thuộc tính của filter Blur.
 * 
 * @returns {JSX.Element} - Element BlurOptions đã được render.
 */
const BlurOptions = () => {
  // Sử dụng hook useFinetune để quản lý các thuộc tính của filter Blur
  const [finetuneProps, setFinetuneProps] = useFinetune(
    Konva.Filters.Blur,
    DEFAULT_VALUE,
  );

  // Hàm xử lý khi giá trị slider thay đổi
  const changeValue = (value) => {
    // Giới hạn giá trị của radius trong khoảng từ MIN_VALUE đến MAX_VALUE
    setFinetuneProps({
      blurRadius: restrictNumber(value, MIN_VALUE, MAX_VALUE),
    });
  };

  return (
    <Slider
      className="FIE_blur-option"
      min={MIN_VALUE}
      max={MAX_VALUE}
      value={finetuneProps.blurRadius ?? DEFAULT_VALUE.blurRadius}
      onChange={changeValue}
      style={sliderStyle}
    />
  );
};

export default BlurOptions;
