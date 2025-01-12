const container = document.querySelector('.card-container');
const cards = document.querySelectorAll('.card');

let currentIndex = 2; 
let isDragging = false;
let startY = 0;
let currentY = 0;
let lastMoveTime = 0;


function updateCards() {
  cards.forEach((card, index) => {
    const offset = index - currentIndex;

    card.style.transform = `translateY(${offset * 120}px) scale(${1 - Math.abs(offset) * 0.05})`;
    card.style.opacity = 1 - Math.abs(offset) * 0.2;
    card.style.zIndex = -Math.abs(offset) + 10;
  });
}

function onMouseDown(e) {
  isDragging = true;
  startY = e.clientY;
}

function onMouseMove(e) {
  if (!isDragging) return;

  currentY = e.clientY;

  const direction = startY - currentY;
  const currentTime = new Date().getTime();

  if (Math.abs(direction) > 50 && currentTime - lastMoveTime > 1000) {
    if (direction > 0 && currentIndex < cards.length - 1) {
      currentIndex++;
    } else if (direction < 0 && currentIndex > 0) {
      currentIndex--;
    }

    startY = currentY; 
    lastMoveTime = currentTime; 
    updateCards();
  }
}

function onMouseUp() {
  isDragging = false;
}


container.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);


updateCards();
