(() => {
  const grid = document.getElementById('eggGrid');
  const panel = document.getElementById('fortunePanel');
  const fortuneText = document.getElementById('fortuneText');
  const againBtn = document.getElementById('againBtn');
  const shareBtn = document.getElementById('shareBtn');
  const ribbon = document.getElementById('fortuneRibbon');
  const burstLayer = document.getElementById('burstLayer');

  // Use fortune data from fortune-data.js
  const FORTUNES = FORTUNE_DATA;

  const GOLDEN_FORTUNE = 'You cracked the rare Golden Fortune! Abundance and joy follow you. ✨🥇';

  // 12 egg PNG images
  const EGG_IMAGES = [
    './assets/eggs/eggs-01.png',
    './assets/eggs/eggs-02.png',
    './assets/eggs/eggs-03.png',
    './assets/eggs/eggs-04.png',
    './assets/eggs/eggs-05.png',
    './assets/eggs/eggs-06.png',
    './assets/eggs/eggs-07.png',
    './assets/eggs/eggs-08.png',
    './assets/eggs/eggs-09.png',
    './assets/eggs/eggs-10.png',
    './assets/eggs/eggs-11.png',
    './assets/eggs/eggs-12.png'
  ];

  // State
  let allowSound = false;
  let isTransitioning = false;
  let focusedIndex = 0; // for keyboard/swipe focus
  let goldenIndex = -1; // rare egg location
  let eggs = [];

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function createEggElement(index, isGolden, imageSrc) {
    const tile = document.createElement('div');
    tile.className = 'egg-tile';

    const egg = document.createElement('img');
    egg.className = 'egg-icon' + (isGolden ? ' golden' : '');
    egg.setAttribute('role', 'listitem');
    egg.setAttribute('tabindex', '0');
    egg.setAttribute('aria-label', isGolden ? 'Golden egg' : `Egg ${index + 1}`);
    egg.src = imageSrc;
    egg.alt = isGolden ? 'Golden egg' : `Egg ${index + 1}`;

    tile.appendChild(egg);

    egg.addEventListener('click', () => openEgg(index));
    egg.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEgg(index); }
      handleArrowKeys(e);
    });
    // Return egg element for focus/interaction tracking, but append tile to grid
    Object.defineProperty(egg, '__tile', { value: tile });
    return egg;
  }

  function buildGrid() {
    grid.innerHTML = '';
    eggs = [];
    const shuffledImages = shuffle([...EGG_IMAGES]);

    // 1 in 12 chance to place golden, else none
    goldenIndex = Math.random() < 0.2 ? Math.floor(Math.random() * 12) : -1;

    // Randomize visual positions
    const order = shuffle([...Array(12).keys()]);
    for (let j = 0; j < 12; j++) {
      const i = order[j];
      const imageSrc = shuffledImages[j];
      const el = createEggElement(i, i === goldenIndex, imageSrc);
      grid.appendChild(el.__tile || el);
      eggs.push(el);
    }
    focusedIndex = 0;
    updateFocus();
  }

  function updateFocus() {
    eggs.forEach((egg, idx) => {
      if (idx === focusedIndex) egg.classList.add('is-focused');
      else egg.classList.remove('is-focused');
    });
    eggs[focusedIndex]?.focus({ preventScroll: true });
  }

  function openEgg(index) {
    if (isTransitioning) return;
    const egg = eggs[index];
    if (!egg) return;
    isTransitioning = true;
    egg.classList.add('cracked');

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50); // Short vibration for egg click
    }

    if (allowSound) playCrack();

    // After crack animation, flash burst, then show fortune overlay
    setTimeout(() => {
      triggerBurst(egg);
      setTimeout(() => {
        const isGolden = index === goldenIndex;
        const text = isGolden ? GOLDEN_FORTUNE : getRandomFortune();
        showFortune(text, isGolden);
        isTransitioning = false;
      }, 300);
    }, 400);
  }

  function getRandomFortune() {
    const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    return randomFortune.quote;
  }

  function showFortune(text, isGolden) {
    panel.classList.remove('hidden');
    panel.setAttribute('aria-hidden', 'false');
    fortuneText.textContent = '';
    const card = panel.querySelector('.fortune-card');
    card.classList.toggle('golden', !!isGolden);

    typeText(fortuneText, text, 18);
  }

  function triggerBurst(sourceEl) {
    if (!burstLayer) return;
    if (sourceEl) {
      const rect = sourceEl.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      burstLayer.style.setProperty('--burst-x', `${x}px`);
      burstLayer.style.setProperty('--burst-y', `${y}px`);
    }
    burstLayer.classList.remove('active');
    // force reflow to restart animation
    void burstLayer.offsetWidth;
    burstLayer.classList.add('active');
    setTimeout(() => burstLayer.classList.remove('active'), 900);
  }

  function resetGame() {
    panel.classList.add('hidden');
    panel.setAttribute('aria-hidden', 'true');
    grid.style.display = '';
    buildGrid();
  }

  function typeText(node, text, speedMs) {
    let i = 0;
    const timer = setInterval(() => {
      node.textContent = text.slice(0, i++);
      if (i > text.length) clearInterval(timer);
    }, speedMs);
  }

  // Simple synthesized crack sound
  let crackAudioCtx = null;
  function playCrack() {
    try {
      crackAudioCtx = crackAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o1 = crackAudioCtx.createOscillator();
      const g = crackAudioCtx.createGain();
      o1.connect(g); g.connect(crackAudioCtx.destination);
      o1.type = 'triangle';
      const now = crackAudioCtx.currentTime;
      o1.frequency.setValueAtTime(800, now);
      o1.frequency.exponentialRampToValueAtTime(120, now + 0.12);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.5, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      o1.start(now);
      o1.stop(now + 0.2);
    } catch {}
  }

  // Share
  async function shareFortune() {
    const text = fortuneText.textContent.trim();
    const shareData = { title: 'My Fortune', text, url: location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(`${text}\n${location.href}`);
      shareBtn.textContent = 'Copied!';
      setTimeout(() => (shareBtn.textContent = 'Share Fortune'), 1200);
    } catch {}
  }

  // Keyboard navigation
  function handleArrowKeys(e) {
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const rows = Math.ceil(eggs.length / cols);
    const col = focusedIndex % cols;
    const row = Math.floor(focusedIndex / cols);
    let next = focusedIndex;
    switch (e.key) {
      case 'ArrowRight': next = Math.min(focusedIndex + 1, eggs.length - 1); break;
      case 'ArrowLeft': next = Math.max(focusedIndex - 1, 0); break;
      case 'ArrowDown': next = Math.min(focusedIndex + cols, eggs.length - 1); break;
      case 'ArrowUp': next = Math.max(focusedIndex - cols, 0); break;
      default: return;
    }
    if (next !== focusedIndex) {
      focusedIndex = next; updateFocus(); e.preventDefault();
    }
  }

  // Swipe gestures: swipe to move focus, tap to open
  let touchStartX = 0, touchStartY = 0, touchMoved = false, swipeProcessed = false, touchStartTime = 0;
  function attachSwipe() {
    grid.addEventListener('touchstart', (e) => {
      if (!e.touches[0]) return;
      touchMoved = false;
      swipeProcessed = false;
      touchStartX = e.touches[0].clientX; 
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }, { passive: true });
    
    grid.addEventListener('touchmove', (e) => {
      if (!e.touches[0] || swipeProcessed) return;
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      const distance = Math.hypot(dx, dy);
      
      // Mark as moved if distance exceeds threshold
      if (distance > 10) {
        touchMoved = true;
      }
      
      // Require minimum swipe distance for navigation
      if (distance < 50) return;
      
      swipeProcessed = true; // Prevent multiple swipes
      
      // Determine swipe direction
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0) {
          // Swipe right - move to next egg
          focusedIndex = Math.min(focusedIndex + 1, eggs.length - 1);
        } else {
          // Swipe left - move to previous egg
          focusedIndex = Math.max(focusedIndex - 1, 0);
        }
      } else {
        // Vertical swipe
        const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
        if (dy > 0) {
          // Swipe down - move down a row
          focusedIndex = Math.min(focusedIndex + cols, eggs.length - 1);
        } else {
          // Swipe up - move up a row
          focusedIndex = Math.max(focusedIndex - cols, 0);
        }
      }
      
      updateFocus();
    }, { passive: true });
    
    grid.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - touchStartTime;
      
      // Only open egg if:
      // 1. No significant movement (< 10px)
      // 2. Touch duration is reasonable (not too long or too short)
      // 3. No swipe was processed
      if (!touchMoved && !swipeProcessed && touchDuration > 50 && touchDuration < 500) {
        openEgg(focusedIndex);
      }
      
      // Reset for next interaction
      swipeProcessed = false;
    });
  }

  // Events
  againBtn.addEventListener('click', resetGame);
  shareBtn.addEventListener('click', shareFortune);

  // Init
  buildGrid();
  attachSwipe();
})();

