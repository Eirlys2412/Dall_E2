// Bước 1: Import thư viện FileSaver để tải xuống tệp
// Lưu ý: Bạn cần cài đặt thư viện này trước khi sử dụng
// https://www.npmjs.com/package/file-saver
const config = {
  cloudimage: {
    token: 'dabkfabvu' // Token của cloudimage (tùy thuộc vào cấu hình của bạn)
  }
};

// Bước 2: Xác định hàm onComplete được gọi khi quá trình chỉnh sửa hoàn thành
const onComplete = (url, file) => {
  console.log("the file url is: ", url); // In URL của tệp đã chỉnh sửa
  console.log("the main file: ", file); // In thông tin về tệp đã chỉnh sửa
}

// Bước 3: Xác định hàm onBeforeComplete được gọi trước khi quá trình chỉnh sửa hoàn thành
const onBeforeComplete = (props) => {
  let imageBase64 = props.canvas.toDataURL(); // Chuyển đổi canvas thành chuỗi base64
  console.log("props is: ", props);
  console.log("props is: ", props.canvas.toDataURL());
  console.log(base64ToBlob(imageBase64)); // Chuyển đổi base64 thành đối tượng Blob

  // Bước 4: Tạo đối tượng FormData để gửi dữ liệu đến server
  const formdata = new FormData();
  formdata.append('imageFile', base64ToBlob(imageBase64));
  formdata.append('imageName', './images/' + props.imageName);

  // Bước 5: Sử dụng fetch để gửi dữ liệu đến server thông qua fileEditHandler.php
  fetch('./fileEditHandler.php', {
    body: formdata,
    method: 'POST',
  }).then(res => res.json()).then(data => console.log(data));
}

// Bước 6: Lặp qua danh sách các ảnh để chỉnh sửa
let imagesToEdit = document.getElementsByClassName('image-to-edit')
for (let i = 0; i < imagesToEdit.length; i++) {
  const element = imagesToEdit[i];
  element.onclick = function () {
    let image = this.getElementsByTagName('img')[0];

    // Bước 7: Khởi tạo trình chỉnh sửa ảnh với FilerobotImageEditor
    const ImageEditor = new FilerobotImageEditor(config, {
      onComplete: onComplete,
      onBeforeComplete: onBeforeComplete,
      onClose: () => {
        ImageEditor.unmount(); // Hủy trình chỉnh sửa khi đóng nó
      }
    });

    // Bước 8: Mở trình chỉnh sửa với ảnh được chọn
    ImageEditor.open(image.src);
  }
}

// Bước 9: Định nghĩa hàm chuyển đổi base64 thành đối tượng Blob
const base64ToBlob = (base64) => {
  const bytes = atob(base64.split(',')[1]);
  const mime_type = base64.split(',')[0].split(';')[0].split(':')[1]
  const aB = new ArrayBuffer(bytes.length)
  const u8B = new Uint8Array(aB)
  for (let i = 0; i < bytes.length; i++) {
    u8B[i] = bytes.charCodeAt(i)
  }
  return new Blob([aB], { type: mime_type })
}
