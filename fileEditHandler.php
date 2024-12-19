<?php
// Bước 1: Lấy thông tin từ biểu mẫu POST
$imageFile = $_FILES['imageFile']; // Lấy thông tin của tệp hình ảnh từ biểu mẫu
$imageName = $_POST['imageName']; // Lấy tên hình ảnh từ biểu mẫu

// Bước 2: Đọc nội dung của tệp hình ảnh và lưu vào biến $editedImage
$editedImage = file_get_contents($imageFile['tmp_name']);

// Bước 3: Ghi nội dung đã chỉnh sửa vào một tệp mới có tên được xác định bởi $imageName
file_put_contents($imageName, $editedImage);

// Bước 4: (Tùy chọn) Nếu muốn di chuyển tệp hình ảnh đã chỉnh sửa đến một thư mục khác, sử dụng hàm move_uploaded_file
// move_uploaded_file($imageFile['tmp_name'], 'image-name-to.ext');

// Bước 5: Trả về kết quả dưới dạng JSON để sử dụng trong mã JavaScript
echo json_encode(['msg' => 'done']);
