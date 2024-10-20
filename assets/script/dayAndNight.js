const switchButton = document.getElementById("switch");
const bodyElement = document.querySelector("body");
const dashboard = document.querySelector(".dashboard");
const btn = document.querySelectorAll(".btn");
switchButton.addEventListener("click", function () {
  const fullpage = document.querySelector(".fullpage");
  if (fullpage.classList.contains("night")) {
    fullpage.classList.remove("night");
    switchButton.classList.remove("switched");
    bodyElement.style.backgroundImage = "";
    dashboard.style.backgroundColor = "";
    btn.forEach((button) => {
      button.style.color = "#666";
    });
  } else {
    fullpage.classList.add("night");
    switchButton.classList.add("switched");
    bodyElement.style.backgroundImage = "linear-gradient(90deg, #222, #333)";
    dashboard.style.backgroundColor = "";
    btn.forEach((button) => {
      button.style.color = "white";
    });
  }
});
