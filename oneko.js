(function oneko() {
  const isReducedMotion =
    (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || false;
  if (isReducedMotion) return;

  const nekoEl = document.createElement('div');
  nekoEl.id = 'oneko';
  nekoEl.style.width = '32px';
  nekoEl.style.height = '32px';
  nekoEl.style.position = 'fixed';
  nekoEl.style.pointerEvents = 'auto';
  nekoEl.style.imageRendering = 'pixelated';
  nekoEl.style.left = '32px';
  nekoEl.style.top = '32px';
  nekoEl.style.zIndex = 99999;

  let nekoFile = './oneko.gif';
  const curScript = document.currentScript;
  if (curScript && curScript.dataset.cat) {
    nekoFile = curScript.dataset.cat;
  }
  nekoEl.style.backgroundImage = `url(${nekoFile})`;
  nekoEl.style.backgroundSize = 'auto';

  document.body.appendChild(nekoEl);

  let nekoPosX = 32, nekoPosY = 32;
  let mousePosX = window.innerWidth/2, mousePosY = window.innerHeight/2;
  let frameCount = 0, idleTime = 0, idleAnim = null, idleFrame = 0;
  const nekoSpeed = 10;

  const spriteSets = {
    idle: [[-3,-3]],
    alert: [[-7,-3]],
    N:[[ -1,-2],[ -1,-3]],
    NE:[[0,-2],[0,-3]],
    E:[[-3,0],[-3,-1]],
    SE:[[-5,-1],[-5,-2]],
    S:[[-6,-3],[-7,-2]],
    SW:[[-5,-3],[-6,-1]],
    W:[[-4,-2],[-4,-3]],
    NW:[[-1,0],[-1,-1]],
    sleeping:[[-2,0],[-2,-1]],
    tired:[[-3,-2]],
    scratchSelf:[[-5,0],[-6,0],[-7,0]],
    scratchWallN:[[0,0],[0,-1]],
    scratchWallS:[[-7,-1],[-6,-2]],
    scratchWallE:[[-2,-2],[-2,-3]],
    scratchWallW:[[-4,0],[-4,-1]],
  };

  function setSprite(name, f){
    if (!spriteSets[name]) return;
    const sprite = spriteSets[name][f % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0]*32}px ${sprite[1]*32}px`;
  }

  document.addEventListener('mousemove', (e) => { mousePosX = e.clientX; mousePosY = e.clientY; });

  function resetIdle(){ idleAnim = null; idleFrame = 0; }

  function idle(){
    idleTime++;
    if (idleTime > 10 && Math.floor(Math.random()*200) === 0 && idleAnim === null) {
      const options = ['sleeping','scratchSelf'];
      if (nekoPosX < 32) options.push('scratchWallW');
      if (nekoPosY < 32) options.push('scratchWallN');
      if (nekoPosX > window.innerWidth - 32) options.push('scratchWallE');
      if (nekoPosY > window.innerHeight - 32) options.push('scratchWallS');
      idleAnim = options[Math.floor(Math.random()*options.length)];
    }

    switch(idleAnim){
      case 'sleeping':
        if (idleFrame < 8) { setSprite('tired',0); break; }
        setSprite('sleeping', Math.floor(idleFrame/4));
        if (idleFrame>192) resetIdle();
        break;
      case 'scratchSelf':
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
        setSprite(idleAnim, idleFrame);
        if (idleFrame>9) resetIdle();
        break;
      default:
        setSprite('idle',0);
        return;
    }
    idleFrame++;
  }

  function frame(){
    frameCount++;
    const dx = nekoPosX - mousePosX;
    const dy = nekoPosY - mousePosY;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < nekoSpeed || dist < 48) { idle(); return; }

    idleAnim = null; idleFrame = 0;

    if (idleTime > 1) {
      setSprite('alert',0);
      idleTime = Math.min(idleTime,7);
      idleTime -= 1;
      return;
    }

    let direction = '';
    direction += (dy/dist > 0.5) ? 'N' : '';
    direction += (dy/dist < -0.5) ? 'S' : '';
    direction += (dx/dist > 0.5) ? 'W' : '';
    direction += (dx/dist < -0.5) ? 'E' : '';
    setSprite(direction || 'E', frameCount);

    nekoPosX -= (dx/dist)*nekoSpeed;
    nekoPosY -= (dy/dist)*nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX-16}px`;
    nekoEl.style.top = `${nekoPosY-16}px`;
  }

  let last = 0;
  function loop(ts) {
    if (!last) last = ts;
    if (ts - last > 100) { last = ts; frame(); }
    requestAnimationFrame(loop);
  }

  // hearts on click
  function explodeHearts(){
    const parent = document.body;
    const rect = nekoEl.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    for(let i=0;i<10;i++){
      const h = document.createElement('div');
      h.className = 'heart';
      h.textContent = '❤';
      h.style.left = (centerX + (Math.random()-0.5)*50) + 'px';
      h.style.top = (centerY + (Math.random()-0.5)*50) + 'px';
      h.style.position = 'absolute';
      parent.appendChild(h);
      setTimeout(()=>parent.removeChild(h),1000);
    }
  }
  nekoEl.addEventListener('click', explodeHearts);

  loop();
})();
