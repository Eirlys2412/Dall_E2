<?php
// Bước 1: Đặt tên thư mục lưu trữ ảnh
$saveDirectory = 'image';

// Bước 2: Quét thư mục để lấy danh sách các tệp
$files = scandir($saveDirectory);

// Bước 3: Loại bỏ "." và ".." khỏi danh sách tệp
$files = array_diff($files, array('.', '..'));

// Bước 4: Thiết lập tiêu đề HTTP để chỉ định định dạng dữ liệu là JSON
header('Content-Type: application/json');

// Bước 5: Trả về danh sách các tệp ảnh dưới dạng JSON
echo json_encode($files);
?>