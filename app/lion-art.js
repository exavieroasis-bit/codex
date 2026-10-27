/* PRIDE — unified, in-situ painted character variations, flattened before display. */
(function(global){
  'use strict';
  const traits = [
    {key:'background',label:'Background',options:[{id:'mint',label:'Mint',color:'#b8c9bc'},{id:'sand',label:'Sand',color:'#dfcda9'},{id:'sky',label:'Powder blue',color:'#acc2cf'},{id:'rose',label:'Dusty rose',color:'#c6a2a3'},{id:'lilac',label:'Lilac',color:'#b6aec8'},{id:'gold',label:'Mustard',color:'#c9b06e'},{id:'ink',label:'Midnight',color:'#525d68'},{id:'cream',label:'Cream',color:'#eee6d5'},{id:'teal',label:'Deep teal',color:'#086a7a'}]},
    {key:'skin',label:'Skin',options:[{id:'safari',label:'Safari tan',color:'#d6a760'},{id:'ivory',label:'Ivory',color:'#e8ddc4'},{id:'charcoal',label:'Charcoal',color:'#5e6069'},{id:'rose',label:'Pink lemonade',color:'#d997a5'},{id:'zombie',label:'Zombie',color:'#a6b882'},{id:'blue',label:'Arctic blue',color:'#91b9c5'},{id:'gold',label:'Solid gold',color:'#e5bd55'},{id:'tiger',label:'Tiger stripes',color:'#d9954e'}]},
    {key:'hat',label:'Hat',options:[{id:'none',label:'No hat'},{id:'beanie',label:'Red beanie',color:'#a74a40'},{id:'cap',label:'Club cap',color:'#435b69'},{id:'bucket',label:'Bucket hat',color:'#c8b87b'},{id:'crown',label:'The crown',color:'#dfbb57'},{id:'cowboy',label:'Outlaw',color:'#9c7651'},{id:'sailor',label:'Sailor',color:'#e5e1d6'},{id:'halo',label:'Golden halo',color:'#e2bb54'}]},
    {key:'glasses',label:'Glasses',options:[{id:'none',label:'No glasses'},{id:'shades',label:'Wayfarers',color:'#302b2b'},{id:'round',label:'Silver navigator',color:'#a5884b'},{id:'aviator',label:'Gold navigator',color:'#b69b65'},{id:'pixel',label:'Pixel shades',color:'#252228'},{id:'heart',label:'Heart frames',color:'#b55361'},{id:'monocle',label:'Monocle',color:'#d0ad59'}]},
    {key:'eyeType',label:'Eye type',options:[{id:'bored',label:'Unbothered'},{id:'sleepy',label:'Sleep deprived'},{id:'angry',label:'Bad mood'},{id:'wide',label:'Wide awake'},{id:'hearts',label:'Lovestruck'},{id:'cyborg',label:'Cyborg'}]},
    {key:'eyeColor',label:'Eye color',options:[{id:'amber',label:'Amber',color:'#bc843d'},{id:'green',label:'Emerald',color:'#4c876d'},{id:'blue',label:'Ice blue',color:'#73a6c4'},{id:'violet',label:'Violet',color:'#9378af'},{id:'red',label:'Crimson',color:'#b65b55'},{id:'black',label:'Onyx',color:'#4a454c'},{id:'gold',label:'Electric gold',color:'#e7c94d'}]},
    {key:'mouth',label:'Mouth',options:[{id:'smirk',label:'Confident'},{id:'bored',label:'Composed'},{id:'grin',label:'Big grin'},{id:'snarl',label:'Fangs out'},{id:'gold',label:'Gold grill'},{id:'bubble',label:'Bubblegum'},{id:'cigar',label:'Cigar club'}]},
    {key:'scar',label:'Face scar',options:[{id:'none',label:'No scars'},{id:'cheek',label:'Cheek stitch'},{id:'claws',label:'Claw marks'},{id:'cross',label:'Cross cut'},{id:'lightning',label:'Lightning bolt'},{id:'bandage',label:'Bandage'},{id:'eyebrow',label:'Brow split'}]},
    {key:'top',label:'Top',options:[{id:'none',label:'Bare fur'},{id:'varsity',label:'Varsity jacket',color:'#48654e'},{id:'hoodie',label:'Oversized hoodie',color:'#d1c7ad'},{id:'tee',label:'Black tee',color:'#39373b'},{id:'denim',label:'Denim jacket',color:'#6b8b9b'},{id:'suit',label:'Night suit',color:'#434752'},{id:'tank',label:'Ribbed tank',color:'#e8dfca'},{id:'aloha',label:'Aloha shirt',color:'#578e88'},{id:'mariner',label:'Mariner stripes',color:'#ede4cf'}]}
  ];
  const defaults = {background:'teal',skin:'blue',hat:'cap',glasses:'aviator',eyeType:'bored',eyeColor:'amber',mouth:'smirk',scar:'none',top:'hoodie'};

  const sources=window.LionPortraitSources;
  const SIDE=1254;
  const images=new Map(),cache=new Map();
  const anchors={eyes:{left:{x:578,y:411,width:137,height:61,rotation:3},right:{x:716,y:422,width:64,height:54,rotation:4}},mouth:{x:679,y:669,width:147,height:75,rotation:-14},cheek:{x:545,y:522},brow:{x:576,y:366}};
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const validate=state=>Object.fromEntries(traits.map(cat=>[cat.key,cat.options.some(opt=>opt.id===state?.[cat.key])?state[cat.key]:defaults[cat.key]]));
  function canvas(){const c=document.createElement('canvas');c.width=c.height=SIDE;return c;}
  const ready=Promise.all(Object.entries(sources).map(async([key,source])=>{
    const image=new Image();image.crossOrigin='anonymous';image.src=source.src;await image.decode();images.set(key,{image,...source});
  }));
  function paintImage(ctx,key){const plate=images.get(key);if(!plate)throw new Error('Artwork is still loading.');ctx.drawImage(plate.image,plate.x,plate.y,plate.width,plate.height);}
  const smooth=(lo,hi,x)=>{const n=Math.max(0,Math.min(1,(x-lo)/(hi-lo)));return n*n*(3-2*n);};
  const masks=new Map();
  const baselinePixels=new Map();
  function region(key,kind){
    if(masks.has(key)){const hit=masks.get(key);masks.delete(key);masks.set(key,hit);return hit;}
    const source=canvas(),sc=source.getContext('2d',{willReadFrequently:true});paintImage(sc,key);
    const baseline=(kind==='eye'||kind==='scar'||kind==='skin'||(kind==='glasses'&&key!=='glasses-none'))?'glasses-none':'master';
    if(!baselinePixels.has(baseline)){const c=canvas(),mc=c.getContext('2d',{willReadFrequently:true});paintImage(mc,baseline);baselinePixels.set(baseline,mc.getImageData(0,0,SIDE,SIDE).data);}
    const pixels=sc.getImageData(0,0,SIDE,SIDE).data,seed=sc.createImageData(SIDE,SIDE),d=seed.data,base=baselinePixels.get(baseline);
    const box=sources[key];
    for(let y=box.y;y<box.y+box.height;y++)for(let x=box.x;x<box.x+box.width;x++){
      // Keep each edit in its anatomical zone. Hat brims may wrap around the
      // temple, while the eye region stays available to independently chosen frames.
      if(kind==='mouth'&&y<700&&(key!=='mouth-cigar'||x<1040))continue;
      if(kind==='skin'&&y>444&&y<600)continue;
      if(kind==='hat'&&y>448&&x>565&&x<977)continue;
      if(kind==='scar'&&key!=='scar-eyebrow'&&(y<560||x>800))continue;
      if(kind==='scar'&&key==='scar-eyebrow'&&(y>515||x<620||x>825))continue;
      const i=(y*SIDE+x)*4;
      const alpha=Math.abs(pixels[i+3]-base[i+3]);
      const difference=Math.max(...[0,1,2].map(c=>Math.abs(pixels[i+c]*pixels[i+3]/255-base[i+c]*base[i+3]/255)));
      d[i]=d[i+1]=d[i+2]=255;d[i+3]=(alpha>24||difference>25)?255:0;
    }
    sc.putImageData(seed,0,0);
    const blurred=canvas(),bc=blurred.getContext('2d',{willReadFrequently:true});bc.filter='blur(9px)';bc.drawImage(source,0,0);bc.filter='none';
    const field=bc.getImageData(0,0,SIDE,SIDE),fd=field.data;
    for(let y=0;y<SIDE;y++)for(let x=0;x<SIDE;x++){
      const i=(y*SIDE+x)*4;
      const inBox=x>=box.x&&x<box.x+box.width&&y>=box.y&&y<box.y+box.height;
      let boundary=kind==='hat'?(1-smooth(440,458,y))+(smooth(962,990,x)+1-smooth(550,575,x))*smooth(440,458,y):1;
      // Clear monocle keeps the selected painted eyes beneath its lens.
      if(kind==='skin'&&y>444&&y<600)boundary=0;
      if(key==='glasses-monocle'&&(((x-716)/52)**2+((y-520)/29)**2<1||((x-891)/24)**2+((y-535)/24)**2<1))boundary=0;
      fd[i]=fd[i+1]=fd[i+2]=255;fd[i+3]=inBox?Math.round(255*smooth(.005,.11,fd[i+3]/255)*Math.min(1,boundary)):0;
    }
    bc.putImageData(field,0,0);masks.set(key,blurred);if(masks.size>12)masks.delete(masks.keys().next().value);return blurred;
  }
  function replaceRegion(ctx,key,kind){
    // A plate contains the wearable AND its surrounding anatomy. Replace the
    // whole contact region; never paste the accessory's own cutout silhouette.
    const mask=region(key,kind),plate=canvas(),pc=plate.getContext('2d');paintImage(pc,key);
    pc.globalCompositeOperation='destination-in';pc.drawImage(mask,0,0);
    ctx.save();ctx.globalCompositeOperation='destination-out';ctx.drawImage(mask,0,0);
    // Add complementary premultiplied contributions, preserving continuous
    // alpha through the feather (source-over would produce a transparent gap).
    ctx.globalCompositeOperation='lighter';ctx.drawImage(plate,0,0);ctx.restore();
  }
  const skinStyles={safari:[37,.70,1],ivory:[43,.15,1.12],charcoal:[217,.08,.57],rose:[341,.45,1.03],zombie:[83,.30,.94],gold:[45,.82,1.06],tiger:[30,.81,1]};
  function rgb(h,s,l){
    const a=s*Math.min(l,1-l),f=n=>{const k=(n+h/30)%12;return l-a*Math.max(-1,Math.min(k-3,9-k,1));};return [f(0),f(8),f(4)];
  }
  function recolor(ctx,skin){
    if(skin==='blue')return;
    const [target,saturation,lightness]=skinStyles[skin],data=ctx.getImageData(0,0,SIDE,SIDE),d=data.data;
    for(let i=0;i<d.length;i+=4){
      if(d[i+3]===0)continue;
      const r=d[i]/255,g=d[i+1]/255,b=d[i+2]/255,hi=Math.max(r,g,b),lo=Math.min(r,g,b),delta=hi-lo;
      // Only the cyan fur pigment moves. Navy fabric, gold metal, lenses,
      // muzzle ink and garment colors retain their original painted material.
      if(b<=g||g<=r||delta<.018)continue;
      if(delta/(1-Math.abs(hi+lo-1)||1)<.25)continue;
      const ratio=(g-r)/(b-r),weight=smooth(.43,.52,ratio)*smooth(.012,.028,delta);
      if(weight===0)continue;
      let h=(4+(r-g)/delta)*60;
      const l=(hi+lo)/2,newL=Math.min(.97,l*lightness),newS=saturation*(.65+.35*Math.min(1,delta/.3));
      const result=rgb((target+(h-196)*.28+360)%360,newS,newL);
      for(let j=0;j<3;j++)d[i+j]=Math.round(d[i+j]*(1-weight)+result[j]*255*weight);
    }
    ctx.putImageData(data,0,0);
  }
  const irisStyles={green:[150,.48,1],blue:[201,.64,1.05],violet:[270,.50,1.02],red:[0,.58,.95],black:[220,.04,.56],gold:[49,.86,1.16]};
  function eyePigment(ctx,state){
    if(state.eyeColor==='amber'||!['none','monocle'].includes(state.glasses))return;
    const [hue,sat,light]=irisStyles[state.eyeColor],data=ctx.getImageData(640,460,320,130),d=data.data;
    for(let y=0;y<130;y++)for(let x=0;x<320;x++){
      const px=x+640,py=y+460;
      if(((px-716)/38)**2+((py-520)/32)**2>1&&((px-890)/21)**2+((py-535)/27)**2>1)continue;
      const i=(y*320+x)*4,r=d[i]/255,g=d[i+1]/255,b=d[i+2]/255;
      if(r<=g||g<=b||r-b<.07)continue;
      const hi=Math.max(r,g,b),lo=Math.min(r,g,b),l=(hi+lo)/2;
      const out=rgb(hue,sat,Math.min(.96,l*light));
      for(let j=0;j<3;j++)d[i+j]=Math.round(out[j]*255);
    }
    ctx.putImageData(data,640,460);
  }
  function portrait(state){
    const key=JSON.stringify(state);
    if(cache.has(key)){const hit=cache.get(key);cache.delete(key);cache.set(key,hit);return hit;}
    const c=canvas(),ctx=c.getContext('2d',{willReadFrequently:true});
    paintImage(ctx,'master');
    if(state.top!=='hoodie')replaceRegion(ctx,'top-'+state.top,'top');
    if(state.glasses!=='aviator')replaceRegion(ctx,'glasses-none','glasses');
    if(['none','monocle'].includes(state.glasses)&&state.eyeType!=='bored')replaceRegion(ctx,'eye-'+state.eyeType,'eye');
    if(state.mouth!=='smirk')replaceRegion(ctx,'mouth-'+state.mouth,'mouth');
    if(state.skin==='tiger')replaceRegion(ctx,'skin-tiger','skin');
    if(state.scar!=='none')replaceRegion(ctx,'scar-'+state.scar,'scar');
    if(state.glasses==='aviator'&&(state.scar!=='none'||state.skin==='tiger'))replaceRegion(ctx,'glasses-aviator','glasses');
    if(!['none','aviator'].includes(state.glasses))replaceRegion(ctx,'glasses-'+state.glasses,'glasses');
    if(state.hat!=='cap')replaceRegion(ctx,'hat-'+state.hat,'hat');
    recolor(ctx,state.skin);eyePigment(ctx,state);
    ctx.globalCompositeOperation='destination-over';ctx.fillStyle=traits[0].options.find(o=>o.id===state.background).color;ctx.fillRect(0,0,SIDE,SIDE);
    // The live preview and all exported formats use this exact flattened image.
    const result={uri:c.toDataURL('image/png'),canvas:c};cache.set(key,result);
    if(cache.size>5)cache.delete(cache.keys().next().value);
    return result;
  }
  function renderSVG(input,options={}){
    const state=validate(input),size=Math.max(64,Math.min(8192,Math.round(Number(options.size)||1024)));
    const label='PRIDE lion, '+traits[1].options.find(o=>o.id===state.skin).label+', '+traits[2].options.find(o=>o.id===state.hat).label;
    const image=portrait(state).uri;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1254 1254" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title><image width="1254" height="1254" href="${image}"/></svg>`;
  }
  function thumbnail(input,size=256){const c=document.createElement('canvas');c.width=c.height=size;c.getContext('2d').drawImage(portrait(validate(input)).canvas,0,0,size,size);return c.toDataURL('image/png');}
  function randomize(previous){
    const next={};for(const cat of traits){const optional=['hat','glasses','scar'].includes(cat.key);next[cat.key]=optional&&Math.random()<.28?'none':cat.options[Math.floor(Math.random()*cat.options.length)].id;}
    if(previous&&traits.every(cat=>next[cat.key]===previous[cat.key]))next.background=traits[0].options[(traits[0].options.findIndex(o=>o.id===next.background)+1)%traits[0].options.length].id;
    return next;
  }
  global.LionArt={traits,defaults:{...defaults},renderSVG,thumbnail,randomize,validate,anchors,ready,series:'Unified Artist Series',version:'unified-1'};
})(typeof window!=='undefined'?window:globalThis);
