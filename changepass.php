<?php
// Bước 1: Bao gồm tệp header.php để thêm nội dung của phần đầu trang
include 'inc/header.php';

// Bước 2: Kiểm tra phiên người dùng để đảm bảo rằng người dùng đã đăng nhập
Session::CheckSession();

// Bước 3: Lấy thông báo đăng nhập và thông báo từ phiên và hiển thị chúng nếu tồn tại
$logMsg = Session::get('logMsg');
if (isset($logMsg)) {
    echo $logMsg;
}
$msg = Session::get('msg');
if (isset($msg)) {
    echo $msg;
}
Session::set("msg", NULL);
Session::set("logMsg", NULL);

// Bước 4: Lấy id người dùng từ tham số GET (nếu tồn tại)
if (isset($_GET['id'])) {
    $userid = (int) $_GET['id'];
}

// Bước 5: Kiểm tra nếu biểu mẫu đã được gửi đi và hàm changePasswordBysingelUserId được gọi để thay đổi mật khẩu
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['changepass'])) {
    $changePass = $users->changePasswordBysingelUserId($userid, $_POST);
}

// Bước 6: Hiển thị thông báo nếu có
if (isset($changePass)) {
    echo $changePass;
}
?>

<div class="card">
    <div class="card-header">
        <h3>Change your password <span class="float-right"> <a href="profile.php?id=<?php echo $userid; ?>"
                    class="btn btn-primary">Back</a> </span></h3>
    </div>
    <div class="card-body">
        <div style="width:600px; margin:0px auto">
            <form class="" action="" method="POST">
                <div class="form-group">
                    <label for="old_password">Old Password</label>
                    <input type="password" name="old_password" class="form-control">
                </div>
                <div class="form-group">
                    <label for="new_password">New Password</label>
                    <input type="password" name="new_password" class="form-control">
                </div>
                <div class="form-group">
                    <button type="submit" name="changepass" class="btn btn-success">Change password</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php
// Bước 7: Bao gồm tệp footer.php để thêm nội dung của phần chân trang
include 'inc/footer.php';
?>