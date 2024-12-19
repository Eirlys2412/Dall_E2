<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Image Generator HTML CSS and JavaScript | CodingNepal</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>

<body>
  <section class="image-generator">
    <div class="content">
      <h1>AI Image Generator Tool JavaScript</h1>
      <p>Convert your text into an image within a second using this
        JavaScript-powered AI Image Generator tool.</p>
      <form action="#" class="generate-form">
        <input class="prompt-input" type="text" placeholder="Describe what you want to see" required>
        <div class="controls">
          <select class="img-quantity">
            <option value="1">1 Image</option>
            <option value="2">2 Images</option>
            <option value="3">3 Images</option>
            <option value="4" selected>4 Images</option>
          </select>
          <button type="submit" class="generate-btn">Generate</button>
        </div>
      </form>
    </div>
  </section>
  <section class="image-gallery">
    <div class="img-card"><img src="images/img-1.jpg" alt="image"></div>
    <div class="img-card"><img src="images/img-2.jpg" alt="image"></div>
    <div class="img-card"><img src="images/img-3.jpg" alt="image"></div>
    <div class="img-card"><img src="images/img-4.jpg" alt="image"></div>
  </section>
  <a href="admin.php"><button>Chỉnh sửa</button></a>
  <button class="save-all-btn">Lưu Tất Cả</button>

  <script src="./filerobot-image-editor/filerobot-image-editor.min.js"></script>
  <script src="./index.js"></script>
  <script src="./script.js"></script>
</body>

</html>