function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  // Thiết lập kích thước ngẫu nhiên cho tuyết
  const size = Math.random() * 5 + 5;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;

  // Vị trí bắt đầu ngẫu nhiên
  snowflake.style.left = `${Math.random() * window.innerWidth}px`;
  // Thời gian và tốc độ rơi ngẫu nhiên
  const fallDuration = Math.random() * 3 + 2; // Rơi từ 2 đến 5 giây
  snowflake.style.transition = `top ${fallDuration}s linear, left ${fallDuration}s linear`;

  //Chỉnh màu tuyết ở chế độ ban đêm
  const fullpage = document.querySelector(".fullpage");
  if (fullpage.classList.contains("night")) {
    const opacity = Math.random() * 0.5 + 0.5; // Độ mờ từ 0.5 đến 1
    snowflake.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`; // Màu trắng với độ mờ ngẫu nhiên
  }
  document.querySelector(".snow-container").appendChild(snowflake);

  // Cho tuyết rơi xuống 1 cách ngẫu nhiên
  setTimeout(() => {
    const documentHeight = document.body.scrollHeight; // Chiều cao toàn bộ tài liệu
    snowflake.style.top = `${documentHeight}px`; // Rơi xuống cuối tài liệu
    // Thêm hiệu ứng xoay
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
  }, 0);

  // Loại bỏ tuyết sau khi rơi xong
  setTimeout(() => {
    snowflake.remove();
  }, fallDuration * 1000);
}

// Tạo nhiều hạt tuyết mỗi 100ms
setInterval(createSnowflake, 100);
