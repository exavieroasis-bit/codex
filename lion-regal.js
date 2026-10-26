/* Dedicated full-resolution pieces for the refined blue-lion portrait. */
(function(global){
  'use strict';
  const CAP='__REGAL_CAP__';
  const GLASSES='__REGAL_GLASSES__';
  const cap={x:330,y:-26,width:510,height:312,box:[22,236,1218,745]};
  function definitions(state){
    let defs='';
    if(state.hat==='cap')defs+=`<image id="pride-regal-cap" href="${CAP}" width="1254" height="1254"/>`;
    if(['round','aviator'].includes(state.glasses))defs+=`<image id="pride-regal-glasses" href="${GLASSES}" width="1774" height="887"/><filter id="pride-silver-frames" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values=".15"/></filter><clipPath id="pride-glasses-front"><rect x="490" y="275" width="335" height="170"/></clipPath>`;
    return defs;
  }
  function renderCap(){
    return `<svg x="${cap.x}" y="${cap.y}" width="${cap.width}" height="${cap.height}" viewBox="${cap.box.join(' ')}" preserveAspectRatio="none" overflow="visible"><use href="#pride-regal-cap"/></svg>`;
  }
  function renderGlasses(state){
    if(!['round','aviator'].includes(state.glasses))return null;
    // One intact pair: both rims, bridge, highlights and pads share a single plane.
    const sx=158/647,sy=.16,shear=(1-sy*52)/647;
    const tx=582-sx*837,ty=364-shear*837-sy*446;
    return `<g clip-path="url(#pride-glasses-front)"${state.glasses==='round'?' filter="url(#pride-silver-frames)"':''}><use href="#pride-regal-glasses" transform="matrix(${sx} ${shear} 0 ${sy} ${tx} ${ty})"/></g>`;
  }
  function capShadow(){
    return '<path d="M360 246Q489 214 644 237Q745 245 808 278" fill="none" stroke="#141b25" stroke-opacity=".22" stroke-width="10" filter="url(#pride-atelier-contact)"/>';
  }
  global.LionRegal={definitions,renderCap,renderGlasses,capShadow};
})(window);
