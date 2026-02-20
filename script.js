// Single unified controller
const panels = document.querySelectorAll('.panel');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const explainBtn = document.getElementById('explain');
const noteBox = document.getElementById('notes');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const progressBar = document.getElementById('progressBar');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');

let idx = 0;
let autoAdvance;
let isPaused = false;

// Scripture popup functionality
function showScripturePopup(reference, text) {
  // Remove existing popup if any
  const existing = document.querySelector('.scripture-popup');
  if (existing) existing.remove();
  
  // Create popup
  const popup = document.createElement('div');
  popup.className = 'scripture-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <button class="popup-close">×</button>
      <h4>${reference}</h4>
      <p>"${text}"</p>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Close handlers
  popup.querySelector('.popup-close').onclick = () => popup.remove();
  popup.onclick = (e) => {
    if (e.target === popup) popup.remove();
  };
  
  // Auto-close after 10 seconds
  setTimeout(() => {
    if (popup.parentNode) popup.remove();
  }, 10000);
}

// Make popup available globally for inline onclick handlers
window.showScripturePopup = showScripturePopup;

function updateProgress() {
  const progress = ((idx + 1) / panels.length) * 100;
  progressBar.style.width = progress + '%';
  currentEl.textContent = idx + 1;
}

function activate(i){
  idx = (i + panels.length) % panels.length;
  panels.forEach((p, n) => {
    p.classList.toggle('active', n === idx);
  });
  
  const active = panels[idx];
  noteTitle.textContent = active.dataset.title;
  
  // Get the description HTML with scripture links
  const descEl = active.querySelector('.illusion-description');
  if (descEl) {
    noteContent.innerHTML = descEl.innerHTML;
  }
  
  updateProgress();
  resetAutoAdvance();
}

function next() { activate(idx + 1); }
function prev() { activate(idx - 1); }
function shuffle() { activate(Math.floor(Math.random() * panels.length)); }

function resetAutoAdvance() {
  clearInterval(autoAdvance);
  if (!isPaused) {
    autoAdvance = setInterval(next, 15000);
  }
}

// Event listeners
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
shuffleBtn.addEventListener('click', shuffle);
explainBtn.addEventListener('click', () => {
  noteBox.classList.toggle('hidden');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === ' ' || e.key === 's') {
    e.preventDefault();
    shuffle();
  }
  if (e.key === 'h') {
    noteBox.classList.toggle('hidden');
  }
});

// Hover warp effect
const warp = document.getElementById('warp');
if(warp){
  warp.addEventListener('mousemove', (e) => {
    const r = warp.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    warp.style.setProperty('--mx', mx + '%');
    warp.style.setProperty('--my', my + '%');
  });
  
  warp.addEventListener('mouseleave', () => {
    warp.style.setProperty('--mx', '50%');
    warp.style.setProperty('--my', '50%');
  });
}

// Pause on hover
document.getElementById('stage').addEventListener('mouseenter', () => {
  isPaused = true;
  clearInterval(autoAdvance);
});

document.getElementById('stage').addEventListener('mouseleave', () => {
  isPaused = false;
  resetAutoAdvance();
});

// Initialize
totalEl.textContent = panels.length;
activate(0);
