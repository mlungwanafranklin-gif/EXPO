
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
