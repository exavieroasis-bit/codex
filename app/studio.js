(async () => {
    'use strict';
    const $ = id => document.getElementById(id);
    const art = window.LionArt;
    await art.ready;
    const categories = art.traits;
    const defaults = { ...art.defaults };
    let traits = { ...defaults };
    let name = 'The Usual Suspect';
    let edition = 1;
    let locked = new Set();
    let saved = [];
    let toastTimer;
    const storageKey='pride.lions.v1';
    const defaultName='The Usual Suspect';
    const category = key => categories.find(item => item.key === key);
    const option = (key,id=traits[key]) => category(key).options.find(item => item.id===id) || category(key).options[0];
    const paddedEdition = () => String(edition).padStart(3,'0');
    const normalizeEdition = value => Math.min(9999,Math.max(1,Math.round(Number(value)||1)));
    function normalize(raw={}) {
      return Object.fromEntries(categories.map(cat => [cat.key,cat.options.some(item => item.id===raw[cat.key]) ? raw[cat.key] : defaults[cat.key]]));
    }
    function notify(message) {
      clearTimeout(toastTimer); $('toast').textContent=message; $('toast').hidden=false;
      toastTimer=setTimeout(() => { $('toast').hidden=true; },5000);
    }
    function svgIcon(symbol) {
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.classList.add('icon'); svg.setAttribute('aria-hidden','true');
      const use=document.createElementNS('http://www.w3.org/2000/svg','use'); use.setAttribute('href',`#${symbol}`); svg.append(use); return svg;
    }
    function lockButton(cat) {
      const button=document.createElement('button'); button.type='button'; button.className='lock'; button.dataset.lock=cat.key;
      button.setAttribute('aria-label',`Lock ${cat.label.toLowerCase()} during shuffle`); button.setAttribute('aria-pressed','false'); button.append(svgIcon('i-unlock'));
      button.addEventListener('click',() => toggleLock(cat.key)); return button;
    }
    function toggleLock(key) {
      if (locked.has(key)) locked.delete(key); else locked.add(key);
      updateLocks();
    }
    function updateLocks() {
      document.querySelectorAll('[data-lock]').forEach(button => {
        const isLocked=locked.has(button.dataset.lock);
        button.setAttribute('aria-pressed',String(isLocked));
        button.setAttribute('aria-label',`${isLocked?'Unlock':'Lock'} ${category(button.dataset.lock).label.toLowerCase()} during shuffle`);
        button.querySelector('use').setAttribute('href',isLocked ? '#i-lock' : '#i-unlock');
      });
    }
    function buildControls() {
      const bg=category('background');
      $('background-options').style.gridTemplateColumns=`repeat(${bg.options.length},minmax(0,1fr))`;
      bg.options.forEach(item => {
        const button=document.createElement('button'); button.type='button'; button.className='swatch'; button.dataset.background=item.id;
        button.style.setProperty('--swatch',item.color || '#d6e0cd'); button.setAttribute('aria-label',`${item.label} background`); button.title=item.label; button.setAttribute('aria-pressed','false');
        button.addEventListener('click',() => { traits.background=item.id; render(); }); $('background-options').append(button);
      });
      categories.filter(cat => cat.key!=='background').forEach(cat => {
        const field=document.createElement('div'); field.className='trait-field';
        const row=document.createElement('div'); row.className='label-row';
        const label=document.createElement('label'); label.htmlFor=`trait-${cat.key}`; label.textContent=cat.label;
        row.append(label,lockButton(cat));
        const select=document.createElement('select'); select.id=`trait-${cat.key}`; select.dataset.trait=cat.key;
        cat.options.forEach(item => { const opt=document.createElement('option'); opt.value=item.id; opt.textContent=item.label; select.append(opt); });
        select.addEventListener('change',() => { traits[cat.key]=select.value; render(); }); field.append(row,select);
        $(['skin','eyeType','eyeColor','mouth'].includes(cat.key) ? 'character-traits' : 'accessory-traits').append(field);
      });
      $('lock-background').addEventListener('click',() => toggleLock('background'));
    }
    function render() {
      $('artwork').innerHTML=art.renderSVG(traits,{size:1024});
      $('art-name').textContent=name.trim() || defaultName;
      $('edition-tag').textContent=`PRIDE #${paddedEdition()}`;
      $('art-summary').textContent=`ORIGINAL LION / ${option('skin').label.toUpperCase()}`;
      $('background-name').textContent=option('background').label;
      $('trait-count').textContent=`${categories.length} traits`;
      document.querySelectorAll('[data-trait]').forEach(select => { select.value=traits[select.dataset.trait]; });
      document.querySelectorAll('[data-background]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.background===traits.background)));
    }
    function syncIdentity() { $('character-name').value=name; $('edition').value=edition; }
    function fileName(extension) {
      const slug=(name.trim()||defaultName).normalize('NFKD').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase() || 'lion';
      return `pride-${slug}-${paddedEdition()}.${extension}`;
    }
    function downloadBlob(blob,filename) {
      const url=URL.createObjectURL(blob); const link=document.createElement('a'); link.href=url; link.download=filename;
      document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url),60000);
    }
    async function rasterize(snapshot,size) {
      const svg=art.renderSVG(snapshot,{size});
      const image=new Image();
      const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
      try {
        await new Promise((resolve,reject) => { image.onload=resolve; image.onerror=() => reject(new Error('The lion image could not be rendered.')); image.src=url; });
        const canvas=document.createElement('canvas'); canvas.width=canvas.height=size; const ctx=canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas is not available in this browser.');
        ctx.drawImage(image,0,0,size,size); return canvas;
      } finally { URL.revokeObjectURL(url); }
    }
    function persist(next) {
      try { localStorage.setItem(storageKey,JSON.stringify(next)); saved=next; return true; }
      catch(_) { notify('Browser storage is unavailable or full. Export your lion to keep a copy.'); return false; }
    }
    function refreshCollection() {
      $('collection-count').textContent=saved.length;
      $('gallery-summary').textContent=`${saved.length} lion${saved.length===1?'':'s'} saved in this browser`;
      $('empty-state').hidden=saved.length>0; $('gallery').replaceChildren();
      let refreshed=false;
      saved.forEach(item => {
        if(item.artVersion!==art.version){item.thumbnail=art.thumbnail(item.traits);item.artVersion=art.version;refreshed=true;}
        const card=document.createElement('article'); card.className='saved-card';
        const open=document.createElement('button'); open.type='button'; open.className='saved-open';
        const image=document.createElement('img'); image.src=item.thumbnail; image.alt=`${item.name}, saved lion PFP`; image.width=image.height=256; image.loading='lazy';
        const title=document.createElement('h3'); title.textContent=item.name;
        const caption=document.createElement('p'); caption.textContent=`PRIDE #${String(item.edition).padStart(3,'0')} · ${option('skin',item.traits.skin).label}`;
        open.append(image,title,caption);
        open.addEventListener('click',() => { traits=normalize(item.traits); name=item.name; edition=item.edition; syncIdentity(); render(); showScreen('studio'); notify('Your lion is back in the studio.'); });
        const bottom=document.createElement('div'); bottom.className='saved-bottom';
        const hint=document.createElement('span'); hint.textContent='Click to edit & export';
        const remove=document.createElement('button'); remove.className='remove'; remove.type='button'; remove.textContent='Remove'; remove.setAttribute('aria-label',`Remove ${item.name} from your pride`);
        remove.addEventListener('click',() => { if (persist(saved.filter(lion => lion.id!==item.id))) { refreshCollection(); notify('Lion removed from your pride.'); } });
        bottom.append(hint,remove); card.append(open,bottom); $('gallery').append(card);
      });
      if(refreshed)persist(saved);
    }
    function showScreen(screen) {
      const studio=screen==='studio'; $('studio-screen').hidden=!studio; $('collection-screen').hidden=studio;
      $('studio-tab').setAttribute('aria-current',studio?'page':'false'); $('collection-tab').setAttribute('aria-current',studio?'false':'page');
      if (!studio) refreshCollection(); history.replaceState(null,'',studio?'#studio':'#collection');
    }
    $('shuffle').addEventListener('click',() => {
      const unlocked=categories.filter(cat => !locked.has(cat.key));
      if (!unlocked.length) { notify('Every trait is locked. Unlock one to shuffle your lion.'); return; }
      const previous={...traits}; const random=normalize(art.randomize({...traits}));
      unlocked.forEach(cat => { traits[cat.key]=random[cat.key]; });
      if (unlocked.every(cat => traits[cat.key]===previous[cat.key])) {
        const cat=unlocked.find(item => item.options.length>1);
        if (cat) traits[cat.key]=cat.options[(cat.options.findIndex(item => item.id===traits[cat.key])+1)%cat.options.length].id;
      }
      render(); notify('New look. Same questionable attitude.');
    });
    $('reset').addEventListener('click',() => { traits={...defaults}; name=defaultName; edition=1; locked.clear(); syncIdentity(); updateLocks(); render(); notify('The original lion is back.'); });
    $('character-name').addEventListener('input',event => { name=event.target.value; $('art-name').textContent=name.trim()||defaultName; });
    $('character-name').addEventListener('change',() => { name=name.trim()||defaultName; syncIdentity(); });
    $('edition').addEventListener('input',event => { edition=normalizeEdition(event.target.value); $('edition-tag').textContent=`PRIDE #${paddedEdition()}`; });
    $('edition').addEventListener('change',syncIdentity);
    $('download-svg').addEventListener('click',() => { downloadBlob(new Blob([art.renderSVG(traits,{size:1024})],{type:'image/svg+xml;charset=utf-8'}),fileName('svg')); notify('SVG ready. Check your browser downloads.'); });
    $('download').addEventListener('click',async() => {
      const button=$('download'); const snapshot={...traits}; const filename=fileName('png'); const size=Number($('resolution').value); button.disabled=true;
      try {
        const canvas=await rasterize(snapshot,size);
        const blob=await new Promise(resolve => canvas.toBlob(resolve,'image/png'));
        if (!blob) throw new Error('PNG export failed. Please try again.'); downloadBlob(blob,filename); notify('PNG ready. Check your browser downloads.');
      } catch(error) { notify(error.message); } finally { button.disabled=false; }
    });
    $('metadata').addEventListener('click',() => {
      const metadata={name:`${name.trim()||defaultName} #${paddedEdition()}`,description:'An original PRIDE lion PFP. Born to stand out. Too chill to try.',image:fileName('png'),attributes:categories.map(cat => ({trait_type:cat.label,value:option(cat.key).label}))};
      downloadBlob(new Blob([JSON.stringify(metadata,null,2)],{type:'application/json'}),fileName('json'));
      notify('Traits exported. Replace the image filename with its hosted URI before minting.');
    });
    $('save').addEventListener('click',async() => {
      if (saved.length>=60) { notify('Your pride is full (60 lions). Export or remove a lion to make room.'); return; }
      const button=$('save'); button.disabled=true;
      const snapshot={traits:{...traits},name:name.trim()||defaultName,edition};
      try {
        const canvas=await rasterize(snapshot.traits,256);
        const item={...snapshot,artVersion:art.version,id:globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,thumbnail:canvas.toDataURL('image/png')};
        if (persist([item,...saved])) { refreshCollection(); notify('Saved. Your pride just got a little bigger.'); }
      } catch(error) { notify(error.message); } finally { button.disabled=false; }
    });
    $('studio-tab').addEventListener('click',() => showScreen('studio'));
    $('collection-tab').addEventListener('click',() => showScreen('collection'));
    $('back-studio').addEventListener('click',() => showScreen('studio'));
    $('empty-create').addEventListener('click',() => showScreen('studio'));
    document.querySelector('.brand').addEventListener('click',event => { event.preventDefault(); showScreen('studio'); });
    $('concept-open').addEventListener('click',() => { $('concept-image').innerHTML=art.renderSVG(traits,{size:1600}).replaceAll('pride-','pride-modal-'); $('concept-dialog').showModal(); });
    $('concept-close').addEventListener('click',() => $('concept-dialog').close());
    $('concept-dialog').addEventListener('click',event => { if (event.target===$('concept-dialog')) { const rect=$('concept-dialog').getBoundingClientRect(); if (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) $('concept-dialog').close(); } });
    try {
      const stored=JSON.parse(localStorage.getItem(storageKey)||'[]');
      if (Array.isArray(stored)) saved=stored.filter(item => item && typeof item.id==='string' && typeof item.name==='string' && item.traits && typeof item.thumbnail==='string' && item.thumbnail.startsWith('data:image/png;base64,')).slice(0,60).map(item => ({id:item.id,name:item.name.slice(0,48)||defaultName,edition:normalizeEdition(item.edition),traits:normalize(item.traits),thumbnail:item.thumbnail,artVersion:item.artVersion}));
    } catch(_) { /* Export still works if browser storage is blocked. */ }
    buildControls(); render(); refreshCollection();
    if (location.hash==='#collection') showScreen('collection');
  })().catch(error => {
    document.getElementById('artwork').textContent='The artwork could not load. Reopen the downloaded HTML file in a browser.';
    console.error(error);
  });
