/* PRIDE Artist Series — embedded illustrated lion and premium fitted trait layers. */
(function (global) {
  'use strict';
  const INK = '#251f22';
  const traits = [
    {key:'background',label:'Background',options:[{id:'mint',label:'Mint',color:'#b8c9bc'},{id:'sand',label:'Sand',color:'#dfcda9'},{id:'sky',label:'Powder blue',color:'#acc2cf'},{id:'rose',label:'Dusty rose',color:'#c6a2a3'},{id:'lilac',label:'Lilac',color:'#b6aec8'},{id:'gold',label:'Mustard',color:'#c9b06e'},{id:'ink',label:'Midnight',color:'#525d68'},{id:'cream',label:'Cream',color:'#eee6d5'},{id:'teal',label:'Deep teal',color:'#086a7a'}]},
    {key:'skin',label:'Skin',options:[{id:'safari',label:'Safari tan',color:'#d6a760'},{id:'ivory',label:'Ivory',color:'#e8ddc4'},{id:'charcoal',label:'Charcoal',color:'#5e6069'},{id:'rose',label:'Pink lemonade',color:'#d997a5'},{id:'zombie',label:'Zombie',color:'#a6b882'},{id:'blue',label:'Arctic blue',color:'#91b9c5'},{id:'gold',label:'Solid gold',color:'#e5bd55'},{id:'tiger',label:'Tiger stripes',color:'#d9954e'}]},
    {key:'hat',label:'Hat',options:[{id:'none',label:'No hat'},{id:'beanie',label:'Red beanie',color:'#a74a40'},{id:'cap',label:'Club cap',color:'#435b69'},{id:'bucket',label:'Bucket hat',color:'#c8b87b'},{id:'crown',label:'The crown',color:'#dfbb57'},{id:'cowboy',label:'Outlaw',color:'#9c7651'},{id:'sailor',label:'Sailor',color:'#e5e1d6'},{id:'halo',label:'Golden halo',color:'#e2bb54'}]},
    {key:'glasses',label:'Glasses',options:[{id:'none',label:'No glasses'},{id:'shades',label:'Wayfarers',color:'#302b2b'},{id:'round',label:'Round specs',color:'#a5884b'},{id:'aviator',label:'Aviators',color:'#b69b65'},{id:'pixel',label:'Pixel shades',color:'#252228'},{id:'heart',label:'Heart frames',color:'#b55361'},{id:'monocle',label:'Monocle',color:'#d0ad59'}]},
    {key:'eyeType',label:'Eye type',options:[{id:'bored',label:'Unbothered'},{id:'sleepy',label:'Sleep deprived'},{id:'angry',label:'Bad mood'},{id:'wide',label:'Wide awake'},{id:'hearts',label:'Lovestruck'},{id:'cyborg',label:'Cyborg'}]},
    {key:'eyeColor',label:'Eye color',options:[{id:'amber',label:'Amber',color:'#bc843d'},{id:'green',label:'Emerald',color:'#4c876d'},{id:'blue',label:'Ice blue',color:'#73a6c4'},{id:'violet',label:'Violet',color:'#9378af'},{id:'red',label:'Crimson',color:'#b65b55'},{id:'black',label:'Onyx',color:'#4a454c'},{id:'gold',label:'Electric gold',color:'#e7c94d'}]},
    {key:'mouth',label:'Mouth',options:[{id:'smirk',label:'Side smirk'},{id:'bored',label:'Deadpan'},{id:'grin',label:'Big grin'},{id:'snarl',label:'Fangs out'},{id:'tongue',label:'Tongue out'},{id:'gold',label:'Gold grill'},{id:'bubble',label:'Bubblegum'},{id:'cigar',label:'Cigar club'}]},
    {key:'scar',label:'Face scar',options:[{id:'none',label:'No scars'},{id:'cheek',label:'Cheek stitch'},{id:'claws',label:'Claw marks'},{id:'cross',label:'Cross cut'},{id:'lightning',label:'Lightning bolt'},{id:'bandage',label:'Bandage'},{id:'eyebrow',label:'Brow split'}]},
    {key:'top',label:'Top',options:[{id:'none',label:'Bare fur'},{id:'varsity',label:'Varsity jacket',color:'#48654e'},{id:'hoodie',label:'Oversized hoodie',color:'#d1c7ad'},{id:'tee',label:'Black tee',color:'#39373b'},{id:'denim',label:'Denim jacket',color:'#6b8b9b'},{id:'suit',label:'Night suit',color:'#434752'},{id:'tank',label:'Ribbed tank',color:'#e8dfca'},{id:'aloha',label:'Aloha shirt',color:'#578e88'},{id:'mariner',label:'Mariner stripes',color:'#ede4cf'}]}
  ];
  const defaults = {background:'teal',skin:'safari',hat:'crown',glasses:'none',eyeType:'bored',eyeColor:'amber',mouth:'smirk',scar:'none',top:'mariner'};
  const BASE_IMAGE='__PREMIUM_LION_BASE__';
  const anchors={
    eyes:{left:{x:582,y:364,width:105,height:58,rotation:0},right:{x:740,y:365,width:49,height:53,rotation:0}},
    mouth:{x:663,y:640,width:140,rotation:-12},
    hat:{cx:540,cy:150,width:480,rotation:-3},
    glasses:{left:{x:582,y:364},right:{x:740,y:365},tilt:0},
    top:{neckX:560,neckY:850,leftX:40,rightX:960,shoulderY:880},
    cheek:{x:532,y:468},brow:{x:569,y:310}
  };
  const styles={
    safari:{hue:0,sat:1,r:1,g:1,b:1},
    ivory:{hue:0,sat:.18,r:1.13,g:1.12,b:1.07},
    charcoal:{hue:0,sat:.08,r:.48,g:.51,b:.59},
    rose:{hue:289,sat:.6,r:1.12,g:.94,b:1.08},
    zombie:{hue:43,sat:.62,r:.86,g:1.02,b:.81},
    blue:{hue:160,sat:.62,r:.81,g:1.02,b:1.12},
    gold:{hue:0,sat:.92,r:1.12,g:1.12,b:.79},
    tiger:{hue:-5,sat:1.14,r:1.04,g:.96,b:.88}
  };
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const validate=state=>Object.fromEntries(traits.map(cat=>[cat.key,cat.options.some(opt=>opt.id===state?.[cat.key])?state[cat.key]:defaults[cat.key]]));
  function mappedColor(hex,style){
    const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);
    const angle=style.hue*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle);
    const matrix=[
      [.213+c*.787-s*.213,.715-c*.715-s*.715,.072-c*.072+s*.928],
      [.213-c*.213+s*.143,.715+c*.285+s*.14,.072-c*.072-s*.283],
      [.213-c*.213-s*.787,.715-c*.715+s*.715,.072+c*.928+s*.072]
    ];
    const rotated=matrix.map(row=>Math.max(0,Math.min(1,row.reduce((v,n,i)=>v+n*rgb[i],0))));
    const luminance=rotated[0]*.213+rotated[1]*.715+rotated[2]*.072;
    const scaled=rotated.map((v,i)=>(luminance+(v-luminance)*style.sat)*[style.r,style.g,style.b][i]);
    return '#'+scaled.map(v=>Math.round(Math.max(0,Math.min(1,v))*255).toString(16).padStart(2,'0')).join('');
  }
  function paletteFor(skin){
    const style=styles[skin];
    const source={fur:'#eaae53',shadow:'#bc8037',light:'#f8c677',muzzle:'#fadeb4',muzzleShade:'#e4bf8b'};
    return {...Object.fromEntries(Object.entries(source).map(([key,value])=>[key,mappedColor(value,style)])),ink:'#261b15'};
  }
  function skinMarks(state,palette){
    if(state.skin==='tiger') return `<g fill="#3b291e" opacity=".87"><path d="M504 377q34 16 39 47l-38-24 5-8-14-19Z"/><path d="M493 417q41 17 55 47-24-7-48-27l7-5Z"/><path d="M491 464q35 1 54 23l-29-9-23 1Z"/><path d="M658 250q-20 28-19 58-13-26-6-50Z"/><path d="M687 263q-13 25-9 48-17-18-16-38Z"/><path d="M779 365q-17 17-18 44l25-18-7-7 8-14Z"/><path d="M780 407q-13 17-10 32l20-17Z"/></g>`;
    if(state.skin==='zombie') return `<g stroke="#334b2b" stroke-linecap="round" fill="none"><path d="m534 477 13 8 11-3 11 13" stroke-width="3"/><path d="m536 482 4-8m10 17 4-10m7 16 5-8" stroke-width="2"/><path d="m686 289 5 17-6 12m4-20 9 3m-14 10 10 4" stroke-width="2.7"/></g>`;
    if(state.skin==='gold') return `<g fill="#fff6c7" opacity=".8"><path d="m524 344 4-10 4 10 9 4-9 3-4 10-4-10-9-3Z"/><path d="m777 540 3-7 3 7 7 3-7 3-3 7-3-7-7-3Z"/></g>`;
    return '';
  }
  function renderSVG(input,options={}){
    const state=validate(input),style=styles[state.skin],palette=paletteFor(state.skin);
    const size=Math.max(64,Math.min(8192,Math.round(Number(options.size)||1024)));
    const background=traits[0].options.find(opt=>opt.id===state.background).color;
    const label=`PRIDE Artist Series lion, ${traits[1].options.find(opt=>opt.id===state.skin).label}, ${traits[2].options.find(opt=>opt.id===state.hat).label}`;
    const wear=global.LionPremiumTraits,face=global.LionPremiumFace,atelier=global.LionAtelier;
    const clothing=atelier.renderTop(state);
    const hatOccluder=atelier.occludeHat(state);
    const hatShadow=atelier.hatContact(state);
    const image=`<use href="#pride-base-image" filter="url(#pride-fur-color)"/>`;
    const maneGeometry=global.LionManeGeometry;
    const maneShape=`<path d="${maneGeometry.path}" transform="scale(${maneGeometry.scale})" fill="white"/>`;
    // The connected mane envelope excludes isolated ink on the bare shoulders.
    // Use the unchanged illustration alpha for naturally antialiased fur edges.
    const defs=`<defs>
      ${atelier.definition(state)}
      <filter id="pride-atelier-contact" x="-10%" y="-100%" width="120%" height="300%"><feGaussianBlur stdDeviation="2.3"/></filter>
      <image id="pride-base-image" href="${BASE_IMAGE}" width="1000" height="1000"/>
      <filter id="pride-fur-color" color-interpolation-filters="sRGB" x="-10%" y="-10%" width="120%" height="120%">
        <feColorMatrix type="hueRotate" values="${style.hue}"/>
        <feColorMatrix type="saturate" values="${style.sat}"/>
        <feComponentTransfer><feFuncR type="linear" slope="${style.r}"/><feFuncG type="linear" slope="${style.g}"/><feFuncB type="linear" slope="${style.b}"/></feComponentTransfer>
      </filter>
      <filter id="pride-fur-contact" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.15"/>
        <feOffset dy="3.2" result="shadow-alpha"/>
        <feFlood flood-color="#291b16" flood-opacity=".24"/>
        <feComposite in2="shadow-alpha" operator="in"/>
      </filter>
      <mask id="pride-head-matte" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000" style="mask-type:alpha">
        <rect width="1000" height="747" fill="white"/>
        ${maneShape}
      </mask>
      <mask id="pride-source-alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000" style="mask-type:alpha"><use href="#pride-base-image"/></mask>
      <mask id="pride-hat-seat" maskUnits="userSpaceOnUse" x="-100" y="-300" width="1300" height="1600" style="mask-type:luminance"><rect x="-100" y="-300" width="1300" height="1600" fill="white"/>${hatOccluder}</mask>
      ${clothing?`<g id="pride-garment-layer">${clothing}</g><mask id="pride-garment-alpha" maskUnits="userSpaceOnUse" x="-100" y="0" width="1300" height="1400" style="mask-type:alpha"><use href="#pride-garment-layer"/></mask>`:''}
    </defs>`;
    const body=`${image}${clothing?`<use href="#pride-garment-layer"/><g mask="url(#pride-garment-alpha)"><g filter="url(#pride-fur-contact)"><g mask="url(#pride-head-matte)"><use href="#pride-base-image"/></g></g></g><g mask="url(#pride-head-matte)">${image}</g>`:''}`;
    const figure=`<g mask="url(#pride-hat-seat)">${body}${skinMarks(state,palette)}${face.renderEyes(state,anchors,palette)}${face.renderMouth(state,anchors,palette)}${wear.renderScars(state,anchors,palette)}</g>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}" viewBox="0 0 1000 1000" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>${defs}<rect width="1000" height="1000" fill="${background}"/><g transform="translate(25 105) scale(.9)" stroke-linecap="round" stroke-linejoin="round">${figure}${hatShadow?`<g mask="url(#pride-source-alpha)">${hatShadow}</g>`:''}${atelier.renderGlasses(state)??wear.renderGlasses(state,anchors,palette)}${atelier.restoreHatOpening(state)}${atelier.renderHat(state)}</g></svg>`;
  }
  function randomize(previous){
    const next={};
    for(const cat of traits){
      const optional=['hat','glasses','scar'].includes(cat.key);
      next[cat.key]=optional&&Math.random()<.28?'none':cat.options[Math.floor(Math.random()*cat.options.length)].id;
    }
    if(previous&&traits.every(cat=>next[cat.key]===previous[cat.key])) next.background=traits[0].options[(traits[0].options.findIndex(opt=>opt.id===next.background)+1)%traits[0].options.length].id;
    return next;
  }
  global.LionArt={traits,defaults:{...defaults},renderSVG,randomize,validate,anchors,series:'Artist Series'};
})(typeof window!=='undefined'?window:globalThis);
