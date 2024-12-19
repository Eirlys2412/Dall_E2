<?php
// Bước 1: Bao gồm tệp header.php để thêm nội dung của phần đầu trang
include 'inc/header.php';

// Bước 2: Kiểm tra phiên đăng nhập để đảm bảo rằng người dùng đã đăng nhập
Session::CheckLogin();

?>


<?php
// Bước 3: Xử lý đăng nhập khi form được subm
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['login'])) {
  // Bước 4: Gọi hàm xác thực đăng nhập từ đối tượng $users và nhận kết quả
  $userLog = $users->userLoginAuthotication($_POST);
}

// Bước 5: Kiểm tra và hiển thị thông báo đăng nhập (nếu có)
if (isset($userLog)) {
  echo $userLog;
}

// Bước 6: Kiểm tra và hiển thị thông báo đăng xuất (nếu có)
$logout = Session::get('logout');
if (isset($logout)) {
  echo $logout;
}
?>

<!-- Bước 7: Hiển thị form đăng nhập -->
<div class="card">
  <div class="card-header">
    <h3 class='text-center'><i class="fas fa-sign-in-alt mr-2"></i>User login</h3>
  </div>
  <div class="card-body">
    <div style="width:450px; margin:0px auto">
      <form class="" action="" method="post">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" name="email" class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" name="password" class="form-control">
        </div>
        <div class="form-group">
          <button type="submit" name="login" class="btn btn-success">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>

<?php
// Bước 8: Bao gồm tệp footer.php để thêm nội dung của phần chân trang
include 'inc/footer.php';
?>