<?php

if (isset($_POST['upload'])) {

    # Tệp kết nối cơ sở dữ liệu
    include 'db.conn.php';

    $images = $_FILES['images'];

    # Số lượng hình ảnh
    $num_of_imgs = count($images['name']);

    for ($i = 0; $i < $num_of_imgs; $i++) {

        # Lấy thông tin hình ảnh và lưu chúng vào biến
        $image_name = $images['name'][$i];
        $tmp_name = $images['tmp_name'][$i];
        $error = $images['error'][$i];

        # Nếu không có lỗi xảy ra khi tải lên
        if ($error === 0) {

            # Lấy phần mở rộng của hình ảnh và lưu vào biến
            $img_ex = pathinfo($image_name, PATHINFO_EXTENSION);

            /** 
             * Chuyển đổi phần mở rộng hình ảnh thành chữ thường 
             * và lưu vào biến
             **/
            $img_ex_lc = strtolower($img_ex);

            /** 
             * Tạo mảng chứa các phần mở rộng hình ảnh
             * được phép tải lên.
             **/
            $allowed_exs = array('jpg', 'jpeg', 'png');

            /** 
             * Kiểm tra xem phần mở rộng hình ảnh
             * có tồn tại trong mảng $allowed_exs không
             **/

            if (in_array($img_ex_lc, $allowed_exs)) {
                /** 
                 * Đổi tên hình ảnh với 
                 * chuỗi ngẫu nhiên
                 **/
                $new_img_name = uniqid('IMG-', true) . '.' . $img_ex_lc;

                # Tạo đường dẫn tải lên trên thư mục gốc
                $img_upload_path = 'uploads/' . $new_img_name;

                # Chèn tên hình ảnh vào cơ sở dữ liệu

                $sql = "INSERT INTO images (img_name)
                         VALUES (?)";
                $stmt = $conn->prepare($sql);
                $stmt->execute([$new_img_name]);

                # Di chuyển hình ảnh đã tải lên vào thư mục 'uploads'
                move_uploaded_file($tmp_name, $img_upload_path);

                # Chuyển hướng đến 'admin.php'
                header("Location: admin.php");

            } else {
                # Thông báo lỗi
                $em = "You can't upload files of this type";

                /*
                 * Chuyển hướng đến 'admin.php' và 
                 * truyền thông báo lỗi
                 */
                header("Location: admin.php?error=$em");
            }
        } else {
            # Thông báo lỗi
            $em = "Unknown Error Occurred while uploading";

            /*
             * Chuyển hướng đến 'admin.php' và 
             * truyền thông báo lỗi
             */
            header("Location: admin.php?error=$em");
        }
    }
}
?>