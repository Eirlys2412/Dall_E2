// Chuẩn bị các biến và phần tử DOM
const generateForm = document.querySelector(".generate-form"); // Form để nhập thông tin từ người dùng
const generateBtn = generateForm.querySelector(".generate-btn"); // Nút "Generate"
const imageGallery = document.querySelector(".image-gallery"); // Hiển thị hình ảnh được tạo ra
const OPENAI_API_KEY = "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"; // Khóa API OpenAI (cần được thay thế)
let isImageGenerating = false; // Biến kiểm soát trạng thái quá trình tạo hình ảnh

// Hàm cập nhật thông tin của thẻ hình ảnh
const updateImageCard = (imgDataArray) => {
  imgDataArray.forEach((imgObject, index) => {
    const imgCard = imageGallery.querySelectorAll(".img-card")[index];
    const imgElement = imgCard.querySelector("img");
    const downloadBtn = imgCard.querySelector(".download-btn");

    // Đặt nguồn hình ảnh là dữ liệu hình ảnh được tạo ra bởi AI
    const aiGeneratedImage = `data:image/jpeg;base64,${imgObject.b64_json}`;
    imgElement.src = aiGeneratedImage;

    // Khi hình ảnh được tải, loại bỏ trạng thái loading và đặt thuộc tính download
    imgElement.onload = () => {
      imgCard.classList.remove("loading");
      downloadBtn.setAttribute("href", aiGeneratedImage);
      downloadBtn.setAttribute("download", `${new Date().getTime()}.jpg`);
    }
  });
}

// Hàm tạo hình ảnh AI
const generateAiImages = async (userPrompt, userImgQuantity) => {
  try {
    // Gửi yêu cầu đến API OpenAI để tạo hình ảnh dựa trên đầu vào của người dùng
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: userPrompt,
        n: userImgQuantity,
        size: "512x512",
        response_format: "b64_json"
      }),
    });

    // Ném một thông báo lỗi nếu phản hồi từ API không thành công
    if (!response.ok) throw new Error("Failed to generate AI images. Make sure your API key is valid.");

    const { data } = await response.json(); // Lấy dữ liệu từ phản hồi
    updateImageCard([...data]);
  } catch (error) {
    alert(error.message);
  } finally {
    generateBtn.removeAttribute("disabled");
    generateBtn.innerText = "Generate";
    isImageGenerating = false;
  }
}

// Bộ lắng nghe sự kiện cho form
generateForm.addEventListener("submit", handleImageGeneration);

// Hàm xử lý sự kiện khi người dùng gửi form
const handleImageGeneration = (e) => {
  e.preventDefault();
  if (isImageGenerating) return;

  // Lấy giá trị đầu vào từ người dùng và số lượng hình ảnh cần tạo
  const userPrompt = e.srcElement[0].value;
  const userImgQuantity = parseInt(e.srcElement[1].value);

  // Vô hiệu hóa nút "Generate", cập nhật văn bản và đặt cờ
  generateBtn.setAttribute("disabled", true);
  generateBtn.innerText = "Generating";
  isImageGenerating = true;

  // Tạo HTML cho thẻ hình ảnh với trạng thái loading
  const imgCardMarkup = Array.from({ length: userImgQuantity }, () =>
    `<div class="img-card loading">
      <img src="images/loader.svg" alt="AI generated image">
      <a class="download-btn" href="#">
        <img src="images/download.svg" alt="download icon">
      </a>
    </div>`
  ).join("");

  imageGallery.innerHTML = imgCardMarkup;
  generateAiImages(userPrompt, userImgQuantity);
}
