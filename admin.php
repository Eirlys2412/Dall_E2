<?php
// Bước 1: Bao gồm tệp header.php để thêm nội dung của phần đầu trang
include 'inc/header.php';

// Bước 2: Kiểm tra phiên người dùng để đảm bảo rằng người dùng đã đăng nhập
Session::CheckSession();

// Bước 3: Lấy thông báo đăng nhập và thông báo thông báo từ phiên và hiển thị chúng nếu tồn tại
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

// Bước 4: Kiểm tra vai trò của người dùng
$userRole = Session::get("roleid");

// Bước 5: Kiểm tra xem vai trò người dùng có phải là quản trị viên hay không
?>
<?php if ($userRole == '1') : ?>
    <!-- Mã HTML cho tài khoản Admin -->
    <?php
    // Bước 6: Xử lý các hành động như xóa, vô hiệu hóa và kích hoạt người dùng
    if (isset($_GET['remove'])) {
        $remove = preg_replace('/[^a-zA-Z0-9-]/', '', (int)$_GET['remove']);
        $removeUser = $users->deleteUserById($remove);
    }

    if (isset($removeUser)) {
        echo $removeUser;
    }
    if (isset($_GET['deactive'])) {
        $deactive = preg_replace('/[^a-zA-Z0-9-]/', '', (int)$_GET['deactive']);
        $deactiveId = $users->userDeactiveByAdmin($deactive);
    }

    if (isset($deactiveId)) {
        echo $deactiveId;
    }
    if (isset($_GET['active'])) {
        $active = preg_replace('/[^a-zA-Z0-9-]/', '', (int)$_GET['active']);
        $activeId = $users->userActiveByAdmin($active);
    }

    if (isset($activeId)) {
        echo $activeId;
    }
    ?>

    <!-- Bước 7: Hiển thị danh sách người dùng cho quản trị viên -->
    <div class="card">
        <div class="card-header">
            <h3><i class="fas fa-users mr-2"></i>User list <span class="float-right">Welcome! <strong>
                        <span class="badge badge-lg badge-secondary text-white">
                            <?php
                            $username = Session::get('username');
                            if (isset($username)) {
                                echo $username;
                            }
                            ?></span>
                    </strong></span></h3>
        </div>
        <div class="card-body pr-2 pl-2">
            <!-- Bước 8: Hiển thị bảng danh sách người dùng -->
            <table id="example" class="table table-striped table-bordered" style="width:100%">
                <thead>
                    <tr>
                        <th class="text-center">SL</th>
                        <th class="text-center">Name</th>
                        <th class="text-center">Username</th>
                        <th class="text-center">Email address</th>
                        <th class="text-center">Mobile</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Created</th>
                        <th width='25%' class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    // Bước 9: Lấy danh sách tất cả người dùng và hiển thị thông tin chi tiết
                    $allUser = $users->selectAllUserData();

                    if ($allUser) {
                        $i = 0;
                        foreach ($allUser as  $value) {
                            $i++;
                    ?>
                            <tr class="text-center" <?php if (Session::get("id") == $value->id) {
                                                        echo "style='background:#d9edf7' ";
                                                    } ?>>
                                <td><?php echo $i; ?></td>
                                <td><?php echo $value->name; ?></td>
                                <td><?php echo $value->username; ?> <br>
                                    <?php if ($value->roleid  == '1') {
                                        echo "<span class='badge badge-lg badge-info text-white'>Admin</span>";
                                    } elseif ($value->roleid == '2') {
                                        echo "<span class='badge badge-lg badge-dark text-white'>Editor</span>";
                                    } elseif ($value->roleid == '3') {
                                        echo "<span class='badge badge-lg badge-dark text-white'>User Only</span>";
                                    } ?></td>
                                <td><?php echo $value->email; ?></td>
                                <td><span class="badge badge-lg badge-secondary text-white"><?php echo $value->mobile; ?></span></td>
                                <td>
                                    <?php if ($value->isActive == '0') { ?>
                                        <span class="badge badge-lg badge-info text-white">Active</span>
                                    <?php } else { ?>
                                        <span class="badge badge-lg badge-danger text-white">Deactive</span>
                                    <?php } ?>
                                </td>
                                <td><span class="badge badge-lg badge-secondary text-white"><?php echo $users->formatDate($value->created_at);  ?></span></td>
                                <td>
                                    <!-- Bước 10: Hiển thị các nút thao tác tùy thuộc vào vai trò và trạng thái của người dùng -->
                                    <?php if (Session::get("roleid") == '1') { ?>
                                        <a class="btn btn-success btn-sm" href="profile.php?id=<?php echo $value->id; ?>">View</a>
                                        <a class="btn btn-info btn-sm" href="profile.php?id=<?php echo $value->id; ?>">Edit</a>
                                        <a onclick="return confirm('Are you sure To Delete ?')" class="btn btn-danger
                            <?php if (Session::get("id") == $value->id) {
                                echo "disabled";
                            } ?>
                             btn-sm " href="?remove=<?php echo $value->id; ?>">Remove</a>
                                        <?php if ($value->isActive == '0') {  ?>
                                            <a onclick="return confirm('Are you sure To Deactive ?')" class="btn btn-warning
                            <?php if (Session::get("id") == $value->id) {
                                echo "disabled";
                            } ?>
                                btn-sm " href="?deactive=<?php echo $value->id; ?>">Disable</a>
                                        <?php } elseif ($value->isActive == '1') { ?>
                                            <a onclick="return confirm('Are you sure To Active ?')" class="btn btn-secondary
                            <?php if (Session::get("id") == $value->id) {
                                echo "disabled";
                            } ?>
                                btn-sm " href="?active=<?php echo $value->id; ?>">Active</a>
                                        <?php } ?>
                                    <?php } elseif (Session::get("id") == $value->id  && Session::get("roleid") == '2') { ?>
                                        <a class="btn btn-success btn-sm" href="profile.php?id=<?php echo $value->id; ?>">View</a>
                                        <a class="btn btn-info btn-sm" href="profile.php?id=<?php echo $value->id; ?>">Edit</a>
                                    <?php } elseif (Session::get("roleid") == '2') { ?>
                                        <a class="btn btn-success btn-sm
                          <?php if ($value->roleid == '1') {
                                            echo "disabled";
                                        } ?>
                          " href="profile.php?id=<?php echo $value->id; ?>">View</a>
                                        <a class="btn btn-info btn-sm
                          <?php if ($value->roleid == '1') {
                                            echo "disabled";
                                        } ?>
                          " href="profile.php?id=<?php echo $value->id; ?>">Edit</a>
                                    <?php } elseif (Session::get("id") == $value->id  && Session::get("roleid") == '3') { ?>
                                        <a class="btn btn-success btn-sm" href="profile.php?id=<?php echo $value->id; ?>">View</a>
                                        <a class="btn btn-info btn-sm" href="profile.php?id=<?php echo $value->id; ?>">Edit</a>
                                    <?php } else { ?>
                                        <a class="btn btn-success btn-sm
                          <?php if ($value->roleid == '1') {
                                            echo "disabled";
                                        } ?>
                          " href="profile.php?id=<?php echo $value->id; ?>">View</a>
                                    <?php } ?>
                                </td>
                            </tr>
                    <?php } } else { ?>
                            <tr class="text-center">
                                <td>No user available now !</td>
                            </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </div>

<?php elseif ($userRole == '3') : ?>
    <!-- Mã HTML cho tài khoản Editor -->
    <h1>Ảnh của bạn</h1>
    <?php 

    # database connection file
	include 'db.conn.php';

	# fetching images
	$sql  = "SELECT img_name FROM
	         images ORDER BY id DESC";

	$stmt = $conn->prepare($sql);
	$stmt->execute();

	$images = $stmt->fetchAll();

 ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Multi Image Upload</title>
	<style>
		body {
			display: flex;
			align-items: center;
			flex-direction: column;
			font-family: 'Roboto',sans-serif;
		}
		.error {
			color: #a00;
		}
		.gallery img{
            width: 127px;
		}
	</style>
</head>
<body>
	<form method="post" 
	      action="upload.php"
	      enctype="multipart/form-data">

	    <?php  
            if (isset($_GET['error'])) {
            	echo "<p class='error'>";
            	    echo htmlspecialchars($_GET['error']);
            	echo "</p>";
            }
	    ?>

		<input type="file"
		       name="images[]"
		       multiple>

		<button type="submit"
		        name="upload">
		    Upload</button>
	</form>
</body>
</html>
    <div id="images-container" style="width: 100%; margin-bottom: 50px; display: flex; flex-wrap:wrap;">
        <?php
        foreach (scandir('./uploads') as $dir) {
            if ($dir == "." || $dir == "..") {
                continue;
            } ?>
            <div class="image-to-edit" style="width: 15%; margin-right: 10px; margin-bottom: 15px">
                <img src="./uploads/<?php echo $dir ?>" alt="img" style="width: 100%;">
                <?php echo $dir ?>
            </div>
        <?php    } ?>
    </div>
    <div class="image-list"></div>
    <script src="./filerobot-image-editor/filerobot-image-editor.min.js"></script>
    <script src="./index.js"></script>
    <script src="./script.js"></script>
  

<?php else : ?>
    <!-- Mã HTML cho tài khoản User khác -->
    <p>Welcome, <?php echo Session::get('username'); ?>!</p>
    <!-- Các nội dung khác cho tài khoản User -->
    <!-- ... -->

<?php endif; ?>

<?php
// Bước 11: Bao gồm tệp footer.php để thêm nội dung của phần chân trang
include 'inc/footer.php';
?>
