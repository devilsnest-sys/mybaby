const pages = Array.from(document.querySelectorAll(".page"));
const dots = Array.from(document.querySelectorAll(".dot"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const yesBtn = document.getElementById("yesBtn");
const angryBtn = document.getElementById("angryBtn");
const responseBox = document.getElementById("responseBox");
const heartBurst = document.getElementById("heartBurst");
const memoryGallery = document.getElementById("memoryGallery");
const playlistContainer = document.getElementById("playlistContainer");
const loadingScreen = document.getElementById("loadingScreen");
const musicToggle = document.getElementById("musicToggle");
const softMusic = document.getElementById("softMusic");
const secretPull = document.getElementById("secretPull");
const secretNote = document.getElementById("secretNote");
const scratchCard = document.getElementById("scratchCard");
const moodResponse = document.getElementById("moodResponse");

let currentIndex = 0;
let angryClicks = 0;
let typingTimer;
let touchStartX = 0;
let touchStartY = 0;
let audioContext;
let musicNodes = [];

const apologyLines = [
  "Aww come on, don't be mean to me.",
  "Okay, fair. I probably deserve one more tiny glare.",
  "Still here. Still sorry. Still missing you.",
  "If this button runs away, it is only because it fears your anger."
];

const galleryItems = [
  { type: "image", src: "gallery/IMG_4085.HEIC", caption: "The one where you look effortlessly pretty and I look way too happy to be there." },
  { type: "image", src: "gallery/IMG_4086.HEIC", caption: "The one where your soft little pose steals the whole car photo." },
  { type: "image", src: "gallery/IMG_4087.HEIC", caption: "The one where your laugh becomes the whole memory." },
  { type: "image", src: "gallery/IMG_4121.JPG", caption: "The one where the mirror catches a kiss." },
  { type: "image", src: "gallery/IMG_4220.HEIC", caption: "The one where a i was a burgir bite" },
  { type: "image", src: "gallery/IMG_4246.HEIC", caption: "The one where your big smile makes the whole frame lighter." },
  { type: "image", src: "gallery/IMG_4252.HEIC", caption: "The one where the side mirror turns a road moment into a tiny movie scene." },
  { type: "image", src: "gallery/IMG_4253.HEIC", caption: "The one where two unserious faces explain us perfectly." },
  { type: "image", src: "gallery/IMG_4254.HEIC", caption: "The one where a tiny reflection still becomes one of my favorite kinds of us." },
  { type: "image", src: "gallery/IMG_4347.HEIC", caption: "The one where you pretend you are not amused by me." },
  { type: "image", src: "gallery/IMG_4386.HEIC", caption: "The one where you are looking at me like I am your favorite problem." },
  { type: "image", src: "gallery/IMG_4395.JPG", caption: "The one where our hands make a small memory feel sweet.", rotate: 90 },
  { type: "image", src: "gallery/IMG_4403.JPG", caption: "The one where we look cold but still cute enough to be annoying." },
  { type: "image", src: "gallery/IMG_4434.PNG", caption: "The one where another tiny hands-together moment counts.", rotate: 90 },
  { type: "image", src: "gallery/IMG_4561.HEIC", caption: "The one where a normal mall day becomes something I miss.", rotate: 90 },
  { type: "image", src: "gallery/IMG_4750.HEIC", caption: "The one where you are my favorite passenger.", rotate: 90 },
  { type: "image", src: "gallery/IMG_4756.HEIC", caption: "The one where we are goofy, happy, and completely ours.", rotate: 180 },
  { type: "image", src: "gallery/IMG_4757.HEIC", caption: "The one where an ordinary drive feels special because you are there.", rotate: 180 },
  { type: "image", src: "gallery/IMG_4897.HEIC", caption: "The one where your cheeky little face makes me melt." },
  { type: "image", src: "gallery/IMG_4910.HEIC", caption: "The one where you in pink become the softest part of the day." },
  { type: "image", src: "gallery/IMG_4915.HEIC", caption: "The one where you casually make the whole view prettier." },
  { type: "image", src: "gallery/IMG_4919.HEIC", caption: "The one where you look peaceful enough to stop time." },
  { type: "image", src: "gallery/IMG_4922.HEIC", caption: "The one where the background is lucky to have you in it." },
  { type: "image", src: "gallery/IMG_4924.HEIC", caption: "The one where your smile is the first place my heart looks." },
  { type: "video", src: "gallery/027086BE-8F1F-4888-B264-538598FD6090.mov", caption: "The one where a dark little video still feels warm because it has us." },
  { type: "video", src: "gallery/IMG_4748.MOV", caption: "The one where even a random car clip matters." },
  { type: "video", src: "gallery/IMG_4910.MP4", caption: "The one where that pink field day moves like a soft memory." },
  { type: "image", src: "gallery/94DF62F7-92DC-4CC4-A81A-5A12B62E171D.jpg", caption: "The one where a low-light selfie still feels cozy." },
  { type: "image", src: "gallery/CEAE0AAC-601A-4E28-8BBD-CE4FE1B87465.jpg", caption: "The one where your face makes the dark photo glow." },
  { type: "image", src: "gallery/IMG_3723.HEIC", caption: "The one where your serious face defeats my whole attitude." },
  { type: "image", src: "gallery/IMG_3726.HEIC", caption: "The one where the pout is dangerously adorable." }
];

const playlistItems = [
  {
    title: "you made my playlist amazing",
    description: "you made my playlist amazing",
    url: "https://www.youtube.com/watch?v=MHtHCpkf8Mg&list=RDMHtHCpkf8Mg&start_radio=1"
  },
  {
    title: "My sukoon",
    description: "My sukoon",
    url: "https://www.youtube.com/watch?v=aq3rBOmR6Pw&list=RDaq3rBOmR6Pw&start_radio=1"
  },
  {
    title: "मैं पागल दीवाना",
    description: "मैं आशिक़, मैं मजनू\nमैं रांझा, मैं सबकुछ तेरा\n\nतू जन्नत वखाएंगी\nरब नाल मिलायेंगी\nदिल मैनु कहंदा मेरा\n\nमैं सजदे करांगा\nइरादा नहीं सी\nरब ते यकीन मैनु\nज़्यादा नहीं सी\n\nतेरे नाल जुड़ाया मैं\nरब नाल जुड़ गया\nहो तेरा चेहरा जद्द\nमेरे वल्ल मुड़ गया",
    url: "https://www.youtube.com/watch?v=vg3tvzD5ymY&list=RDvg3tvzD5ymY&start_radio=1"
  },
  {
    title: "hehe really.. i saving for 10ct diamond atleast",
    description: "hehe really.. i saving for 10ct diamond atleast",
    url: "https://www.youtube.com/watch?v=8zdg-pDF10g&list=RD8zdg-pDF10g&start_radio=1"
  },
  {
    title: "dedicated to you",
    description: "dedicated to you",
    url: "https://www.youtube.com/watch?v=bJmj4FrGWBs&list=RDbJmj4FrGWBs&start_radio=1"
  },
  {
    title: "special one",
    description: "specially\nNi main tere piche\nAakhir tikar auna ae\nBhavein paeran de vich chubde\nSulaan pakhad ne\nMainu pata nahi si\nIshq tere diyan kadiyan ne\nNi hath per soniye\nAidan mere jakkadne\nNi main tere naalon\nTutt ke injh suk sadh jaana\nTuttde tahni naalon\nJiven soniye pattar ne",
    url: "https://www.youtube.com/watch?v=_7kgU0lyVhw&list=RD_7kgU0lyVhw&start_radio=1"
  },
  {
    title: "Teri gall hor ae sajna",
    description: "Teri gall hor ae sajna\nAssi taan tere pairaan warge aan",
    url: "https://www.youtube.com/watch?v=KCPDJ3YV6eU&list=RDKCPDJ3YV6eU&start_radio=1"
  },
  {
    title: "andddddd thisss",
    description: "andddddd thisss",
    url: "https://www.youtube.com/watch?v=oafxkMv4xnc&list=RDoafxkMv4xnc&start_radio=1"
  }
];

function resolveMediaSrc(src) {
  return src.toLowerCase().endsWith(".heic") ? src.replace(/\.heic$/i, ".jpg") : src;
}

function vibrate(pattern = 12) {
  if ("vibrate" in navigator) navigator.vibrate(pattern);
}

function renderGallery() {
  if (!memoryGallery) return;

  memoryGallery.innerHTML = galleryItems.map((item) => {
    const displaySrc = resolveMediaSrc(item.src);
    const mediaStyle = item.rotate ? ` style="--media-rotate: ${item.rotate}deg"` : "";
    const media = item.type === "video"
      ? `<video class="memory-video" src="${displaySrc}" controls preload="metadata"></video>`
      : `<img class="memory-photo" src="${displaySrc}" alt="a favorite memory" loading="lazy"${mediaStyle} />`;

    return `
      <article class="memory-card">
        <div class="photo-frame">
          ${media}
          <div class="memory-like">♥</div>
        </div>
        <div class="memory-caption">${item.caption}</div>
      </article>
    `;
  }).join("");

  memoryGallery.querySelectorAll(".memory-card").forEach((card) => {
    let lastTap = 0;
    card.addEventListener("pointerup", () => {
      const now = Date.now();
      if (now - lastTap < 320) {
        card.classList.remove("liked");
        void card.offsetWidth;
        card.classList.add("liked");
        vibrate([10, 20, 10]);
      }
      lastTap = now;
    });
  });
}

function renderPlaylist() {
  if (!playlistContainer) return;

  playlistContainer.innerHTML = playlistItems.map((song) => `
    <button class="playlist-card" type="button" data-url="${song.url}" data-title="${song.title}">
      <span class="play-icon">▶</span>
      <span>
        <span class="playlist-title">${song.title}</span>
        <span class="playlist-description">${song.description}</span>
      </span>
      <span class="equalizer" aria-hidden="true"><span></span><span></span><span></span></span>
    </button>
  `).join("");

  playlistContainer.querySelectorAll(".playlist-card").forEach((card) => {
    card.addEventListener("click", () => {
      vibrate();
      sendChoiceEmail("Playlist song selected", card.dataset.title);
      window.open(card.dataset.url, "_blank", "noopener,noreferrer");
    });
  });
}

function revealActivePage() {
  const activePage = pages[currentIndex];
  activePage.querySelectorAll(".reveal").forEach((element, index) => {
    element.classList.remove("visible");
    window.setTimeout(() => element.classList.add("visible"), 70 + index * 55);
  });
}

function runTypewriter() {
  const target = pages[currentIndex].querySelector("[data-typewriter]");
  clearInterval(typingTimer);
  if (!target || target.dataset.typed === "true") return;

  const text = target.dataset.typewriter;
  let index = 0;
  target.textContent = "";
  target.classList.add("typing");
  target.dataset.typed = "true";

  typingTimer = setInterval(() => {
    target.textContent = text.slice(0, index + 1);
    index += 1;
    if (index >= text.length) {
      clearInterval(typingTimer);
      setTimeout(() => target.classList.remove("typing"), 500);
    }
  }, 95);
}

function updateView(direction = 1) {
  pages.forEach((page, index) => {
    page.classList.toggle("active", index === currentIndex);
    page.classList.remove("leaving-left", "leaving-right");
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
    dot.setAttribute("aria-current", index === currentIndex ? "step" : "false");
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === pages.length - 1;
  nextBtn.textContent = currentIndex === pages.length - 1 ? "done ♥" : "next →";

  document.querySelector(".card-stack")?.scrollTo({ top: 0, behavior: direction ? "smooth" : "auto" });
  revealActivePage();
  runTypewriter();
}

function goToPage(index) {
  if (index < 0 || index >= pages.length || index === currentIndex) return;
  const direction = index > currentIndex ? 1 : -1;
  pages[currentIndex].classList.add(direction > 0 ? "leaving-left" : "leaving-right");
  currentIndex = index;
  window.setTimeout(() => updateView(direction), 120);
}

function createHeartBurst(x = Math.random() * window.innerWidth, y = Math.random() * window.innerHeight) {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.25 ? "♥" : "✦";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty("--x", `${(Math.random() - 0.5) * 260}px`);
  heart.style.setProperty("--y", `${-180 - Math.random() * 220}px`);
  heartBurst.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

function showHearts(amount = 32) {
  for (let i = 0; i < amount; i += 1) {
    setTimeout(() => createHeartBurst(), i * 28);
  }
}

function startSoftMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return false;

  audioContext = audioContext || new AudioContextClass();
  const master = audioContext.createGain();
  master.gain.setValueAtTime(0.0001, audioContext.currentTime);
  master.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 1.2);
  master.connect(audioContext.destination);

  [261.63, 329.63, 392.0, 523.25].forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = index === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.18 / (index + 1);
    oscillator.connect(gain).connect(master);
    oscillator.start();
    musicNodes.push(oscillator, gain);
  });

  musicNodes.push(master);
  return true;
}

function stopSoftMusic() {
  musicNodes.forEach((node) => {
    if (typeof node.stop === "function") {
      try {
        node.stop();
      } catch {
        // Already stopped.
      }
    }
    if (typeof node.disconnect === "function") node.disconnect();
  });
  musicNodes = [];
}

function setupHeartPresses() {
  document.querySelectorAll(".pop-heart").forEach((heart) => {
    let pressTimer;
    heart.addEventListener("pointerdown", (event) => {
      pressTimer = setTimeout(() => {
        heart.classList.add("popped");
        createHeartBurst(event.clientX, event.clientY);
        vibrate([15, 25, 15]);
        setTimeout(() => heart.classList.remove("popped"), 350);
      }, 450);
    });
    heart.addEventListener("pointerup", () => clearTimeout(pressTimer));
    heart.addEventListener("pointerleave", () => clearTimeout(pressTimer));
  });
}

yesBtn.addEventListener("click", () => {
  responseBox.textContent = "I knew my girl couldn't stay angry forever. Come here, tiny peace treaty.";
  responseBox.style.color = "#9a4d8e";
  vibrate([18, 28, 18]);
  showHearts(44);
});

angryBtn.addEventListener("click", () => {
  angryClicks += 1;
  vibrate();

  if (angryClicks >= 5) {
    responseBox.textContent = "Okay okay... take all the time you need. I will still be here, sorry and soft.";
    angryBtn.textContent = "softening...";
    angryBtn.style.transform = "scale(0.86)";
    return;
  }

  const moveX = (Math.random() - 0.5) * 170;
  const moveY = (Math.random() - 0.5) * 92;
  const scale = Math.max(0.78, 1 - angryClicks * 0.06);
  angryBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
  responseBox.textContent = apologyLines[(angryClicks - 1) % apologyLines.length];
});

prevBtn.addEventListener("click", () => {
  vibrate();
  goToPage(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  vibrate();
  goToPage(currentIndex + 1);
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    vibrate();
    goToPage(Number(dot.dataset.index));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") goToPage(currentIndex + 1);
  if (event.key === "ArrowLeft") goToPage(currentIndex - 1);
});

document.addEventListener("touchstart", (event) => {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

document.addEventListener("touchend", (event) => {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
    goToPage(currentIndex + (deltaX < 0 ? 1 : -1));
  }

  if (currentIndex === 0 && deltaY > 95 && Math.abs(deltaX) < 45) {
    secretNote.classList.add("show");
    vibrate([12, 18, 12]);
  }
}, { passive: true });

secretPull.addEventListener("click", () => {
  secretNote.classList.toggle("show");
  vibrate();
});

scratchCard?.addEventListener("pointermove", (event) => {
  if (event.buttons === 1 || event.pointerType === "touch") {
    scratchCard.classList.add("revealed");
    vibrate([10, 15, 10]);
  }
});

scratchCard?.addEventListener("click", () => {
  scratchCard.classList.add("revealed");
});

document.querySelectorAll("[data-mood]").forEach((button) => {
  button.addEventListener("click", () => {
    const responses = {
      soft: "Then I am sending the gentlest apology and the warmest hug.",
      smiling: "That tiny smile counts. I am keeping it very carefully.",
      dramatic: "Valid. I accept and offer snacks, hugs, and improved behavior."
    };
    moodResponse.textContent = responses[button.dataset.mood];
    vibrate();
  });
});

musicToggle.addEventListener("click", async () => {
  const shouldPlay = !musicToggle.classList.contains("active");
  musicToggle.classList.toggle("active", shouldPlay);
  musicToggle.textContent = shouldPlay ? "♫" : "♪";
  vibrate();

  if (shouldPlay && startSoftMusic()) {
    responseBox.textContent = "Soft background music is on.";
    return;
  }

  stopSoftMusic();
  responseBox.textContent = shouldPlay ? "Your browser blocked the music, but the button tried its best." : "";

  if (softMusic.src && shouldPlay) {
    if (softMusic.paused) await softMusic.play();
    else softMusic.pause();
  }
});

window.addEventListener("load", () => {
  setTimeout(() => loadingScreen.classList.add("hidden"), 650);
});

renderGallery();
renderPlaylist();
setupHeartPresses();
updateView(0);
