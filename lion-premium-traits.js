/* PRIDE Atelier — original illustrated accessory layers. */
(function (global) {
  'use strict';
  const I='#211b1c';
  const P=(d,fill,sw=5,stroke=I,extra='')=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${extra}/>`;
  const L=(d,sw=3,stroke=I,extra='')=>P(d,'none',sw,stroke,extra);
  const E=(x,y,rx,ry,fill,sw=3,stroke=I)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  const C=(x,y,r,fill,sw=3,stroke=I)=>E(x,y,r,r,fill,sw,stroke);
  const group=(s,transform='')=>`<g stroke-linecap="round" stroke-linejoin="round" ${transform?`transform="${transform}"`:''}>${s}</g>`;
  const stitch=(d,color='#dccba4',width=1.7)=>L(d,width,color,'stroke-dasharray="4 5"');
  const gem=(x,y,r,color)=>group(
    E(x,y,r*1.3,r*1.15,'#f0ce75',2.4)+
    P(`M${x} ${y-r}L${x+r*.88} ${y-r*.36}L${x+r*.77} ${y+r*.66}L${x} ${y+r}L${x-r*.8} ${y+r*.6}L${x-r*.9} ${y-r*.4}Z`,color,2)+
    P(`M${x} ${y-r}L${x-r*.16} ${y-r*.1}L${x-r*.8} ${y+r*.6}L${x-r*.9} ${y-r*.4}Z`,'#ffffff35',0,'none')+
    L(`M${x-r*.55} ${y-r*.33}L${x-r*.15} ${y-r*.6}`,1.5,'#fff5d7')+
    L(`M${x+r*.77} ${y+r*.66}L${x+r*.3} ${y+r*.34}L${x-r*.16} ${y-r*.1}L${x+r*.88} ${y-r*.36}`,1,'#201a2433')
  );
  const fleuron=(x,y,k=1)=>group(
    P('M0 14C-2 3-19 2-17-10C-16-21-4-20-4-8C-5-20-10-24 0-39C10-25 6-18 4-8C4-20 17-21 18-10C20 1 3 3 0 14Z','#eac169',2.7)+
    L('M0-32V14M-12-11Q-8-4-2-2M12-11Q8-4 2-2',1.5,'#8b6339')+
    P('M-9 6H9L10 13H-10Z','#f3d38a',1.8),`translate(${x} ${y}) scale(${k})`);
  // Each piece has its own seat and depth plane on the lion's turned skull.
  const hatFits={
    crown:{dx:12,dy:24,x:.91,y:.80,rotation:9,seat:62},
    beanie:{dx:8,dy:36,x:.95,y:.83,rotation:10,seat:67},
    cap:{dx:8,dy:35,x:.94,y:.83,rotation:5,seat:46},
    bucket:{dx:10,dy:40,x:.90,y:.74,rotation:7,seat:74},
    cowboy:{dx:5,dy:25,x:.83,y:.72,rotation:8,seat:61},
    sailor:{dx:10,dy:32,x:.91,y:.74,rotation:6,seat:65},
    halo:{dx:40,dy:-50,x:.78,y:.88,rotation:6,seat:0}
  };
  function hatTransform(a={},kind='crown') {
    const q=a.hat||{},fit=hatFits[kind]||hatFits.crown;
    const k=(q.width??480)/500;
    return `translate(${(q.cx??540)+fit.dx} ${(q.cy??150)+fit.dy}) rotate(${fit.rotation}) scale(${k*fit.x} ${k*fit.y})`;
  }
  function renderHatOccluder(s={},a={}) {
    if(!s.hat||s.hat==='none'||s.hat==='halo')return '';
    const fit=hatFits[s.hat]||hatFits.crown;
    // The lower edge stays inside the opaque cuff or brim, preventing a cutout halo.
    const lower=s.hat==='cap'?'M-228 34Q4 0 202 31':s.hat==='bucket'?'M-253 62Q0 112 255 58':s.hat==='cowboy'?'M-217 42Q0 11 220 46':s.hat==='sailor'?'M-241 39Q0 78 239 42':s.hat==='beanie'?'M-237 55Q0 22 242 55':'M-231 50Q0 16 235 50';
    return group(P(`${lower}L245-420H-245Z`,'#000',0,'none'),hatTransform(a,s.hat));
  }
  function renderHatContactShadow(s={},a={}) {
    if(!s.hat||s.hat==='none'||s.hat==='halo')return '';
    const fit=hatFits[s.hat]||hatFits.crown;
    const y=fit.seat;
    return group(P(`M-221 ${y-4}Q0 ${y-42} 223 ${y-5}L219 ${y+8}Q0 ${y-27}-216 ${y+10}Z`,'#24130b3d',0,'none'),hatTransform(a,s.hat));
  }
  function renderHats(s={},a={}) {
    let out='';
    if(!s.hat||s.hat==='none') return '';
    if(s.hat==='crown') {
      out+=P('M-226 1C-226-87-167-158-88-170Q1-204 96-167C175-158 227-91 227-1Z','#9d242a',6);
      out+=P('M-213-9C-198-77-143-130-70-141Q-112-82-90 4Z','#c4423d',0,'none');
      out+=P('M95-166Q187-124 218-23L178 6L101-5Q132-87 95-166Z','#721d29',0,'none');
      out+=L('M-160-20Q-167-98-94-150M-76-9Q-103-80-60-166M16-8Q43-91 9-181M107-8Q152-94 94-160M179-8Q211-83 158-122',2.1,'#6d1723');
      out+=P('M-236 10Q-255-69-244-130L-217-113Q-187-70-180-8L-161-14Q-162-91-142-161L-111-154Q-126-72-111-17L-83-18Q-86-113-50-190L-20-184Q-45-100-34-21L-4-21Q7-108 3-198L32-194Q48-102 27-20L57-19Q92-93 86-180L115-168Q132-91 114-14L142-11Q175-72 167-143L197-125Q207-69 193-4L221 0Q254-52 241-108L264-128Q281-60 245 27Z','#d9a841',4.4);
      out+=L('M-233-112Q-235-57-214-10M-136-143Q-146-74-133-16M-43-176Q-64-98-54-20M17-184Q29-99 7-20M101-163Q117-89 93-18M183-127Q194-68 173-9M254-104Q265-54 231 9',2.2,'#f8de91');
      for(const [x,y,z] of [[-240,-130,.78],[-130,-161,.91],[-39,-190,.96],[18,-202,1.05],[102,-181,.94],[184,-143,.81],[255,-128,.75]])out+=fleuron(x,y,z);
      out+=P('M-244-9Q3-49 247-4L240 62Q2 25-236 65Z','#c18a35',5.5);
      out+=P('M-241-8Q3-44 246-3L244 9Q1-27-240 6Z','#f3d17b',3.2);
      out+=P('M-237 45Q5 9 242 46L240 61Q1 26-236 64Z','#f1cf79',3.2);
      out+=L('M-234 12Q0-18 239 15M-233 40Q4 9 238 42',2,'#8c612a');
      for(let n=-7;n<=7;n++){const x=n*30,y=-3+Math.pow(n/7,2)*15;out+=C(x,y,4.4,'#fff3cb',1.4,'#8c6738');}
      for(const [x,y,r,c] of [[-185,31,13,'#306e60'],[-103,19,15,'#ad3039'],[-9,15,17,'#275d9f'],[86,19,15,'#a5263d'],[179,31,13,'#32795f']])out+=gem(x,y,r,c);
      out+=L('M-224 24L-210 22M-155 22L-140 20M-60 13L-45 13M39 14L51 16M129 24L143 25M213 34L225 36',2.5,'#f9e4a6');
    } else if(s.hat==='beanie') {
      out+=P('M-228-6C-235-80-202-165-132-197C-80-223-30-211 13-222C81-228 148-197 182-151C215-112 235-57 232 4Z','#9c3434',6);
      out+=P('M-210-13C-214-82-174-167-111-188Q-151-91-116-7Z','#c45043',0,'none');
      out+=P('M140-188Q205-141 230-43L229 9L180 7Q180-113 140-188Z','#702b31',0,'none');
      for(const [x,c] of [[-175,-175],[-124,-126],[-68,-60],[-7,8],[60,77],[127,149],[180,205]])out+=L(`M${x}-13Q${c-25}-97 ${c}-178`,2.8,'#6b2a2c');
      out+=L('M-127-196Q-80-214-29-210M-3-218Q65-224 116-200',2.4,'#df7a59');
      out+=P('M-243-13Q-6-53 240-9L251 64Q2 29-245 70Z','#b74b42',6);
      out+=P('M-244 52Q-5 17 248 51L251 64Q1 28-245 70Z','#8a3235',0,'none');
      for(let n=-11;n<=11;n++){const x=n*20,y=-22+Math.pow(n/11,2)*18;out+=L(`M${x} ${y+9}L${x+6} ${y+64}`,2.6,'#783234');out+=L(`M${x+6} ${y+9}L${x+12} ${y+59}`,1,'#d4705a');}
      out+=stitch('M-237-3Q0-40 235-1','#e17b64',1.7);
      out+=P('M105 3L156 8L157 47L107 42Z','#d4bd8b',3.1);
      out+=stitch('M112 10L150 14L151 40L114 36Z','#705a3c',1.1);
      out+=P('M126 15L121 31L134 31L139 23L133 26L134 17Z','#6a4b35',1.4);
    } else if(s.hat==='cap') {
      out+=P('M-225 16C-225-102-143-183-29-190C83-198 181-130 207-24L185 31Z','#375364',6);
      out+=P('M-208-1Q-186-121-86-164Q-117-85-99 17Z','#587989',0,'none');
      out+=P('M69-177Q166-146 200-39L191 21L115 18Q108-103 69-177Z','#293f50',0,'none');
      out+=L('M-33-180Q-60-111-47-8M58-173Q120-111 134-12M-130-147Q-182-74-178 13',2.7,'#1f3441');
      out+=stitch('M-27-178Q-54-112-41-9M64-171Q126-110 140-12','#86a1a5');
      out+=E(-28,-188,15,8,'#314552',2.8);
      out+=P('M-55-113L-18-127L17-106L13-55L-15-33L-50-52Z','#d4c39b',3.1);
      out+=P('M-41-106L-17-116L5-102L2-64L-16-49L-38-60Z','#546f73',1.9);
      out+=P('M-28-96L-28-66L-7-66L-3-76L-17-74L-16-99Z','#dfd1a9',1.7);
      out+=P('M-228 1Q-65-24 184-4L204 37Q8 8-226 47Z','#2d4352',4.7);
      out+=P('M-72 13Q117-18 232 12C287 22 321 55 339 83Q313 99 273 87Q78 40-72 49Z','#3c5a66',5.6);
      out+=P('M-49 41Q123 22 321 77Q295 89 271 82Q96 42-48 49Z','#263b47',0,'none');
      out+=stitch('M-28 28Q142 11 310 69','#81979b',1.9);
      out+=L('M-218 26Q-144 18-89 21',2.3,'#758b8f');
    } else if(s.hat==='bucket') {
      out+=P('M-183-170Q-9-218 172-168L217-8Q14 32-214-3Z','#b7a365',6);
      out+=P('M-168-163Q-79-181-26-183L-40 9L-202-4Z','#d4c58b',0,'none');
      out+=P('M109-184L170-168L213-12L145-1Z','#97884f',0,'none');
      out+=P('M-207-23Q-3 8 210-27L220-4Q11 34-213-1Z','#9b8c55',3.8);
      out+=P('M-218-7Q-252 20-286 70Q-15 128 286 62Q247 21 213-12Q2 32-218-7Z','#c3b477',5.8);
      out+=P('M-282 67Q-14 117 283 60L277 73Q-12 137-284 80Z','#98884e',3.4);
      out+=L('M-193 28Q-4 62 213 21M-218 51Q-13 89 242 43',2,'#8e7c46');
      out+=stitch('M-168-156Q1-197 159-156M-200-17Q4 15 204-22M-239 63Q-2 106 257 55','#efe0a5',1.8);
      out+=E(-143,-98,5.5,4.5,'#735f3b',2)+E(139,-102,5.5,4.5,'#735f3b',2);
      out+=P('M-20-99L3-110L24-98L22-75L0-64L-21-77Z','#d8cd9a',2.8)+L('M-10-93L1-99L13-92L11-81L0-75L-10-81Z',1.3,'#6b5d39');
    } else if(s.hat==='cowboy') {
      out+=P('M-208-6L-182-162C-158-204-121-215-88-192C-34-156-18-145 18-180C59-221 103-216 145-181L191-7Z','#98704c',6);
      out+=P('M-180-160Q-148-187-119-175Q-109-120-70-119Q-40-121-19-153Q-66-155-88-192Q-150-228-180-160Z','#bb9162',0,'none');
      out+=P('M106-202Q148-173 164-103L187-12L122-7Q114-122 106-202Z','#725339',0,'none');
      out+=L('M-161-158Q-151-103-110-89Q-53-71-14-135M37-177Q82-164 109-102',2.6,'#614630');
      out+=P('M-201-38Q2-5 184-38L194 8Q6 48-208 8Z','#553f31',4.5);
      out+=L('M-198-27Q1 6 187-28',2.6,'#a78050');
      out+=P('M-213-8Q-302 37-349-9C-376-37-394-29-388 7C-361 83-282 103-183 64Q12 23 211 68C306 98 365 68 387 9C397-18 384-34 364-11Q314 35 201-7Q15 35-213-8Z','#b58a59',6.4);
      out+=P('M-374 20Q-317 84-192 48Q13 4 217 52Q309 81 371 18Q333 96 207 70Q12 25-183 64Q-317 116-374 20Z','#7f5a3e',0,'none');
      out+=L('M-359 15Q-303 64-196 32M214 39Q301 67 357 16',2.6,'#d9b783');
      out+=P('M-8-21L17-33L42-15L39 15L10 25L-11 8Z','#d7ba77',3.8)+P('M0-13L17-23L32-12L31 7L11 15L-2 4Z','#73523c',2)+gem(16,-4,7,'#438f83');
    } else if(s.hat==='sailor') {
      out+=P('M-215-15C-213-105-148-169-53-180C74-201 183-145 216-16Z','#d8d8ca',6);
      out+=P('M-199-24Q-163-129-78-155Q-108-85-86-4Z','#f0edde',0,'none');
      out+=P('M110-170Q184-123 211-30L170-5Q161-99 110-170Z','#b6bcb3',0,'none');
      out+=L('M-40-173Q-68-97-55-24M46-179Q97-106 104-24',2.7,'#a4aaa1');
      out+=stitch('M-34-173Q-62-97-49-24M52-175Q103-105 110-24','#f9f4e2');
      out+=P('M-230-26Q5-61 228-20L248 56Q0 95-251 53Z','#ebe5d3',6);
      out+=P('M-242 31Q0 71 240 35L248 56Q0 95-251 53Z','#c3c6b9',0,'none');
      out+=L('M-221-11Q3-42 221-7M-235 43Q2 82 233 48',2.6,'#a7b2a9');
      out+=L('M-41 16L-24 20L-26 41Q0 57 28 36L30 17L44 14M1-4L-1 52M-14 10H15M-9-8Q0-24 9-9Q14 1 0 4Q-15 1-9-8',4.3,'#394b57');
      out+=L('M-33 33Q-1 73 34 30',2,'#a28e62');
    } else if(s.hat==='halo') {
      out+=E(0,-150,211,33,'none',13,I)+E(0,-151,211,33,'none',7.5,'#e8ba4d');
      out+=L('M-180-168Q-12-196 171-171',2.2,'#fff0ab');
      out+=P('M-215-201L-208-190L-197-185L-209-180L-214-168L-220-180L-232-185L-221-190Z','#f8dc7d',1.7);
      out+=P('M185-216L191-207L201-203L191-199L186-187L181-198L170-203L181-208Z','#f8dc7d',1.7);
      out+=L('M-73-225L-69-211M108-218L114-230M-259-152L-245-151',2.2,'#efc768');
    }
    return group(out,hatTransform(a,s.hat));
  }
  function topTransform(a={}) {
    const q=a.top||{};
    // Shoulder seams follow the bust, not the much narrower neck opening.
    const cx=(q.neckX??560)-35,cy=(q.neckY??850)-50;
    const scale=((q.rightX??960)-(q.leftX??40))/830*1.13;
    return `translate(${cx} ${cy}) scale(${scale})`;
  }
  const body='M-155-32C-205-17-257 0-316 34C-394 77-450 162-476 325L-490 470H479L467 319C445 166 391 75 313 35C251 3 192-18 151-33Q5 50-155-32Z';
  const sideFolds=()=>L('M-348 115Q-315 177-323 257M344 118Q310 174 326 264M-383 268Q-358 314-362 366M383 274Q360 311 370 373',4.4,'#211b1c77');
  const littleButton=(x,y,color='#cab27c')=>C(x,y,8,color,2.4)+C(x,y,4,'none',1.3,'#67573d')+L(`M${x-1} ${y-2}L${x+1} ${y+2}`,1.1,'#ead7a5');
  function collar(main,light,dark) {
    return P('M-163-37Q-4 49 156-37L178-5Q9 108-178-1Z',dark,5.5)
      +P('M-158-33Q-5 53 155-33L165-16Q3 77-169-15Z',main,3.8)
      +L('M-154-24Q1 63 157-24',3.6,light)+L('M-162-12Q1 78 164-12',2.7,light);
  }
  function renderTop(s={},a={}) {
    const top=s.top;
    if(!top||top==='none') return '';
    let out='';
    if(top==='varsity') {
      out+=P(body,'#294d3e',6.6);
      out+=P('M-319 36Q-397 79-437 199L-467 352H-305L-276 165Q-265 97-319 36Z','#d8cfb1',5.7);
      out+=P('M314 36Q405 84 444 208L465 350H304L277 161Q262 92 314 36Z','#d8cfb1',5.7);
      out+=P('M-403 143Q-372 100-323 75L-299 107Q-340 174-333 271L-347 352H-395Q-375 240-403 143Z','#b4ad91',0,'none');
      out+=P('M374 116Q415 179 427 266L445 348H409L390 242Q368 175 349 155Z','#aaa68c',0,'none');
      out+=P('M101 40L122 471H72L56 55Z','#1e3c32',4.3);
      out+=L('M113 80L132 435',2.3,'#52715a');
      out+=collar('#244436','#d9d0ac','#192e28');
      out+=stitch('M-309 57Q-260 113-288 215M307 56Q267 113 294 216','#9d9981',1.7);
      for(const y of [101,173,247,321,395])out+=littleButton(86+y*.043,y);
      out+=P('M-222 120L-171 100L-123 125L-126 194L-171 222L-220 195Z','#d5c593',3.7);
      out+=P('M-212 128L-171 112L-134 132L-137 187L-171 209L-210 186Z','#3c5a43',2.3);
      out+=P('M-188 138L-181 130L-171 139L-160 131L-152 140L-157 150L-153 163L-165 183L-177 183L-190 164L-185 150Z','#d9bd76',2);
      out+=L('M-178 153L-173 157M-164 153L-160 157M-174 166L-166 166L-170 171Z',1.8,'#30412f');
      out+=P('M-258 286L-147 262L-139 282L-250 308Z','#18392d',3.5)+L('M-248 291L-148 270',2,'#729079');
      out+=P('M224 274L324 297L318 317L218 294Z','#18392d',3.5)+L('M228 282L315 302',2,'#729079');
      out+=stitch('M-239 313L-137 289M217 300L310 324','#a8b49a',1.6);
      out+=L('M-189 353Q-134 340-69 354M161 365Q227 354 277 375',3,'#173a2c');
      out+=sideFolds();
    } else if(top==='hoodie') {
      out+=P(body,'#c5b99a',6.4);
      out+=P('M-163-46C-213-72-278-34-286 21C-302 80-260 146-181 167L-66 71L-39 19Z','#9b937b',5.7);
      out+=P('M146-44C218-80 288-23 294 41C295 110 255 149 179 169L63 76L42 17Z','#a79e83',5.7);
      out+=P('M-157-26Q-220-42-241 15Q-255 80-192 121L-97 51Z','#d9cdb0',3.5);
      out+=P('M147-24Q226-46 250 21Q263 83 190 125L94 51Z','#d9cdb0',3.5);
      out+=P('M-143-28Q3 36 144-28L152 7Q6 100-151 11Z','#938b73',5.1);
      out+=P('M-116 13Q4 65 119 12L111 44Q6 90-110 45Z','#b2a78b',2.3);
      out+=L('M-99 40C-108 94-99 143-111 221M103 41Q90 132 120 217',6.3,'#e6d9ba');
      out+=L('M-99 41C-108 93-99 145-111 218M103 42Q90 131 120 213',2.1,'#8d8168');
      out+=P('M-116 211L-106 212L-108 235L-117 233Z','#594f42',2)+P('M115 209L125 207L130 232L121 235Z','#594f42',2);
      out+=C(-96,36,6.5,'#a9976c',2.5)+C(101,38,6.5,'#a9976c',2.5);
      out+=P('M-183 284Q-91 262 3 276Q88 266 191 288L225 383Q3 409-226 383Z','#b6aa8e',4.5);
      out+=L('M-182 287L-153 322L-185 379M190 291L158 322L188 379',4,'#8f856d');
      out+=stitch('M-172 290Q-88 276 4 286Q90 275 180 294M-209 377Q7 398 211 378','#dbceb2',2);
      out+=L('M-288 186Q-265 229-280 289M291 179Q260 222 278 292M-198 218L-164 226M160 223L196 216',3.1,'#958a71');
      out+=sideFolds();
    } else if(top==='tee') {
      out+=P(body,'#353239',6.5)+P('M-163-34Q-9 55 157-35L169-8Q5 96-177-4Z','#24232a',4.7);
      out+=L('M-157-24Q-2 66 158-23',2.7,'#60565b');
      out+=P('M-324 38Q-380 77-422 162L-328 207L-274 104Z','#3e3940',4.3)+P('M319 38Q382 83 420 164L324 207L273 104Z','#3e3940',4.3);
      out+=stitch('M-416 158L-331 197M416 159L330 197','#7c6e70',1.7);
      out+=L('M-316 204Q-325 310-299 414M317 204Q327 313 303 414M-168 94L-131 119M133 120L171 90',3.5,'#211e26');
      out+=P('M-71 180L-55 148L-31 163L-6 135L15 163L39 150L59 181L43 212L49 236L16 280L-19 280L-53 240L-49 215Z','#b5a788',3.2);
      out+=P('M-42 190L-28 180L-17 196L-2 188L14 196L29 180L42 190L24 216L29 233L10 256L-13 256L-32 234L-27 215Z','#36313a',2.2);
      out+=L('M-22 209L-13 211M12 211L21 209M-11 228L12 228L0 240Z',2.6,'#b5a788');
      out+=L('M-189 313Q-133 297-92 317M113 326Q159 313 201 331',2.7,'#494047');
    } else if(top==='denim') {
      out+=P(body,'#5a7a88',6.5);
      out+=P('M-154-36L-236 14L-145 135L-70 39L2 103L74 39L148 134L238 12L153-35Q4 49-154-36Z','#83a0a5',5.4);
      out+=P('M-68 40L2 104L74 40L61 470H-53Z','#405f70',4.2);
      out+=P('M-211 157L-95 170L-103 260L-208 249Z','#73939d',3.8)+P('M100 170L215 156L212 251L110 262Z','#73939d',3.8);
      out+=P('M-213 158L-96 171L-103 202L-155 216L-209 191Z','#8ca6aa',3.7)+P('M100 171L216 157L213 190L162 217L107 203Z','#8ca6aa',3.7);
      out+=littleButton(-156,194,'#bd9a59')+littleButton(160,195,'#bd9a59');
      for(const y of [134,206,277,348,419])out+=littleButton(28,y,'#b69863');
      out+=L('M-295 79L-279 377M292 80L280 379',4,'#304f5e');
      out+=stitch('M-287 80L-270 377M284 81L272 380M-204 164L-106 176M-198 242L-111 253M111 176L207 164M117 253L204 244','#c6bd91',1.8);
      out+=L('M-177 281L-148 278M140 290L179 281M-181 300L-141 294M143 310L174 301M-239 351L-196 337M188 346L232 359',2.5,'#a4b6ac');
      out+=L('M-317 146Q-348 205-334 280M321 149Q351 205 335 284',3.5,'#355363');
      out+=stitch('M-323 146Q-354 206-340 280M327 149Q357 205 341 284','#b3b599',1.5);
    } else if(top==='suit') {
      out+=P(body,'#3d414a',6.7);
      out+=P('M-148-34Q0 49 149-34L103 470H-99Z','#ece2c9',4.6);
      out+=P('M-137-24L-43 45L-81 113L-158 34ZM136-24L42 45L82 113L156 34Z','#faf1d9',3.6);
      out+=P('M-27 45L25 45L42 85L14 110L41 350L4 390L-35 348L-15 111L-44 83Z','#733c42',3.6);
      out+=P('M-28 58L-13 109L-26 342L-7 362L4 122L25 68L17 54Z','#9c5b58',0,'none');
      out+=L('M-15 128L20 164M-19 172L25 214M-23 219L31 268M-27 267L34 323',2,'#4a2d38');
      out+=P('M-159-32L-244 47L-145 92L-179 142L-58 416L-66 71ZM153-32L239 49L148 92L181 142L61 418L68 71Z','#292f38',5.4);
      out+=L('M-157-16L-219 46L-123 88L-159 143L-65 358M153-15L216 47L125 89L160 143L68 360',2,'#68717a');
      out+=P('M182 175L285 154L287 177L187 196Z','#222830',3.5);
      out+=P('M196 173L207 138L225 160L242 132L255 158L272 144L276 157Z','#ebe1ca',2.5);
      out+=C(-11,427,10,'#292d31',2)+C(-10,427,3,'#7c776d',1.5);
      out+=L('M-312 118Q-333 205-320 294M311 121Q331 208 319 295M-242 285L-168 270M165 269L244 286',3.3,'#222730');
      out+=P('M-140 41L-126 51L-134 63L-147 53Z','#c6a161',2.2)+gem(-138,51,4.4,'#366c61');
    } else if(top==='tank') {
      out+=P('M-282 11L-159-34Q-1 64 153-34L281 12L244 173L315 470H-311L-245 172Z','#ddd3b7',6);
      out+=P('M-145-12Q-4 74 141-11L117 72Q-2 141-120 72Z','#b3a88f',3.4);
      out+=L('M-267 24Q-231 74-230 171M269 24Q232 77 231 172M-142 3Q2 88 138 1',5,'#f0e6cd');
      out+=L('M-251 33Q-224 91-222 175M254 33Q225 91 223 175',2.2,'#9e927a');
      for(let x=-220;x<=220;x+=20)out+=L(`M${x} 185Q${x-8} 292 ${x-3} 462`,1.5,'#b8ac90');
      out+=stitch('M-141 13Q0 97 138 12M-250 36Q-218 100-218 173M251 36Q219 100 219 173','#9c9078',1.4);
      out+=L('M-176 241Q-126 220-77 244M73 252Q130 231 181 252',2,'#c2b79b');
    } else if(top==='mariner') {
      out+=`<defs><clipPath id="pride-premium-mariner-clip">${P(body,'#fff',0,'none')}</clipPath></defs>`;
      out+=P(body,'#e9ddc3',6.6);
      out+='<g clip-path="url(#pride-premium-mariner-clip)">';
      for(let y=71;y<471;y+=55)out+=P(`M-500 ${y}Q-280 ${y-5} 0 ${y+9}Q270 ${y+20} 500 ${y+2}V${y+26}Q270 ${y+44} 0 ${y+34}Q-270 ${y+17}-500 ${y+26}Z`,'#253944',0,'none');
      out+=P('M-350 30Q-389 99-384 211L-411 471H-470L-444 250Q-440 111-350 30Z','#c5baa3',0,'none');
      out+=P('M346 34Q405 103 420 220L456 470H400L380 232Q361 126 346 34Z','#c2baa6',0,'none');
      out+='</g>';
      out+=P('M-165-36Q-6 60 157-37L171-4Q8 103-180-2Z','#253944',5.3);
      out+=P('M-157-30Q-5 57 151-30L158-13Q1 74-166-14Z','#f2e8ce',3.3);
      out+=L('M-153-21Q2 66 154-21',2.2,'#a99d82');
      out+=stitch('M-168-5Q-1 91 162-4','#d7c8a5',1.5);
      out+=L('M-334 74Q-302 134-310 225M332 75Q304 132 313 228',4.2,'#243843');
      out+=stitch('M-327 74Q-295 135-303 225M325 75Q297 133 306 228','#d6c6a6',1.5);
      out+=L('M-252 274Q-221 256-189 262M184 287Q217 271 250 280M-203 369Q-157 358-114 372M121 387Q164 371 211 385',2.3,'#a79c85');
      out+=P('M-246 115L-226 109L-213 122L-218 150L-236 157L-249 143Z','#bf9e5b',2.1);
      out+=L('M-231 119V145M-238 132H-223M-240 140Q-231 154-222 139',1.8,'#514630');
    } else if(top==='aloha') {
      out+=P(body,'#477f79',6.5);
      for(const [x,y,r,rot] of [[-300,98,34,-20],[-166,181,30,15],[-313,294,39,8],[-192,386,35,-10],[-68,289,24,8],[165,179,33,18],[310,105,32,30],[306,311,40,-6],[169,393,29,20],[65,355,22,0]]) {
        out+=group(P('M0 34Q-48 6-40-13Q-20-29-8-6Q-18-50 5-49Q30-44 15-13Q43-36 54-16Q64 9 29 16Q60 26 48 45Q29 61 7 32Q-3 62-23 51Q-40 41 0 34Z','#c28f7d',2,'#285c58')+C(8,15,r*.15,'#dbbe72',1.5),`translate(${x} ${y}) rotate(${rot}) scale(${r/45})`);
      }
      out+=P('M-154-34L-237 15L-142 130L-68 45L3 104L74 44L147 130L239 14L151-34Q0 51-154-34Z','#75a49a',5.3);
      out+=P('M-70 43L3 103L74 43L59 470H-57Z','#346b67',3.9);
      for(const y of [127,202,277,352,427])out+=littleButton(20,y,'#cbbf9c');
      out+=stitch('M-230 22L-142 119L-68 37M230 21L147 119L74 37','#b3c2aa',1.8);
      out+=P('M177 184L267 168L271 245L189 260Z','#568e85',3.7)+stitch('M183 190L261 176M195 252L264 238','#b4bba0',1.6);
      out+=sideFolds();
    }
    return group(out,topTransform(a));
  }
  function renderGlasses(s={},a={}) {
    if(!s.glasses||s.glasses==='none')return '';
    const near=a.eyes?.left||{x:582,y:364},far=a.eyes?.right||{x:740,y:365};
    const type=s.glasses;
    let out='';
    const metallic=type==='round'||type==='aviator'||type==='monocle';
    const frame=metallic?'#b59450':type==='heart'?'#8f3448':'#25252a';
    const highlight=metallic?'#f1d999':type==='heart'?'#de8391':'#5a6064';
    if(type==='monocle') {
      out+=E(near.x,near.y+3,63,47,'#241c1512',0,'none');
      out+=E(near.x,near.y+1,62,46,'#adcbcb0a',3.8,frame)+E(near.x,near.y+1,58,42,'none',1,'#f7dfa1');
      out+=L(`M${near.x-39} ${near.y-23}q27-13 55-8`,1.6,'#ffffff75');
      out+=C(near.x-56,near.y+26,6,'#c9a458',2.3)+L(`M${near.x-60} ${near.y+30}C${near.x-79} ${near.y+75} ${near.x-20} ${near.y+120} ${near.x-39} ${near.y+178}`,3.7,'#bf9951');
      out+=L(`M${near.x-60} ${near.y+30}C${near.x-79} ${near.y+75} ${near.x-20} ${near.y+120} ${near.x-39} ${near.y+178}`,1,'#f4de9b','stroke-dasharray="3 5"');
      return group(out);
    }
    // Temples disappear behind the mane instead of crossing it like straight wires.
    out+=P(`M${near.x-64} ${near.y-17}Q${near.x-75} ${near.y-23} ${near.x-85} ${near.y-25}L${near.x-87} ${near.y-21}Q${near.x-75} ${near.y-18} ${near.x-64} ${near.y-10}Z`,frame,1.8);
    out+=L(`M${far.x+29} ${far.y-17}Q${far.x+35} ${far.y-21} ${far.x+39} ${far.y-25}`,2.8,frame);
    out+=L(`M${near.x+61} ${near.y-1}Q${near.x+96} ${near.y-18} ${far.x-29} ${far.y-1}`,metallic?3.4:5.8,frame);
    out+=L(`M${near.x+64} ${near.y+3}Q${near.x+95} ${near.y-12} ${far.x-29} ${far.y+3}`,2.3,'#2b1c181d');
    if(type==='aviator')out+=L(`M${near.x+61} ${near.y-17}Q${near.x+96} ${near.y-33} ${far.x-29} ${far.y-17}`,2.6,frame);
    out+=E(near.x+63,near.y+7,3,6,'#bdac8a65',1,'#77603f66')+E(far.x-31,far.y+7,2,5,'#bdac8a65',1,'#77603f66');
    const lens=(p,width,height,isFar)=>{
      let d;
      if(type==='round')d='M-70 0C-70-56 70-56 70 0C70 58-70 58-70 0Z';
      else if(type==='heart')d='M0 39C-15 25-68-4-70-26C-71-54-26-61 0-31C25-61 70-54 70-25C70-2 17 27 0 39Z';
      else if(type==='aviator')d='M-70-21C-58-47 49-51 68-23C69 11 46 52 12 51C-29 51-65 19-70-21Z';
      else if(type==='pixel')d='M-75-39H-48V-45H50V-37H75V14H61V30H44V42H-42V32H-61V16H-75Z';
      else d='M-72-26C-61-41 39-44 69-24L57 24C39 43-33 42-55 25Z';
      const clip=`pride-glass-${isFar?'far':'near'}`;
      const opaque=type==='shades'||type==='pixel';
      const tint=opaque?'#273037':type==='aviator'?'#385052b8':type==='heart'?'#c5687430':'#b4d8d30a';
      let layer=`<defs><clipPath id="${clip}">${P(d,'#fff',0,'none')}</clipPath></defs>`;
      layer+=group(P(d,'#1b13122a',0,'none'),'translate(0 4)');
      layer+=P(d,tint,type==='round'?4.2:type==='aviator'?3.6:6.2,frame);
      layer+=`<g clip-path="url(#${clip})">`+P('M-61-46L-43-44L-2 48L-21 47Z','#ffffff12',0,'none')+P('M-32-48L-25-48L20 47L13 47Z','#ffffff24',0,'none')+P('M-92-38Q-22-65 79-24L75-17Q-14-43-84-23Z','#ffffff16',0,'none')+'</g>';
      layer+=L('M-58-30Q0-45 55-27',type==='round'?1.5:2,highlight);
      if(type==='pixel')layer+=P('M-51-19H-35V-3H-19V13H-3V29H-20V13H-36V-3H-51Z','#d4e7df75',0,'none');
      return group(layer,`translate(${p.x} ${p.y}) rotate(${isFar?-1:6}) scale(${width/140} ${height/90})`);
    };
    out+=lens(near,132,86,false)+lens(far,63,70,true);
    out+=C(near.x-63,near.y-17,2.2,highlight,.8)+C(far.x+29,far.y-16,1.6,highlight,.8);
    return group(out);
  }
  function renderScars(s={},a={},palette={}) {
    if(!s.scar||s.scar==='none')return '';
    const cheek=a.cheek||{x:532,y:468};
    const q={x:cheek.x+16,y:cheek.y+3};
    const dark='#7f463d',pink='#cb8e72',light='#efd0a2';
    let out='';
    if(s.scar==='cheek') {
      out+=L('M-25-30Q-5-11 13 7L31 33',3.6,dark)+L('M-23-30Q-2-11 16 9L33 31',1.3,pink);
      for(let i=0;i<6;i++){const x=-19+i*9,y=-23+i*10;out+=L(`M${x-6} ${y+4}Q${x} ${y-3} ${x+7} ${y-5}`,1.7,'#352a25')+C(x-6,y+4,1,'#694a37',0)+C(x+7,y-5,1,'#694a37',0);}
    } else if(s.scar==='claws') {
      for(let i=0;i<3;i++){const x=-26+i*15;out+=P(`M${x}-34Q${x+6}-2 ${x+24} 33L${x+20} 7Q${x+5}-13 ${x}-34Z`,dark,1.4,'#62392f')+L(`M ${x+3} -22 Q ${x+10} 3 ${x+23} 29`,1.3,pink);}
    } else if(s.scar==='cross') {
      out+=L('M-24-29Q1-5 25 28M-21 23Q0 1 23-20',4.9,dark)+L('M-23-30Q2-6 27 27M-20 24L24-18',1.4,light);
    } else if(s.scar==='lightning') {
      out+=P('M-9-38L14-10L1-8L28 33L-13 1L0-2Z','#af7357',2.4,dark)+L('M-6-32L9-12L-4-9L19 22',1.4,light);
    } else if(s.scar==='bandage') {
      out+=group(P('M-37-18Q-44-18-44-9V14Q-43 22-34 22H36Q43 21 44 13V-10Q43-18 35-18Z','#d9ba8b',2.3,'#6b4a35')+P('M-15-17H16V21H-15Z','#e9cf9f',1.2,'#9d7c55')+L('M-12-12H12M-12 16H12',1.2,'#c4a474')+[-30,-23,26,33].map(x=>[-8,1,10].map(y=>C(x,y,1.3,'#987249',0)).join('')).join(''),'rotate(-32)');
    } else if(s.scar==='eyebrow') {
      const brow=a.brow||{x:569,y:310};
      return group(L('M-7-16L8 21',5.2,palette.fur||'#eaae53')+L('M-4-15L11 20',1.8,pink)+L('M-10-13L-3-16M5 20L13 17',1.7,dark),`translate(${brow.x} ${brow.y})`);
    }
    return group(out,`translate(${q.x} ${q.y}) rotate(-8)`);
  }
  const headClip='M0 0H1000V824L919 822L887 818L860 831L839 854L822 849L809 874L798 898L781 923L776 950L757 982L740 1000H451L431 980L412 970L390 943L356 933L341 907L317 887L291 875L280 849L252 849L268 825L233 837L200 847L163 850L119 864L89 867L0 873Z';
  global.LionPremiumTraits={renderHats,renderTop,renderGlasses,renderScars,renderHatOccluder,renderHatContactShadow,headClip,hatFits};
})(typeof window!=='undefined'?window:globalThis);
