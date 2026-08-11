const pages = Array.from(document.querySelectorAll('.page'));
const dots = Array.from(document.querySelectorAll('.dot'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const yesBtn = document.getElementById('yesBtn');
const angryBtn = document.getElementById('angryBtn');
const responseBox = document.getElementById('responseBox');
const heartBurst = document.getElementById('heartBurst');
const memoryGallery = document.getElementById('memoryGallery');
const playlistContainer = document.getElementById('playlistContainer');

let currentIndex = 0;
let angryClicks = 0;

function resolveMediaSrc(src) {
  return src.toLowerCase().endsWith('.heic') ? src.replace(/\.heic$/i, '.jpg') : src;
}

const galleryItems = [
  { type: 'image', src: 'gallery/IMG_3723.HEIC', caption: 'Your smile still feels like my favorite sunrise 💕' },
  { type: 'image', src: 'gallery/IMG_3726.HEIC', caption: 'Every little moment with you feels magical ✨' },
  { type: 'image', src: 'gallery/IMG_4085.HEIC', caption: 'Just us, being adorable and completely unserious 😍' },
  { type: 'image', src: 'gallery/IMG_4086.HEIC', caption: 'The kind of memory that makes my heart do tiny cartwheels 💗' },
  { type: 'image', src: 'gallery/IMG_4087.HEIC', caption: 'A tiny piece of our happy little world 🫶' },
  { type: 'image', src: 'gallery/IMG_4121.JPG', caption: 'The cutest little moments are the ones I treasure most 💞' },
  { type: 'image', src: 'gallery/IMG_4220.HEIC', caption: 'You make ordinary days feel like a fairytale 🌷' },
  { type: 'image', src: 'gallery/IMG_4246.HEIC', caption: 'Still thinking about that look that melts me every time 🥺' },
  { type: 'image', src: 'gallery/IMG_4252.HEIC', caption: 'My favorite kind of chaos is being with you 💖' },
  { type: 'image', src: 'gallery/IMG_4253.HEIC', caption: 'A little laugh, a little love, a lot of us 💕' },
  { type: 'image', src: 'gallery/IMG_4254.HEIC', caption: 'You are my favorite reason to smile every single day 🌼' },
  { type: 'image', src: 'gallery/IMG_4347.HEIC', caption: 'The sweetest memories are the ones with you in them 🌸' },
  { type: 'image', src: 'gallery/IMG_4386.HEIC', caption: 'Somewhere between the laughs, you became my favorite place 💗' },
  { type: 'image', src: 'gallery/IMG_4395.JPG', caption: 'A soft memory, a warm heart, and you in the middle 🫶' },
  { type: 'image', src: 'gallery/IMG_4403.JPG', caption: 'Every glance with you feels like a tiny love letter 💌' },
  { type: 'image', src: 'gallery/IMG_4434.PNG', caption: 'The cutest little spark of our story ✨' },
  { type: 'image', src: 'gallery/IMG_4561.HEIC', caption: 'A little bit of us, forever in my heart 💕' },
  { type: 'image', src: 'gallery/IMG_4750.HEIC', caption: 'You make even quiet moments feel beautiful 🌙' },
  { type: 'image', src: 'gallery/IMG_4756.HEIC', caption: 'The kind of smile I would keep choosing forever 🥰' },
  { type: 'image', src: 'gallery/IMG_4757.HEIC', caption: 'One look from you and everything feels lighter 💖' },
  { type: 'image', src: 'gallery/IMG_4897.HEIC', caption: 'My favorite memories are the ones that feel like home 🏡' },
  { type: 'image', src: 'gallery/IMG_4910.HEIC', caption: 'A little love, a little laughter, and a lot of us 💞' },
  { type: 'image', src: 'gallery/IMG_4915.HEIC', caption: 'You are still the sweetest part of my favorite stories 💕' },
  { type: 'image', src: 'gallery/IMG_4919.HEIC', caption: 'Every moment with you feels worth holding onto 🌷' },
  { type: 'image', src: 'gallery/IMG_4922.HEIC', caption: 'I would pick you in every version of forever 🫶' },
  { type: 'image', src: 'gallery/IMG_4924.HEIC', caption: 'The cutest little chapter of my heart belongs to you 💗' },
  { type: 'video', src: 'gallery/027086BE-8F1F-4888-B264-538598FD6090.mov', caption: 'A tiny video, but it still feels like a warm memory 🎥💖' },
  { type: 'video', src: 'gallery/IMG_4748.MOV', caption: 'A little clip of our happy little chaos 📹💞' },
  { type: 'video', src: 'gallery/IMG_4910.MP4', caption: 'Even the videos feel soft when they’re filled with you 💕' },
  { type: 'image', src: 'gallery/94DF62F7-92DC-4CC4-A81A-5A12B62E171D.jpg', caption: 'You make every memory glow a little brighter ✨' },
  { type: 'image', src: 'gallery/CEAE0AAC-601A-4E28-8BBD-CE4FE1B87465.jpg', caption: 'This one feels like a tiny love song in picture form 🎶' }
];

if (memoryGallery) {
  memoryGallery.innerHTML = galleryItems.map((item) => {
    const displaySrc = resolveMediaSrc(item.src);
    return `
      <article class="memory-card">
        <div class="photo-frame">
          ${item.type === 'video' ? `<video class="memory-video" src="${displaySrc}" controls preload="metadata"></video>` : `<img class="memory-photo" src="${displaySrc}" alt="memory" />`}
        </div>
        <div class="memory-caption">${item.caption}</div>
      </article>
    `;
  }).join('');
}

const playlistItems = [
  {
    title: 'you made my playlist amazing',
    description: 'you made my playlist amazing',
    url: 'https://www.youtube.com/watch?v=MHtHCpkf8Mg&list=RDMHtHCpkf8Mg&start_radio=1'
  },
  {
    title: 'My sukoon',
    description: 'My sukoon',
    url: 'https://www.youtube.com/watch?v=aq3rBOmR6Pw&list=RDaq3rBOmR6Pw&start_radio=1'
  },
  {
    title: 'मैं पागल दीवाना',
    description: 'मैं आशिक़, मैं मजनू\nमैं रांझा, मैं सबकुछ तेरा\n\nतू जन्नत वखाएंगी\nरब नाल मिलायेंगी\nदिल मैनु कहंदा मेरा\n\nमैं सजदे करांगा\nइरादा नहीं सी\nरब ते यकीन मैनु\nज़्यादा नहीं सी\n\nतेरे नाल जुड़ाया मैं\nरब नाल जुड़ गया\nहो तेरा चेहरा जद्द\nमेरे वल्ल मुड़ गया',
    url: 'https://www.youtube.com/watch?v=vg3tvzD5ymY&list=RDvg3tvzD5ymY&start_radio=1'
  },
  {
    title: 'hehe really.. i saving for 10ct diamond atleast',
    description: 'hehe really.. i saving for 10ct diamond atleast',
    url: 'https://www.youtube.com/watch?v=8zdg-pDF10g&list=RD8zdg-pDF10g&start_radio=1'
  },
  {
    title: 'dedicated to you',
    description: 'dedicated to you',
    url: 'https://www.youtube.com/watch?v=bJmj4FrGWBs&list=RDbJmj4FrGWBs&start_radio=1'
  },
  {
    title: 'special one',
    description: 'specially\nNi main tere piche\nAakhir tikar auna ae\nBhavein paeran de vich chubde\nSulaan pakhad ne\nMainu pata nahi si\nIshq tere diyan kadiyan ne\nNi hath per soniye\nAidan mere jakkadne\nNi main tere naalon\nTutt ke injh suk sadh jaana\nTuttde tahni naalon\nJiven soniye pattar ne',
    url: 'https://www.youtube.com/watch?v=_7kgU0lyVhw&list=RD_7kgU0lyVhw&start_radio=1'
  },
  {
    title: 'Teri gall hor ae sajna',
    description: 'Teri gall hor ae sajna\nAssi taan tere pairaan warge aan',
    url: 'https://www.youtube.com/watch?v=KCPDJ3YV6eU&list=RDKCPDJ3YV6eU&start_radio=1'
  },
  {
    title: 'andddddd thisss',
    description: 'andddddd thisss',
    url: 'https://www.youtube.com/watch?v=oafxkMv4xnc&list=RDoafxkMv4xnc&start_radio=1'
  }
];

if (playlistContainer) {
  playlistContainer.innerHTML = playlistItems.map((song) => `
    <button class="playlist-card" type="button" data-url="${song.url}" data-title="${song.title}">
      <div class="playlist-title">${song.title}</div>
      <div class="playlist-description">${song.description.replace(/\n/g, '<br>')}</div>
      <div class="playlist-action">play inside app ▶</div>
    </button>
  `).join('');
}

playlistContainer?.querySelectorAll('.playlist-card').forEach((card) => {
  card.addEventListener('click', () => {
    const url = card.getAttribute('data-url');
    window.open(url, '_blank', 'noopener,noreferrer');
  });
});

function updateView() {
  pages.forEach((page, index) => {
    page.classList.toggle('active', index === currentIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === pages.length - 1;
}

function nextPage() {
  if (currentIndex < pages.length - 1) {
    currentIndex += 1;
    updateView();
  }
}

function prevPage() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    updateView();
  }
}

function createHeartBurst() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.innerHTML = '💗';

  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;
  heart.style.left = `${startX}px`;
  heart.style.top = `${startY}px`;
  heart.style.setProperty('--x', `${(Math.random() - 0.5) * 220}px`);
  heart.style.setProperty('--y', `${-220 - Math.random() * 180}px`);

  heartBurst.appendChild(heart);

  setTimeout(() => heart.remove(), 1200);
}

function showHearts() {
  for (let i = 0; i < 24; i += 1) {
    setTimeout(createHeartBurst, i * 35);
  }
}

yesBtn.addEventListener('click', () => {
  responseBox.textContent = 'I knew my girl couldn’t stay angry forever 🥺❤️';
  responseBox.style.color = '#ff4d79';
  showHearts();
});

angryBtn.addEventListener('click', () => {
  angryClicks += 1;

  if (angryClicks >= 4) {
    responseBox.textContent = 'babbyyuuuuuuuuuuu muaaahhh';
    responseBox.style.color = '#ff8b4d';
    angryBtn.textContent = 'okay okay 😌';
    angryBtn.style.transform = 'scale(1.05)';
    angryBtn.disabled = true;
    return;
  }

  const moveX = (Math.random() - 0.5) * 140;
  const moveY = (Math.random() - 0.5) * 80;
  angryBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
  responseBox.textContent = 'Aww come on, don’t be mean to me 😭';
  responseBox.style.color = '#ff8b4d';
});

prevBtn.addEventListener('click', prevPage);
nextBtn.addEventListener('click', nextPage);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') nextPage();
  if (event.key === 'ArrowLeft') prevPage();
});

let startX = 0;
let startY = 0;

document.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  startX = touch.clientX;
  startY = touch.clientY;
}, { passive: true });

document.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;

  if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX < 0) nextPage();
    else prevPage();
  }
}, { passive: true });

updateView();
