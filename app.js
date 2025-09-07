(() => {
  const grid = document.getElementById('eggGrid');
  const panel = document.getElementById('fortunePanel');
  const fortuneText = document.getElementById('fortuneText');
  const againBtn = document.getElementById('againBtn');
  const shareBtn = document.getElementById('shareBtn');
  const ribbon = document.getElementById('fortuneRibbon');
  const soundToggle = document.getElementById('soundToggle');

  // Fortune messages (24)
  const FORTUNES = [
    'A fresh start will put you on your way.',
    'Adventure can be real happiness.',
    'All the effort you are making will ultimately pay off.',
    'Believe it can be done.',
    'Bide your time; for success is near.',
    'Do not fear what you don’t know.',
    'Every flower blooms in its own sweet time.',
    'Fortune favors the bold.',
    'Happiness begins with facing life with a smile.',
    'Now is the time to try something new.',
    'Serendipity will lead you to pleasant surprises.',
    'Simplicity and clarity should be your theme in dress.',
    'Soon life will become more interesting.',
    'Success is a journey, not a destination.',
    'The early bird gets the worm, but the second mouse gets the cheese.',
    'Your abilities are unparalleled.',
    'You will conquer obstacles to achieve success.',
    'You will find great contentment in the daily, simple things.',
    'Take the chance while you still have the choice.',
    'A golden opportunity is coming your way.',
    'Your kindness is about to be repaid. 💖',
    'A pleasant surprise awaits you this week.',
    'Expect to be dazzled by a happy coincidence.',
    'Watch for doors opening where there were none.'
  ];

  const GOLDEN_FORTUNE = 'You cracked the rare Golden Fortune! Abundance and joy follow you. ✨🥇';

  // 12 gradient styles for eggs
  const EGG_GRADIENTS = [
    'linear-gradient(135deg,#ff9a9e,#fecfef)',
    'linear-gradient(135deg,#a1c4fd,#c2e9fb)',
    'linear-gradient(135deg,#f6d365,#fda085)',
    'linear-gradient(135deg,#84fab0,#8fd3f4)',
    'linear-gradient(135deg,#fccb90,#d57eeb)',
    'linear-gradient(135deg,#e0c3fc,#8ec5fc)',
    'linear-gradient(135deg,#f093fb,#f5576c)',
    'linear-gradient(135deg,#5ee7df,#b490ca)',
    'linear-gradient(135deg,#c3cfe2,#cfd9df)',
    'linear-gradient(135deg,#fddb92,#d1fdff)',
    'linear-gradient(135deg,#d4fc79,#96e6a1)',
    'linear-gradient(135deg,#a8edea,#fed6e3)'
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

  function createEggElement(index, isGolden, gradient) {
    const li = document.createElement('div');
    li.className = 'egg' + (isGolden ? ' golden' : '');
    li.setAttribute('role', 'listitem');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-label', isGolden ? 'Golden egg' : `Egg ${index + 1}`);
    li.style.setProperty('--egg-gradient', gradient);

    const inner = document.createElement('div');
    inner.className = 'egg-inner';
    const top = document.createElement('div');
    top.className = 'egg-top';
    const bottom = document.createElement('div');
    bottom.className = 'egg-bottom';
    inner.appendChild(top); inner.appendChild(bottom);
    li.appendChild(inner);

    li.addEventListener('click', () => openEgg(index));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEgg(index); }
      handleArrowKeys(e);
    });
    return li;
  }

  function buildGrid() {
    grid.innerHTML = '';
    eggs = [];
    const gradients = shuffle(EGG_GRADIENTS);

    // 1 in 12 chance to place golden, else none
    goldenIndex = Math.random() < 0.2 ? Math.floor(Math.random() * 12) : -1;

    // Randomize visual positions
    const order = shuffle([...Array(12).keys()]);
    for (let j = 0; j < 12; j++) {
      const i = order[j];
      const gradient = gradients[j % gradients.length];
      const el = createEggElement(i, i === goldenIndex, gradient);
      grid.appendChild(el);
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

    if (allowSound) playCrack();

    // After crack animation, show fortune
    setTimeout(() => {
      const isGolden = index === goldenIndex;
      const text = isGolden ? GOLDEN_FORTUNE : getRandomFortune();
      showFortune(text, isGolden);
      isTransitioning = false;
    }, 650);
  }

  function getRandomFortune() {
    return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  }

  function showFortune(text, isGolden) {
    panel.classList.remove('hidden');
    panel.setAttribute('aria-hidden', 'false');
    grid.style.display = 'none';
    fortuneText.textContent = '';
    const card = panel.querySelector('.fortune-card');
    card.classList.toggle('golden', !!isGolden);

    typeText(fortuneText, text, 18);
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
  let audioCtx = null;
  function playCrack() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const o1 = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o1.connect(g); g.connect(audioCtx.destination);
      o1.type = 'triangle';
      const now = audioCtx.currentTime;
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
  let touchStartX = 0, touchStartY = 0, touchMoved = false;
  function attachSwipe() {
    grid.addEventListener('touchstart', (e) => {
      if (!e.touches[0]) return;
      touchMoved = false;
      touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY;
    }, { passive: true });
    grid.addEventListener('touchmove', (e) => {
      if (!e.touches[0]) return;
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      if (Math.hypot(dx, dy) < 18) return;
      touchMoved = true;
      if (Math.abs(dx) > Math.abs(dy)) {
        focusedIndex = dx > 0 ? Math.min(focusedIndex + 1, eggs.length - 1) : Math.max(focusedIndex - 1, 0);
      } else {
        const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
        focusedIndex = dy > 0 ? Math.min(focusedIndex + cols, eggs.length - 1) : Math.max(focusedIndex - cols, 0);
      }
      updateFocus();
      touchStartX = e.touches[0].clientX; touchStartY = e.touches[0].clientY;
    }, { passive: true });
    grid.addEventListener('touchend', (e) => {
      if (!touchMoved) openEgg(focusedIndex);
    });
  }

  // Events
  againBtn.addEventListener('click', resetGame);
  shareBtn.addEventListener('click', shareFortune);
  soundToggle.addEventListener('click', () => {
    allowSound = !allowSound;
    soundToggle.setAttribute('aria-pressed', String(allowSound));
  });

  // Init
  buildGrid();
  attachSwipe();
})();

