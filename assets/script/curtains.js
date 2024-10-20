document.addEventListener("DOMContentLoaded", function () {
  const curtain = document.querySelector(".curtain");

  curtain.addEventListener("animationend", function () {
    curtain.style.display = "none"; // Ẩn rèm cửa sau khi hiệu ứng kết thúc
  });
});
