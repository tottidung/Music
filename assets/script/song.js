// 1. Render song ---> Done
// 2. Scroll top  ---> Done
// 3. Play, Pause, Seek ---> Done
// 4. CD rotate
// 5. Next / pre
// 6. Random
// 7. Next / Repeat when end
// 8. Active song
// 9 .Scroll active song into view
// 10.Play song when click
// 11 and more... Add some features

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const nameSong = $(".status p");
const cdThumb = $(".cd-thumb");
const backgroundOverlay = $(".background-overlay");
const audio = $("#audio");
const currentTimeDisplay = $(".current-time");
const totalTimeDisplay = $(".total-time");
const cd = $(".cd");
const backCd = $(".back-cd");
const playBtn = $(".control-play");
const progress = $(".progress");
const board = $(".dashboard");
const skipAudio = 10;
const prevSong = $(".control-preplay");
const nextSong = $(".control-nextplay");
const randomBtn = $(".control-random");
const repeatBtn = $(".control-repeat");
const playList = $(".list");
const songList = $$(".playlist");
const fullpage = $(".fullpage");
const songActive = $$(".song.active");
var currentPlaylist = null;

const gradients = [
  "linear-gradient(90deg, #ff7e5f, #feb47b)",
  "linear-gradient(90deg, #00c6ff, #0072ff)",
  "linear-gradient(90deg, #f857a6, #ff5858)",
  "linear-gradient(90deg, #4facfe, #2BCBFE)",
  "linear-gradient(90deg, #3Cf2B0, #38f9d7)",
  "linear-gradient(90deg, #FCA86E, #fee140)",
  "linear-gradient(90deg, #30cfd0, #330867)",
  "linear-gradient(90deg, #B35848, #8F726D)",
  "linear-gradient(90deg, #863E42, #C17675)",
  "linear-gradient(90deg, #BCB6AC, #5B4231)",
  "linear-gradient(90deg, #817E81, #737375)",
  "linear-gradient(90deg, #333343, #2E2E43)",
  "linear-gradient(90deg, #7986A6, #6C768D)",
  "linear-gradient(90deg, #403C38, #645A4E)",
  "linear-gradient(90deg, #6A6598, #84A68E)",
  "linear-gradient(90deg, #4A4D67, #62649F)",
  "linear-gradient(90deg, #B7382F, #85564A)",
];
// Xử lý CD quay/dừng
// const cdThumbAnimation = cdThumb.animate(
//   [{ transform: "rotate(0deg) " }, { transform: "rotate(360deg)" }],
//   { duration: 10000, iterations: Infinity }
// );
// cdThumbAnimation.pause();

const app = {
  currentIndex: 0,
  isUserInteracted: false,
  isRandom: false,
  isRepeat: false,
  isClick: false,
  songs: [
    {
      name: "Tam Bái Hồng Trần Lương",
      singer: "Doãn Tích Miên",
      path: "./assets/audio/song1.mp3",
      image: "./assets/image/song1.jpg",
    },
    {
      name: "Mang Chủng",
      singer: "Âm Khuyết Thi Thính",
      path: "./assets/audio/song2.mp3",
      image: "./assets/image/song2.jpg",
    },
    {
      name: "Hải Thị Thận Lâu",
      singer: "Hứa Lam Tân",
      path: "./assets/audio/song3.mp3",
      image: "./assets/image/song3.jpg",
    },
    {
      name: "Ta Mượn Hồng Trần 2 Lạng Rượu",
      singer: "Nam Chiêu",
      path: "./assets/audio/song4.mp3",
      image: "./assets/image/song4.jpg",
    },
    {
      name: "Thương Ly Biệt",
      singer: "Ngụy Tân Vũ",
      path: "./assets/audio/song5.mp3",
      image: "./assets/image/song5.jpg",
    },
    {
      name: "Yến Vô Hiết",
      singer: "Tương Tuyết Nhi",
      path: "./assets/audio/song6.mp3",
      image: "./assets/image/song6.jpg",
    },
    {
      name: "Phong, Hoa, Tuyết, Nguyệt",
      singer: "Tử Đường Túc",
      path: "./assets/audio/song7.mp3",
      image: "./assets/image/song7.jpg",
    },
    {
      name: "Rất Muốn Vẫn Còn Nhỏ",
      singer: "Đậu Bao",
      path: "./assets/audio/song8.mp3",
      image: "./assets/image/song8.jpg",
    },
    {
      name: "Phương Xa",
      singer: "Hồng Bố Điều",
      path: "./assets/audio/song9.mp3",
      image: "./assets/image/song9.jpg",
    },
    {
      name: "Yêu Tiền Yêu Bản Thân ",
      singer: "Hoàng Tĩnh Mỹ",
      path: "./assets/audio/song10.mp3",
      image: "./assets/image/song10.jpg",
    },
  ],

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
    Object.defineProperty(this, "isPlaying", {
      get: function () {
        return this.audio.paused;
      },
      set: function (value) {
        if (value) {
          this.audio.pause();
        } else {
          this.audio.play();
        }
      },
    });
  },
  render: function () {
    // Tạo HTML từ danh sách bài hát
    const htmls = this.songs.map((song, index) => {
      return `<div class="playlist ${
        index == this.currentIndex ? "active" : ""
      } " data-index= "${index}">
                <div class="song  ">
                    <div class="thumb"
                        style="background-image : url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            </div>`;
    });

    // Cập nhật nội dung HTML cho phần tử có lớp 'list'
    playList.innerHTML = htmls.join("");
  },
  playAudio: function () {
    audio
      .play()
      .then(() => {
        console.log("Audio is playing");
      })
      .catch((error) => {
        console.error("Playback failed:", error);
      });
  },
  //Cuộn trang tạo hiệu ứng sticky
  stickyScroll: function () {
    const g_this = this;
    //Khi thành Sticky thì thêm ảnh bìa
    window.addEventListener("scroll", function () {
      const stickyFix = $(".dashboard");
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const triggerPoint = 100;

      if (scrollTop > triggerPoint) {
        stickyFix.classList.add("sticky");
        if (g_this.currentSong) {
          // Đảm bảo currentSong tồn tại
          board.style.backgroundImage = `url('${g_this.currentSong.image}')`;
        }
      } else {
        stickyFix.classList.remove("sticky");
        board.style.backgroundImage = "";
      }
    });
  },
  eventKeyboard: function () {
    //Thực hiện skip audio
    document.addEventListener("keydown", function (event) {
      // Hành động gõ phím Space tự pause radio
      if (event.code === "Space") {
        event.preventDefault(); // Ngăn chặn hành động mặc định của phím Space (như cuộn trang)
        if (playBtn.classList.contains("play")) {
          audio.play();
          backCd.style.backgroundImage =
            "url('	https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif') ";
          playBtn.classList.remove("play");
          playBtn.classList.add("pause");

          // cdThumbAnimation.play();
        }
        // Khi bấm nút pause
        else {
          audio.pause();
          playBtn.classList.remove("pause");
          playBtn.classList.add("play");

          // cdThumbAnimation.pause();
          backCd.style.backgroundImage = "url('') ";
        }
      }
      // Hàm skip
      function skipOver(skip) {
        audio.currentTime += skip;
        if (audio.currentTime < 0) {
          audio.currentTime = 0;
        }
        if (audio.currentTime > audio.duration) {
          audio.currentTime = audio.duration;
        }
      }
      //Gõ arrow tự động lùi / tua 10s
      if (event.code === "ArrowLeft") {
        skipOver(-skipAudio);
      } else if (event.code === "ArrowRight") {
        skipOver(skipAudio);
      }
    });
  },
  loadCurrentSong: function () {
    nameSong.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  handlEventScroll: function () {
    const cdWidth = cd.offsetWidth;
    const backCdHeight = backCd.offsetHeight;
    document.onscroll = function () {
      const scrollTop =
        Math.ceil(window.scrollY) || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      const newBackCdHeight = backCdHeight - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      backCd.style.height = newBackCdHeight > 0 ? newBackCdHeight + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
      backCd.style.opacity = newBackCdHeight / backCdHeight;
    };
  },
  handlEventClickBtn: function () {
    const _this = this;
    // Play / Pause
    playBtn.addEventListener("click", function () {
      // KHi bấm nút play
      if (playBtn.classList.contains("play")) {
        audio.play();
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        backCd.style.backgroundImage =
          "url('	https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif') ";
        // cdThumbAnimation.play();
      }
      // Khi bấm nút pause
      else {
        audio.pause();
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        backCd.style.backgroundImage = "url('') ";
        // cdThumbAnimation.pause();
      }
    });
    //Seek
    // Khi tiến độ bài hát thay đổi input thay theo
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime * 100) / audio.duration
        );
        progress.value = progressPercent;
      }
    };
    // Xử lý khi tua xong
    // Khi người dùng nhấp chuột vào thanh tiến trình để di chuyển đến thời gian cụ thể
    progress.addEventListener("click", function (e) {
      // Lấy ra vị trí progress trên thanh viewpoint
      const pointProgress = progress.getBoundingClientRect();
      // Tính độ dài của khoảng tiếp nối từ điểm trước đó đến điểm click
      const clickPosition = e.clientX - pointProgress.left;
      // Tính ra phần trăm vị trí nhấp chuột so với toàn bộ viewwpoint
      const perClickPosition = (clickPosition / pointProgress.width) * 100;
      //TÍnh ra vị trí và thay đổi theo cái thời gian nhấp chuột theo
      //perClickPosition  là chuyển phần trăm trên thanh viewpoint thành dạng second x.yz (1% thì sẽ tương ứng 2.16s với audio 216s)
      const seekTime = (perClickPosition / 100) * audio.duration;
      audio.currentTime = seekTime;
    });

    // Khi người dùng kéo thanh tiến trình
    progress.addEventListener("mousedown", function () {
      // Dừng âm nhạc khi người dùng kéo thanh tiến trình
      audio.pause();
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
    });
    // Khi người dùng thả chuột trên thanh tiến trình
    progress.addEventListener("mouseup", function () {
      // Tiếp tục phát âm nhạc sau khi thả chuột
      audio.play();
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
    });

    //Xử lý khi ấn vào playlist thì đổi màu nền

    function getRandomGradient() {
      const randomIndex = Math.floor(Math.random() * gradients.length);
      return gradients[randomIndex];
    }

    function changeGradientColor(event) {
      if (!fullpage.classList.contains("night")) {
        const clickedPlaylist = event.currentTarget;
        // if (currentPlaylist !== clickedPlaylist) {
        const newGradient = getRandomGradient();
        document.body.style.background = newGradient;
        currentPlaylist = clickedPlaylist;
        // }
      }
    }

    function addPlaylistEventListeners() {
      songList.forEach((item) => {
        item.addEventListener("click", changeGradientColor);
      });
    }

    function removePlaylistEventListeners() {
      songList.forEach((item) => {
        item.removeEventListener("click", changeGradientColor);
      });
    }

    // Gán sự kiện cho các playlist ban đầu
    addPlaylistEventListeners();

    // Theo dõi sự thay đổi lớp của phần tử .fullpage
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          if (fullpage.classList.contains("night")) {
            removePlaylistEventListeners();
          } else {
            addPlaylistEventListeners();
          }
        }
      });
    });

    // Bắt đầu quan sát đối tượng neue có thay đổi thì sẽ false
    observer.observe($(".fullpage"), { attributes: true });
    // Next / Previous
    prevSong.addEventListener("click", function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.isUserInteracted = true;
        _this.prevSong();
      }
      if (playBtn.classList.contains("play")) {
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        backCd.style.backgroundImage =
          "url('	https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif') ";
        // cdThumbAnimation.play();
      }
      _this.render();
      _this.scrollToActiveSong();
      if (songActive) {
        changeGradientColor({ currentTarget: songActive });
      }
      audio.play();
    });

    nextSong.addEventListener("click", function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.isUserInteracted = true;
        _this.nextSong();
      }
      if (playBtn.classList.contains("play")) {
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        backCd.style.backgroundImage =
          "url('	https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif') ";
        // cdThumbAnimation.play();
      }
      _this.render();
      _this.scrollToActiveSong();
      if (songActive) {
        changeGradientColor({ currentTarget: songActive });
      }
      audio.play();
    });
    // Xử lý khi mà ấn vào nút random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý khi ấn vào repeat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    // Xử lý khi audio ended sẽ chuyển bài / repeat
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextSong.click();
      }
    };

    //Xử lí khi ấn vào bài hát đổi bài + màu nền
    playList.onclick = function (e) {
      const songNode = e.target.closest(".playlist:not(.active)");
      if (songNode || e.target.closest(".option")) {
        //Xử lý khi click vào song
        if (songNode) {
          const newImage =
            songNode.querySelector(".thumb").style.backgroundImage;
          if (newImage) {
            cdThumb.style.backgroundImage = newImage;
            board.style.backgroundImage = newImage;
            currentSong = { image: newImage };
          }
          if (playBtn.classList.contains("play")) {
            playBtn.classList.remove("play");
            playBtn.classList.add("pause");
            backCd.style.backgroundImage =
              "url('	https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif') ";
            // cdThumbAnimation.play();
          }
          changeGradientColor({ currentTarget: songNode });
          _this.currentIndex = songNode.dataset.index;
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }
      }
    };
    // Chặn hành vi tự động bạt nhạc khi vào trang

    document.addEventListener("DOMContentLoaded", function () {
      audio.pause();
    });
    audio.addEventListener("canplaythrough", function () {
      if (_this.isUserInteracted) {
        _this.playAudio();
      }
    });
  },
  // số giờ pú ht / phút tổng
  timeDisplayAudio: function () {
    // Hàm để chuyển đổi giây thành định dạng phút:giây
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }

    // Cập nhật tổng thời gian khi metadata đã được tải
    audio.addEventListener("loadedmetadata", () => {
      totalTimeDisplay.textContent = formatTime(audio.duration);
    });

    // Cập nhật thời gian hiện tại khi âm thanh đang phát
    audio.addEventListener("timeupdate", () => {
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    audio.currentTime = 0;
    if (playBtn.classList.contains("play")) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      backCd.style.backgroundImage =
        "url('	https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif') ";
      // cdThumbAnimation.play();
    }
    audio.play();
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    audio.currentTime = 0;
    if (playBtn.classList.contains("play")) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      backCd.style.backgroundImage =
        "url('	https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif') ";
      // cdThumbAnimation.play();
    }
    audio.play();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      const activeElement = $(".playlist.active");
      const headerHeight = 260; // Chiều cao của thanh cố định

      const offsetTop =
        activeElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }, 200);
  },
  wave: function () {
    // Lấy phần tử canvas từ DOM
    const canvas = document.getElementById("waveCanvas");
    // Lấy đối tượng context 2D từ canvas để vẽ
    const canvasRender2d = canvas.getContext("2d");
    // Tạo một Web Audio API context
    var audioContext;
    document.addEventListener("click", () => {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log("started");
        // Tạo một AnalyserNode để phân tích dữ liệu âm thanh
        const analyser = audioContext.createAnalyser();
        // Tạo một MediaElementSourceNode từ phần tử audio
        const source = audioContext.createMediaElementSource(audio);
        // Kết nối nguồn âm thanh tới AnalyserNode
        source.connect(analyser);
        // Kết nối AnalyserNode tới đích (loại thường là thiết bị phát âm thanh)
        analyser.connect(audioContext.destination);
        // Thiết lập các thuộc tính của AnalyserNode
        analyser.fftSize = 32768; // Số lượng dữ liệu của sóng âm
        // Tính số lượng giá trị tần số sẽ được phân tích
        const bufferLength = analyser.frequencyBinCount;
        // Tạo một mảng Uint8Array để chứa dữ liệu thời gian của sóng âm
        const dataArray = new Uint8Array(bufferLength);
        // Hàm vẽ sóng âm
        function drawWave() {
          // Yêu cầu trình duyệt gọi lại hàm drawWave để vẽ lại khung tiếp theo
          requestAnimationFrame(drawWave);
          // Lấy dữ liệu thời gian của sóng âm
          analyser.getByteTimeDomainData(dataArray);
          // Xóa canvas để vẽ lại từ đầu
          canvasRender2d.clearRect(0, 0, canvas.width, canvas.height);
          // Thiết lập các thuộc tính của nét vẽ
          canvasRender2d.lineWidth = 2;
          canvasRender2d.strokeStyle = "#";
          canvasRender2d.beginPath();
          // Tính chiều rộng của mỗi đoạn sóng
          const sliceWidth = (canvas.width * 1.0) / (bufferLength / 2);
          let x = 0;
          // Vẽ từng đoạn sóng
          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            // Chuyển đổi giá trị dữ liệu để phù hợp với chiều cao của canvas
            const y = (v * canvas.height) / 2;
            // Di chuyển hoặc vẽ đoạn sóng
            if (i === 0) {
              canvasRender2d.moveTo(x, y);
            } else {
              canvasRender2d.lineTo(x, y);
            }
            x += sliceWidth;
          }
          // Hoàn thành vẽ đoạn sóng
          canvasRender2d.lineTo(canvas.width, canvas.height / 2);
          // canvasRender2d.stroke();
          // Tính toán giá trị ảnh hưởng để làm cho cd-thumb giật giật mạnh hơn
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          const amplitude = Math.abs(average - 128); // Sử dụng giá trị tuyệt đối
          const scale = 1 + amplitude / 12; // Tăng cường độ giật
          const maxScale = 1.2; // Tỉ lệ tối đa là 200% kích thước gốc
          const minScale = 0.6; // Tỉ lệ tối thiểu là 60% kích thước gốc
          cdThumb.style.transform = `scale(${Math.max(
            minScale,
            Math.min(maxScale, scale)
          )})`;
        }

        audio.addEventListener("play", () => {
          drawWave();
        });
      }
    });
  },

  start: function () {
    // ĐỊnh nghĩa thuộc tính obj
    this.defineProperties();
    // Render data
    this.render();
    // cuoonj trang sticky
    this.stickyScroll();
    //Gõ phím space tự đọng dừng radio
    this.eventKeyboard();
    // xử lý hành vi cuộn trang
    this.handlEventScroll();
    // Hiển thị ảnh đầu tiên lên UI khi web chạy
    this.loadCurrentSong();
    // Lùi bài hát khi ấn prev
    this.prevSong();
    // Chạy bài hát kế tiếp khi ấn btn
    this.nextSong();
    // Xử lý nút bấm play/pause/seek khi chạy nhạc
    this.handlEventClickBtn();
    //Thay đổi thời gian time display
    this.timeDisplayAudio();
    //Hiệu ứng sóng âm đĩa giật
    this.wave();
  },
};
app.start();
