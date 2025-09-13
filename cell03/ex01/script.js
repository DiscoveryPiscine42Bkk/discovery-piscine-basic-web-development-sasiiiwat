const balloon = document.getElementById('balloon');
const label = document.getElementById('label');

const MIN_SIZE = 200;
const MAX_SIZE = 420;
const GROW_STEP = 10;
const SHRINK_STEP = 5;
const COLORS = ['red', 'green', 'blue'];

let size = MIN_SIZE;
let colorIndex = 0;
let hovered = false;
let exploding = false;


function updateBalloon() {
  balloon.style.width = size + 'px';
  balloon.style.height = size + 'px';
  balloon.style.backgroundColor = COLORS[colorIndex];
  label.textContent = size + 'px';
}


function checkExplosion() {
  if (size > MAX_SIZE && !exploding) {
    exploding = true;
    balloon.classList.add('explode');
    balloon.style.pointerEvents = 'none';
    setTimeout(() => {
      balloon.classList.remove('explode');
      size = MIN_SIZE;
      colorIndex = 0;
      updateBalloon();
      balloon.style.pointerEvents = 'auto';
      exploding = false;
    }, 620);
  }
}

balloon.addEventListener('click', () => {
  if (exploding) return;
  size += GROW_STEP;
  colorIndex = (colorIndex + 1) % COLORS.length;
  updateBalloon();
  checkExplosion();
});

balloon.addEventListener('keydown', (e) => {
  if (e.code === 'Enter' || e.code === 'Space') {
    e.preventDefault();
    balloon.click();
  }
});

balloon.addEventListener('mouseenter', () => {
  hovered = true;
});

balloon.addEventListener('mouseleave', () => {
  if (exploding) return;
  if (!hovered) return;
  hovered = false;
  size = Math.max(MIN_SIZE, size - SHRINK_STEP);
  colorIndex = (colorIndex - 1 + COLORS.length) % COLORS.length;
  updateBalloon();
});

balloon.addEventListener('touchstart', (e) => {
  e.preventDefault();
  balloon.click();
}, {passive: false});


updateBalloon();
