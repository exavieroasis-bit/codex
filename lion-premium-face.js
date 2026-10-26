/* PRIDE premium facial expressions — inked overlays for the illustrated lion. */
(function (global) {
  'use strict';
  const INK = '#201916';
  const eyes = {
    amber:['#c38b35','#e3bc6d','#7b4f20'],
    green:['#4d8e70','#a1c5a0','#2d5748'],
    blue:['#6bacca','#b8ddea','#3c668b'],
    violet:['#8c72b1','#c3a8dd','#584575'],
    red:['#b85c53','#e6a27e','#773f3c'],
    black:['#454548','#9a9290','#29272b'],
    gold:['#d9b342','#fff0a3','#96702c']
  };
  const palette = p => ({fur:'#eaae53',shadow:'#ce8e40',light:'#f5c77b',muzzle:'#fadeb4',muzzleShade:'#d6b482',ink:INK,...p});
  const n = (value,fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const path = (d,fill,extra='') => `<path d="${d}" fill="${fill}" ${extra}/>`;
  const line = (d,w=3,color=INK,extra='') => path(d,'none',`stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}`);
  const oval = (x,y,rx,ry,fill,extra='') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
  function at(a,fallback) {
    return {x:n(a?.x,fallback.x),y:n(a?.y,fallback.y),width:Math.max(10,n(a?.width,fallback.width)),height:Math.max(8,n(a?.height,fallback.height)),rotation:n(a?.rotation,0)};
  }
  function iris(color,type,far) {
    const [mid,light,dark]=eyes[color] || eyes.amber;
    if (type==='hearts') {
      return `<g transform="translate(${far?10:21} 1)">`+
        path('M0 26C-13 14-31-1-29-17C-26-33-9-36 0-20C11-36 29-31 31-16C34 0 15 17 0 26Z',mid,`stroke="${INK}" stroke-width="3"`)+
        path('M-22-16Q-18-26-11-23L-5-13Q-13-20-17-10Z',light)+
        line('M4 20Q20 5 23-8',1.7,dark)+
        oval(-17,-18,3.3,4.2,'#fff0d4')+'</g>';
    }
    const cx=far?13:24;
    let art=oval(cx,2,type==='wide'?37:32,48,dark,`stroke="${INK}" stroke-width="2.6"`)
      +oval(cx,2,type==='wide'?31:27,43,mid)
      +path(`M ${cx-26} -5 Q ${cx-16} -35 ${cx+7} -38 L ${cx+4} -20 Q ${cx-11} -17 ${cx-13} 8 Z`,light)
      +path(`M ${cx+18} -27 Q ${cx+34} 0 ${cx+14} 32 L ${cx+6} 14 Q ${cx+19} 0 ${cx+12} -18 Z`,dark);
    for(let i=0;i<10;i++) {
      const angle=(i*31+9)*Math.PI/180;
      const x1=cx+Math.cos(angle)*18, y1=2+Math.sin(angle)*29;
      const x2=cx+Math.cos(angle)*26, y2=2+Math.sin(angle)*40;
      art+=line(`M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`,i%3===0?1.7:1.1,i%2?light:dark);
    }
    art+=path(`M ${cx-2} -35 C ${cx-17} -4 ${cx-10} 24 ${cx+2} 40 C ${cx+11} 18 ${cx+12} -13 ${cx-2} -35 Z`,INK)
      +oval(cx-12,-19,6.6,8,'#fff1d7')+oval(cx+12,17,2.5,3,'#f0dec0');
    return art;
  }
  function oneEye(state,a,far,p) {
    const color=Object.hasOwn(eyes,state.eyeColor)?state.eyeColor:'amber';
    const type=['bored','sleepy','angry','wide','hearts','cyborg'].includes(state.eyeType)?state.eyeType:'bored';
    const eyePath=far?'M-82-29C-40-55 35-60 75-23C98 1 93 31 62 42C16 53-42 45-72 29C-94 13-98-9-82-29Z':'M-96-18C-70-55-15-57 40-42C70-32 85-8 98 40C39 42-17 35-52 24C-77 15-89 0-96-18Z';
    const id=far?'pride-premium-eye-far':'pride-premium-eye-near';
    const transform=`translate(${a.x} ${a.y}) rotate(${a.rotation}) scale(${a.width/200} ${a.height/100})`;
    const lidEdge=(type==='bored'||type==='cyborg')?(far?'M-107-5C-30-18 38-13 108 4':'M-109-12C-29-19 39-5 109 18'):
      type==='sleepy'?(far?'M-108 22Q-4 5 108 20':'M-109 13C-27 5 42 20 110 32'):
      type==='angry'?(far?'M-108 23Q-6-5 108-23':'M-109-26Q-5-4 109 33'):'';
    const lid=(type==='bored'||type==='cyborg')?(far?'M-115-80H115V4C37-13-26-18-115-4Z':'M-115-80H115V19C37-5-27-20-115-11Z'):
      type==='sleepy'?(far?'M-115-80H115V20Q-4 5-115 23Z':'M-115-80H115V32C39 19-27 5-115 13Z'):
      type==='angry'?(far?'M-115-80H115V-24Q-6-4-115 24Z':'M-115-80H115V35Q-4-4-115-28Z'):'';
    let art=`<g transform="${transform}"><defs><clipPath id="${id}">${path(eyePath,'white')}</clipPath><linearGradient id="${id}-sclera" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8a785"/><stop offset=".45" stop-color="#e7ddc1"/><stop offset="1" stop-color="#eee5cd"/></linearGradient><linearGradient id="${id}-lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.light}"/><stop offset=".62" stop-color="${p.fur}"/><stop offset="1" stop-color="${p.shadow}"/></linearGradient></defs>`;
    // The illustrated socket remains the exterior outline; all new paint stays inside it.
    art+=`<g clip-path="url(#${id})">`+path(eyePath,`url(#${id}-sclera)`)+iris(color,type,far);
    if(lid) {
      art+=path(lid,`url(#${id}-lid)`);
      const grain=far?[-73,-52,-29,-5,18,41,61,78]:[-91,-72,-51,-27,-4,22,45,65,81];
      for(let i=0;i<grain.length;i++) {
        const x=grain[i],y=-35+Math.sin(i*1.7)*6;
        art+=line(`M ${x} ${y} q 3 -4 6 -5`,1.1,i%3===0?p.shadow:p.light,'opacity=".42"');
      }
      art+=path(lidEdge,'none',`stroke="${INK}" stroke-width="4.3"`);
      art+=path(lidEdge,'none',`stroke="${p.shadow}" stroke-width="1.3" transform="translate(0 -3.4)" opacity=".6"`);
    }
    if(type==='wide'||type==='hearts') art+=path('M-115-75H115V-21C43-42-35-43-115-14Z','#493321','opacity=".12"');
    art+='</g>';
    art+=path(eyePath,'none',`stroke="${INK}" stroke-width="2" opacity=".88"`);
    // Fine creases follow the existing fur and avoid drawing a second eyebrow over it.
    if(type==='sleepy') art+=line(far?'M-62 57Q-4 72 54 55':'M-62 47Q-3 66 72 52',1.9,p.shadow,'opacity=".66"')+
      line(far?'M-47 66Q-2 77 38 63':'M-46 58Q0 73 52 65',1.1,p.shadow,'opacity=".48"');
    else if(type==='angry') art+=line(far?'M-70-39Q-11-46 57-64':'M-76-48Q-6-44 64-22',3.3,INK,'opacity=".84"')+
      line(far?'M-72-51L-80-62':'M70-47L78-65',1.9,p.shadow,'opacity=".65"');
    else art+=line(far?'M-56 55Q-3 64 49 53':'M-55 45Q-3 59 66 48',1.6,p.shadow,'opacity=".52"');
    if(type==='cyborg'&&far) {
      const [mid,light,dark]=eyes[color];
      art+=path('M-104-48L-63-72L53-69L94-38L102 23L72 62L-40 70L-101 38Z','#1b1815','opacity=".25" transform="translate(5 6)"')+
        path('M-104-48L-63-72L53-69L94-38L102 23L72 62L-40 70L-101 38Z','#858f8b',`stroke="${INK}" stroke-width="4"`)+
        path('M-99-44L-60-66L48-63L72-45L-78-18L-94 24Z','#c8cfc3')+
        path('M73-48L89-33L96 20L67 55L-37 64L-83 42L-38 50L61 38L77 15Z','#52605c')+
        oval(1,-2,66,59,'#303b3a',`stroke="${INK}" stroke-width="3.6"`)+
        oval(1,-2,53,46,'#687c72',`stroke="#cbd0b9" stroke-width="1.7"`)+
        oval(1,-2,39,35,dark,`stroke="${INK}" stroke-width="2"`)+oval(1,-2,29,27,mid)+oval(1,-2,16,16,light)+oval(1,-2,6,8,'#fff4cf')+
        line('M-24-27L-8-14M13 11L28 25M-31 18L-15 9M21-18L33-28',2,light)+
        line('M-80-35L-68-44M-72 39L-60 46M69-30L77-21M66 38L75 28',2.2,'#e0dfcb');
      for(const [x,y] of [[-77,-48],[-80,27],[66,-35],[72,26]]) art+=oval(x,y,4,4,'#dbe0ce',`stroke="${INK}" stroke-width="1.7"`)+line(`M ${x-1.7} ${y} H ${x+1.7}`,1.2);
    }
    return art+'</g>';
  }
  function renderEyes(state,anchors,pal) {
    const p=palette(pal),a=anchors?.eyes || anchors || {};
    const left=at(a.left,{x:582,y:364,width:105,height:58});
    const right=at(a.right,{x:740,y:365,width:49,height:53});
    return `<g stroke-linecap="round" stroke-linejoin="round">${oneEye(state,left,false,p)}${oneEye(state,right,true,p)}</g>`;
  }
  function tooth(d,fill='#f4e8cb') {return path(d,fill,`stroke="${INK}" stroke-width="2.2"`);}
  // Mouths share the lion's actual curved muzzle seam instead of a floating horizontal smile.
  const seam='M-96-8C-34-10 43-27 91-43';
  const opening='M-96-8C-34-10 43-27 91-43C78-10 40 20-8 22C-46 23-79 9-96-8Z';
  function smile(p,gold=false) {
    const toothFill=gold?'#d9ac44':'#efe1bf';
    let art=path(opening,'url(#pride-premium-mouth-depth)',`stroke="${INK}" stroke-width="2.7"`)+
      path('M-91-7C-32-7 40-24 87-40L78-22C30-4-27 8-80 4Z',toothFill,`stroke="${INK}" stroke-width="1.9"`)+
      path('M-56 13C-17 23 24 15 57 2L46 13C13 29-26 29-56 13Z',gold?'#a9782a':'#c9b997');
    for(const [x,y] of [[-65,0],[-40,-2],[-13,-7],[15,-14],[43,-24],[68,-33]]) art+=line(`M ${x} ${y} l 1 10`,1.2,gold?'#6c4c22':'#7d705d');
    art+=line('M-79 15C-35 37 8 40 49 22',1.1,p.muzzleShade,'opacity=".55"');
    if(gold) art+=path('M-75-3L-68-3L-67 5L-74 5ZM-41-3L-35-4L-34 4L-40 5ZM10-13L16-15L17-6L11-4ZM58-28L64-30L64-21L58-19Z','#f7d97e')+
      path('M-14-5L-10-10L-6-6L-10-1ZM38-23L42-28L46-24L42-19Z','#fff6d7',`stroke="#8c6829" stroke-width=".7"`)+line('M-10-13V2M-17-6H-3M42-32V-16M35-24H49',.7,'#fff4d2');
    return art;
  }
  function renderMouth(state,anchors,pal) {
    const p=palette(pal),a=at(anchors?.mouth||{},{x:663,y:640,width:140,height:75,rotation:-12});
    const type=['smirk','bored','grin','snarl','tongue','gold','bubble','cigar'].includes(state.mouth)?state.mouth:'smirk';
    let art='<defs><linearGradient id="pride-premium-mouth-depth" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#482e28"/><stop offset=".6" stop-color="#221b1a"/><stop offset="1" stop-color="#302020"/></linearGradient></defs>';
    if(['smirk','bubble','cigar'].includes(type)) {
      art+=line(seam,2.1,INK,'opacity=".88"')+
        line('M85-45Q91-48 97-42',1.5,INK)+line('M-98-9L-103-13',1.1,INK);
      if(type==='smirk') art+=path('M48-28L61-32L57-15Q53-10 50-19Z','#f1e4c4',`stroke="${INK}" stroke-width="1.5"`)+path('M51-26L57-28L55-17Z','#fff2d7');
    } else if(type==='bored') {
      art+=line('M-96-7C-25-15 36-27 90-41',2,INK,'opacity=".88"')+
        line('M-98-11L-99-5M87-45L94-39',1.3,INK)+line('M-58 0C-12-5 28-14 61-25',1.1,p.muzzleShade,'opacity=".55"');
    } else if(type==='grin'||type==='gold') art+=smile(p,type==='gold');
    else if(type==='snarl') {
      art+=path('M-96-8Q-80-25-60-16C-17-8 38-25 91-43C80-12 39 20-8 22C-47 22-79 9-96-8Z','url(#pride-premium-mouth-depth)',`stroke="${INK}" stroke-width="2.8"`)+
        path('M-88-10Q-76-19-61-12L-62-3Q-75-4-85 1Z','#9d6b5e')+
        tooth('M-84-9L-68-9Q-59 7-61 24Q-76 17-84-9Z')+
        tooth('M63-29L83-38Q78-14 58 4Q63-17 63-29Z')+
        tooth('M-46-6Q-7-6 42-23L36-11Q-6 5-41 4Z')+
        line('M-18-5L-17 5M8-11L9 0',1.1,'#7b6a55')+
        tooth('M-34 15L-28 3L-19 20ZM30 16L37 0L44 9Z','#d9cba9')+
        line('M-93-23Q-80-31-65-25M-92-31L-82-36M72-49L82-55',1.8,p.muzzleShade,'opacity=".65"');
    } else if(type==='tongue') {
      art+=path(opening,'url(#pride-premium-mouth-depth)',`stroke="${INK}" stroke-width="2.7"`)+tooth('M-80-7L-63-8L-60 7Q-72 6-80-7Z')+
        path('M1 7C15-2 39-6 53-2L58 24C61 49 31 64 11 49Q1 32 1 7Z','#bb7771',`stroke="${INK}" stroke-width="2.3"`)+
        path('M10 7Q27-1 44 4L46 20Q25 16 11 26Z','#dba197')+line('M29 7Q34 25 32 43',1.4,'#8c4e4a')+line('M15 49Q36 60 51 43',1.1,'#dfaea0');
    }
    if(type==='bubble') {
      art+=path('M88-37L98-43L102-28L91-26Z','#aa6178',`stroke="${INK}" stroke-width="1.3"`)+
        oval(130,-35,45,43,'#d48a9c',`stroke="${INK}" stroke-width="2.1"`)+
        path('M95-41C98-66 129-81 153-63C137-69 115-67 107-53L104-43Z','#ecc0c7')+
        path('M158-51C173-26 157 2 135 5Q159-4 163-25Z','#b5667e')+oval(105,-54,3.7,5.5,'#fae0d9')+line('M118-65Q132-69 143-63',1.4,'#f7d5d6');
    }
    if(type==='cigar') {
      art+=`<g transform="translate(91 -42) rotate(-10)">`+
        path('M0-7L106-11Q120-10 122 4Q122 17 109 19L0 13Z','#885a3b',`stroke="${INK}" stroke-width="2.3"`)+
        path('M6-5L108-8Q115-4 114 1L8 4Z','#aa794f')+
        path('M7 9L109 11Q117 7 118 5Q122 17 107 18L4 13Z','#66442f')+
        path('M57-9L71-10L73 17L59 16Z','#c9a85a',`stroke="${INK}" stroke-width="1.3"`)+
        path('M60-6L67-7L69 12L63 12Z','#e8cb84')+
        oval(116,3,8,15,'#9d9a8b',`stroke="${INK}" stroke-width="1.6"`)+oval(118,3,4,10,'#b65537')+
        path('M115-8L119-4L116-1L121 3L117 6L120 9L115 13','none','stroke="#484138" stroke-width="1.5"')+
        line('M19-2L34 0M37-1L48 3M80-4L96-2M24 8L41 6M84 8L99 6',.9,'#573c2b')+
        line('M120-14C104-35 121-44 117-58C114-70 103-76 108-89',1.8,'#ebe3cc','opacity=".72"')+
        line('M127-20C116-35 132-43 128-59',1,'#f3ead8','opacity=".55"')+'</g>';
    }
    return `<g transform="translate(${a.x} ${a.y}) rotate(${a.rotation}) scale(${a.width/210})" stroke-linecap="round" stroke-linejoin="round">${art}</g>`;
  }
  global.LionPremiumFace={renderEyes,renderMouth};
})(typeof window!=='undefined'?window:globalThis);
