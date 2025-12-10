
// tiny controller: nav, shuffle, notes, warp mouse effect
(() => {
  const panels = Array.from(document.querySelectorAll('.panel'));
  const titleEl = document.getElementById('noteTitle');
  const textEl = document.getElementById('noteText');
  let index = 0;
  let showNotes = true;

  function render(){
    panels.forEach((p,i)=> p.classList.toggle('active', i === index));
    const cur = panels[index];
    titleEl.textContent = cur.dataset.title || '';
    textEl.textContent = showNotes ? (cur.dataset.note || '') : '';
  }

  document.getElementById('next').addEventListener('click', ()=> { index = (index+1) % panels.length; render(); });
  document.getElementById('prev').addEventListener('click', ()=> { index = (index-1 + panels.length) % panels.length; render(); });
  document.getElementById('shuffle').addEventListener('click', ()=> { index = Math.floor(Math.random()*panels.length); render(); });
  document.getElementById('explain').addEventListener('click', ()=> { showNotes = !showNotes; render(); });

  // Hover warp: update CSS vars for radial center
  const warp = document.getElementById('warp');
  if(warp){
    warp.addEventListener('mousemove', (e) => {
      const r = warp.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      warp.style.setProperty('--mx', mx + '%');
      warp.style.setProperty('--my', my + '%');
    });
    warp.addEventListener('mouseleave', ()=> {
      warp.style.setProperty('--mx', '50%');
      warp.style.setProperty('--my', '50%');
    });
  }

  // keyboard nav
  window.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') document.getElementById('next').click();
    if(e.key === 'ArrowLeft') document.getElementById('prev').click();
    if(e.key === 's') document.getElementById('shuffle').click();
  });

  render();
})();

/*  Dark-sci-fi illusion museum  —  minimal controller  */
const panels   = document.querySelectorAll('.panel');
const prevBtn  = document.getElementById('prev');
const nextBtn  = document.getElementById('next');
const shuffle  = document.getElementById('shuffle');
const explain  = document.getElementById('explain');
const noteBox  = document.getElementById('notes');
const noteTitle= document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');

let idx = 0;

function activate(i){
  idx = (i + panels.length) % panels.length;          // wrap
  panels.forEach((p,n)=> p.classList.toggle('active', n === idx));
  // update side card
  const active = panels[idx];
  noteTitle.textContent = active.dataset.title;
  noteText.textContent  = active.dataset.note;
}

/* button actions */
nextBtn.onclick = () => activate(idx + 1);
prevBtn.onclick = () => activate(idx - 1);
shuffle.onclick = () => activate(Math.floor(Math.random() * panels.length));

/* keyboard nav */
document.addEventListener('keydown', e=>{
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft')  prevBtn.click();
  if (e.key === ' ')          shuffle.click();
});

/* show / hide note card */
explain.onclick = () => noteBox.classList.toggle('hidden');

/* first paint */
activate(0);
