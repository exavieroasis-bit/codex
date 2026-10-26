/* Illustrated wearable layers, individually fitted to the existing lion rig. */
(function(global){
  'use strict';
  const HATS='__ATELIER_WEARABLES__';
  const CLOTHES='__ATELIER_WARDROBE__';
  const geometry=global.LionAtelierGeometry;
  const hatFits={
    crown:{center:565,width:440,bottom:268,seat:239},
    beanie:{center:565,width:430,bottom:269,seat:248},
    cap:{center:590,width:470,bottom:282,seat:237},
    bucket:{center:565,width:455,bottom:282,seat:253},
    cowboy:{center:565,width:570,bottom:276,seat:239},
    sailor:{center:564,width:433,bottom:278,seat:253},
    halo:{center:590,width:290,bottom:36,seat:0}
  };
  const topFits={
    varsity:{x:-96,y:617,width:1230},hoodie:{x:-98,y:602,width:1240},
    tee:{x:-85,y:683,width:1220},denim:{x:-98,y:614,width:1240},
    suit:{x:-92,y:615,width:1230},tank:{x:5,y:674,width:1050},
    aloha:{x:-95,y:626,width:1230},mariner:{x:-65,y:702,width:1200}
  };
  const openings={crown:[214,399,143,22,16],beanie:[637,393,148,21,-5],bucket:[225,792,174,29,-3],sailor:[1048,756,143,23,12]};
  function opening(state,fill){
    const oval=openings[state.hat];if(!oval)return '';
    const fit=hatFits[state.hat],box=geometry.wearables.items[state.hat].box;
    const height=Math.min(state.hat==='crown'?275:240,fit.width*box[3]/box[2]);
    const [x,y,rx,ry,angle]=oval;
    return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="translate(${fit.center-fit.width/2} ${fit.bottom-height}) scale(${fit.width/box[2]} ${height/box[3]}) translate(${-box[0]} ${-box[1]}) rotate(${angle} ${x} ${y})" fill="${fill}"/>`;
  }
  function definition(state){
    let defs='';
    if(state.hat!=='none'||['round','aviator'].includes(state.glasses))defs+=`<image id="pride-wearable-atlas" href="${HATS}" width="${geometry.wearables.width}" height="${geometry.wearables.height}"/>`;
    if(state.top!=='none')defs+=`<image id="pride-wardrobe-atlas" href="${CLOTHES}" width="${geometry.wardrobe.width}" height="${geometry.wardrobe.height}"/>`;
    return defs;
  }
  function asset(kind,key,x,y,width,height,extra=''){
    const data=geometry[kind].items[key];
    const [sx,sy,sw,sh]=data.box;
    const id=`pride-atelier-${kind}-${key}`;
    const atlas=kind==='wearables'?'pride-wearable-atlas':'pride-wardrobe-atlas';
    return `<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${sx} ${sy} ${sw} ${sh}" preserveAspectRatio="none" overflow="hidden" ${extra}><defs><clipPath id="${id}"><path d="${data.path}"/></clipPath></defs><g clip-path="url(#${id})"><use href="#${atlas}"/></g></svg>`;
  }
  function renderHat(state){
    if(state.hat==='none')return '';
    const fit=hatFits[state.hat],box=geometry.wearables.items[state.hat].box;
    const h=Math.min(state.hat==='halo'?105:state.hat==='crown'?275:240,fit.width*box[3]/box[2]);
    const illustration=asset('wearables',state.hat,fit.center-fit.width/2,fit.bottom-h,fit.width,h);
    if(!openings[state.hat])return illustration;
    return `<defs><mask id="pride-hat-opening" maskUnits="userSpaceOnUse" x="0" y="-300" width="1100" height="700" style="mask-type:luminance"><rect x="0" y="-300" width="1100" height="700" fill="white"/>${opening(state,'black')}</mask></defs><g mask="url(#pride-hat-opening)">${illustration}</g>`;
  }
  function renderTop(state){
    if(state.top==='none')return '';
    const f=topFits[state.top],box=geometry.wardrobe.items[state.top].box;
    return asset('wardrobe',state.top,f.x,f.y,f.width,f.width*box[3]/box[2]);
  }
  function occludeHat(state){
    if(state.hat==='none'||state.hat==='halo')return '';
    const f=hatFits[state.hat],data=geometry.wearables.items[state.hat],box=data.box;
    const height=Math.min(state.hat==='crown'?275:240,f.width*box[3]/box[2]);
    return `<g transform="translate(${f.center-f.width/2} ${f.bottom-height}) scale(${f.width/box[2]} ${height/box[3]}) translate(${-box[0]} ${-box[1]})"><path d="${data.occluder}" fill="black"/></g>`;
  }
  function hatContact(state){
    if(state.hat==='none'||state.hat==='halo')return '';
    const f=hatFits[state.hat];
    return `<path d="M${f.center-f.width*.42} ${f.seat-10}Q${f.center} ${f.seat-17} ${f.center+f.width*.42} ${f.seat+11}" stroke="#22110d" stroke-opacity=".23" stroke-width="8" fill="none" filter="url(#pride-atelier-contact)"/>`;
  }
  function renderGlasses(state){
    if(!['round','aviator'].includes(state.glasses))return null;
    // Atlas lenses were drawn in the same strong near/far perspective as this face.
    const crops=state.glasses==='round'?[[599,954,126,160],[744,1012,88,109]]:[[931,953,185,172],[1147,1018,92,126]];
    const lens=(box,x,y,w,h)=>`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${box.join(' ')}" preserveAspectRatio="none" overflow="hidden"><use href="#pride-wearable-atlas"/></svg>`;
    return `<g stroke-linecap="round" fill="none"><path d="M519 349Q500 338 493 340M771 349L782 344" stroke="#8e6c2d" stroke-width="3.5"/><path d="M647 355Q680 339 708 355" stroke="#6d4d21" stroke-width="4"/><path d="M647 353Q680 338 708 353" stroke="#e1c171" stroke-width="1.6"/>${lens(crops[0],516,316,132,96)}${lens(crops[1],708,330,64,74)}</g>`;
  }
  function restoreHatOpening(state){
    if(!openings[state.hat])return '';
    return `<defs><clipPath id="pride-worn-hat-aperture">${opening(state,'white')}</clipPath></defs><g clip-path="url(#pride-worn-hat-aperture)"><use href="#pride-base-image" filter="url(#pride-fur-color)"/></g>`;
  }
  global.LionAtelier={definition,renderHat,renderTop,occludeHat,hatContact,renderGlasses,restoreHatOpening};
})(window);
