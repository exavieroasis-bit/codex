/* PRIDE — original layered lion artwork. No external assets or dependencies. */
(function (global) {
  'use strict';
  const INK = '#251f22';
  const traits = [
    {key:'background',label:'Background',options:[{id:'mint',label:'Mint',color:'#b8c9bc'},{id:'sand',label:'Sand',color:'#dfcda9'},{id:'sky',label:'Powder blue',color:'#acc2cf'},{id:'rose',label:'Dusty rose',color:'#c6a2a3'},{id:'lilac',label:'Lilac',color:'#b6aec8'},{id:'gold',label:'Mustard',color:'#c9b06e'},{id:'ink',label:'Midnight',color:'#525d68'},{id:'cream',label:'Cream',color:'#eee6d5'}]},
    {key:'skin',label:'Skin',options:[{id:'safari',label:'Safari tan',color:'#d6a760'},{id:'ivory',label:'Ivory',color:'#e8ddc4'},{id:'charcoal',label:'Charcoal',color:'#5e6069'},{id:'rose',label:'Pink lemonade',color:'#d997a5'},{id:'zombie',label:'Zombie',color:'#a6b882'},{id:'blue',label:'Arctic blue',color:'#91b9c5'},{id:'gold',label:'Solid gold',color:'#e5bd55'},{id:'tiger',label:'Tiger stripes',color:'#d9954e'}]},
    {key:'hat',label:'Hat',options:[{id:'none',label:'No hat'},{id:'beanie',label:'Red beanie',color:'#a74a40'},{id:'cap',label:'Club cap',color:'#435b69'},{id:'bucket',label:'Bucket hat',color:'#c8b87b'},{id:'crown',label:'The crown',color:'#dfbb57'},{id:'cowboy',label:'Outlaw',color:'#9c7651'},{id:'sailor',label:'Sailor',color:'#e5e1d6'},{id:'halo',label:'Golden halo',color:'#e2bb54'}]},
    {key:'glasses',label:'Glasses',options:[{id:'none',label:'No glasses'},{id:'shades',label:'Wayfarers',color:'#302b2b'},{id:'round',label:'Round specs',color:'#a5884b'},{id:'aviator',label:'Aviators',color:'#b69b65'},{id:'pixel',label:'Pixel shades',color:'#252228'},{id:'heart',label:'Heart frames',color:'#b55361'},{id:'monocle',label:'Monocle',color:'#d0ad59'}]},
    {key:'eyeType',label:'Eye type',options:[{id:'bored',label:'Unbothered'},{id:'sleepy',label:'Sleep deprived'},{id:'angry',label:'Bad mood'},{id:'wide',label:'Wide awake'},{id:'hearts',label:'Lovestruck'},{id:'cyborg',label:'Cyborg'}]},
    {key:'eyeColor',label:'Eye color',options:[{id:'amber',label:'Amber',color:'#bc843d'},{id:'green',label:'Emerald',color:'#4c876d'},{id:'blue',label:'Ice blue',color:'#73a6c4'},{id:'violet',label:'Violet',color:'#9378af'},{id:'red',label:'Crimson',color:'#b65b55'},{id:'black',label:'Onyx',color:'#4a454c'},{id:'gold',label:'Electric gold',color:'#e7c94d'}]},
    {key:'mouth',label:'Mouth',options:[{id:'smirk',label:'Side smirk'},{id:'bored',label:'Deadpan'},{id:'grin',label:'Big grin'},{id:'snarl',label:'Fangs out'},{id:'tongue',label:'Tongue out'},{id:'gold',label:'Gold grill'},{id:'bubble',label:'Bubblegum'},{id:'cigar',label:'Cigar club'}]},
    {key:'scar',label:'Face scar',options:[{id:'none',label:'No scars'},{id:'cheek',label:'Cheek stitch'},{id:'claws',label:'Claw marks'},{id:'cross',label:'Cross cut'},{id:'lightning',label:'Lightning bolt'},{id:'bandage',label:'Bandage'},{id:'eyebrow',label:'Brow split'}]},
    {key:'top',label:'Top',options:[{id:'none',label:'Bare fur'},{id:'varsity',label:'Varsity jacket',color:'#48654e'},{id:'hoodie',label:'Oversized hoodie',color:'#d1c7ad'},{id:'tee',label:'Black tee',color:'#39373b'},{id:'denim',label:'Denim jacket',color:'#6b8b9b'},{id:'suit',label:'Night suit',color:'#434752'},{id:'tank',label:'Ribbed tank',color:'#e8dfca'},{id:'aloha',label:'Aloha shirt',color:'#578e88'}]}
  ];
  const defaults = {background:'mint',skin:'safari',hat:'beanie',glasses:'none',eyeType:'bored',eyeColor:'amber',mouth:'smirk',scar:'cheek',top:'varsity'};
  const palettes = {
    safari:{fur:'#d6a760',shadow:'#bd8c4a',light:'#e5bd7e',muzzle:'#ead4a3',muzzleShade:'#d3b77f',mane:'#8b5036',maneDark:'#633d30',maneLight:'#a86842',ear:'#ac7556',nose:'#48312d'},
    ivory:{fur:'#e8ddc4',shadow:'#c6baa1',light:'#f0e7d4',muzzle:'#f1e7cf',muzzleShade:'#dbccb0',mane:'#b4a289',maneDark:'#817466',maneLight:'#c6b79f',ear:'#c59e91',nose:'#64504a'},
    charcoal:{fur:'#64656e',shadow:'#4e505b',light:'#7e7f87',muzzle:'#a5a1a3',muzzleShade:'#85818a',mane:'#38363e',maneDark:'#282730',maneLight:'#514d57',ear:'#866d76',nose:'#30262d'},
    rose:{fur:'#d997a5',shadow:'#be7c8b',light:'#e8b1bb',muzzle:'#efd1ca',muzzleShade:'#d7a8a8',mane:'#9c5f7b',maneDark:'#70465e',maneLight:'#ba7c96',ear:'#b46b84',nose:'#714350'},
    zombie:{fur:'#a6b882',shadow:'#859762',light:'#bdcb9c',muzzle:'#d6d6ad',muzzleShade:'#b7bf8f',mane:'#576953',maneDark:'#3d4d41',maneLight:'#798265',ear:'#ad9985',nose:'#465146'},
    blue:{fur:'#91b9c5',shadow:'#6e9aa9',light:'#b2cdd0',muzzle:'#d8ded0',muzzleShade:'#b5c9c3',mane:'#496c82',maneDark:'#344f66',maneLight:'#638da0',ear:'#9eafb3',nose:'#3b4b5b'},
    gold:{fur:'#e1b34b',shadow:'#b98a35',light:'#f1d77e',muzzle:'#f2d78e',muzzleShade:'#d6b65b',mane:'#a06f2e',maneDark:'#72502c',maneLight:'#c5943b',ear:'#b98b4b',nose:'#7e542e'},
    tiger:{fur:'#d9954e',shadow:'#bc763c',light:'#eeb36d',muzzle:'#e9d7ae',muzzleShade:'#d4bc8b',mane:'#69412e',maneDark:'#45302a',maneLight:'#875737',ear:'#af7553',nose:'#49302a'}
  };
  const esc = value => String(value).replace(/[&<>"']/g,c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const validate = state => Object.fromEntries(traits.map(trait => [trait.key,trait.options.some(option => option.id === state?.[trait.key]) ? state[trait.key] : defaults[trait.key]]));
  const path = (d,fill,extra='') => `<path d="${d}" fill="${fill}" ${extra}/>`;
  const line = (d,width=6,color=INK,extra='') => path(d,'none',`stroke="${color}" stroke-width="${width}" ${extra}`);
  const ellipse = (cx,cy,rx,ry,fill,extra='') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
  const facePath = 'M418 277C489 241 608 238 672 277C724 303 737 361 730 422C733 456 744 482 736 514C760 548 755 599 730 640C705 690 659 717 605 720C542 724 479 704 438 668C394 626 375 566 375 507C371 458 380 420 379 382C377 337 392 302 418 277Z';
  const manePath = 'M294 353L288 297L333 311L320 247L376 267L365 207L426 239L453 176L485 212L526 164L551 209L612 179L616 228L674 216L675 259L736 261L710 301L772 331L744 364L799 412L766 441L816 488L775 515L810 567L762 582L789 641L736 637L741 699L697 683L669 755L628 728L593 794L555 755L505 809L479 759L422 790L417 735L353 752L365 695L305 701L326 648L271 630L306 587L263 552L301 518L257 475L299 447L263 398L306 391Z';
  function torso(p,top) {
    let art = path('M195 1015C210 891 272 827 378 789L423 744L633 741L689 785C792 820 839 891 859 1015Z',p.fur,`stroke="${INK}" stroke-width="11"`);
    art += path('M443 727L439 819Q516 886 618 827L634 737Z',p.shadow);
    if(top === 'none') return art+line('M470 883L502 900L524 877L548 904L571 881L593 892',6,p.shadow)+line('M342 898Q354 952 352 1006M729 900Q711 947 718 1006',7);
    const body='M195 1015C211 899 272 831 378 792L423 752Q516 813 634 748L689 790C791 825 840 897 859 1015Z';
    if(top==='varsity') {
      art += path(body,'#48654e',`stroke="${INK}" stroke-width="11"`);
      art += path('M291 835Q230 888 207 1015H330L350 899Q355 864 337 826Z','#d8ccb1',`stroke="${INK}" stroke-width="9"`);
      art += path('M742 834Q819 890 849 1015H727L702 905Q688 861 703 815Z','#d8ccb1',`stroke="${INK}" stroke-width="9"`);
      art += path('M413 768Q504 836 635 763L654 790Q531 874 403 797Z','#2d3e35',`stroke="${INK}" stroke-width="7"`);
      art += line('M414 783Q523 854 642 780',5,'#e6dbc0');
      art += path('M570 829L589 1015H552L548 843Z','#334a3c',`stroke="${INK}" stroke-width="5"`);
      for(const y of [883,936,989]) art+=ellipse(567+(y-883)*.075,y,6,6,'#cdb789',`stroke="${INK}" stroke-width="3"`);
      art += path('M381 895L406 886L439 897L432 945L400 958L376 937Z','#d8ccb1',`stroke="${INK}" stroke-width="5"`);
      art += path('M395 904L395 940L418 940L420 929L406 931L408 902Z','#48654e',`stroke="${INK}" stroke-width="3"`);
      art += line('M642 947L684 928',6,'#253d32');
    } else if(top==='hoodie') {
      art+=path(body,'#cfc5ab',`stroke="${INK}" stroke-width="11"`);
      art+=path('M398 760Q330 748 327 830Q355 881 440 899L470 818Z','#ada68f',`stroke="${INK}" stroke-width="9"`);
      art+=path('M636 755Q720 746 735 823Q704 882 631 895L587 819Z','#b7af95',`stroke="${INK}" stroke-width="9"`);
      art+=path('M430 792Q511 833 632 789L615 830Q523 868 444 833Z','#a19b84',`stroke="${INK}" stroke-width="7"`);
      art+=line('M457 842L451 933M611 840L624 926',7,'#e8ddbf');
      art+=path('M446 929L457 929L455 947L446 945ZM619 923L630 922L631 940L622 941Z',INK);
      art+=line('M383 1008L405 964Q515 943 644 967L672 1010',7,'#a59c83');
      art+=line('M305 911Q330 954 322 1008M744 907Q716 949 728 1007',7);
    } else if(top==='tee') {
      art+=path(body,'#39373b',`stroke="${INK}" stroke-width="11"`);
      art+=path('M413 770Q520 843 645 765L654 792Q535 880 403 800Z','#25252b',`stroke="${INK}" stroke-width="7"`);
      art+=line('M317 878L348 1008M736 882L707 1008',8,'#28272b');
      art+=path('M482 920L504 899L522 923L548 904L562 926L546 955L513 963L487 945Z','#c6b790',`stroke="${INK}" stroke-width="5"`);
      art+=ellipse(504,923,4,4,INK)+ellipse(539,924,4,4,INK)+path('M512 936L531 936L522 945Z',INK);
    } else if(top==='denim') {
      art+=path(body,'#6b8b9b',`stroke="${INK}" stroke-width="11"`);
      art+=path('M415 761L349 810L410 886L463 810L525 866L588 813L653 880L709 809L637 755Q522 830 415 761Z','#87a4ac',`stroke="${INK}" stroke-width="8"`);
      art+=path('M463 810L524 868L588 813L574 1015H483Z','#4a6574',`stroke="${INK}" stroke-width="6"`);
      art+=line('M379 886L441 899L435 943L378 935ZM632 901L695 884L696 933L643 947Z',6,'#314958');
      art+=line('M359 875L346 1009M716 873L732 1012',5,'#bbba9b');
      for(const y of [899,947,995]) art+=ellipse(550,y,6,6,'#c6a164',`stroke="${INK}" stroke-width="3"`);
    } else if(top==='suit') {
      art+=path(body,'#434752',`stroke="${INK}" stroke-width="11"`);
      art+=path('M424 765Q521 823 637 760L606 1009H454Z','#e6dfce',`stroke="${INK}" stroke-width="7"`);
      art+=path('M508 828L546 828L556 859L538 878L559 1009H511L520 879L501 859Z','#6e3f3c',`stroke="${INK}" stroke-width="5"`);
      art+=path('M409 765L343 840L420 864L392 896L496 1009L473 827ZM648 761L714 839L645 860L675 894L566 1009L585 820Z','#353943',`stroke="${INK}" stroke-width="8"`);
      art+=path('M648 920L701 905L702 921L652 934Z','#e6dfce',`stroke="${INK}" stroke-width="4"`);
    } else if(top==='tank') {
      art+=path('M354 803L418 774Q516 842 639 772L706 801L680 916L729 1015H324L371 915Z','#e8dfca',`stroke="${INK}" stroke-width="10"`);
      art+=path('M420 793Q520 875 632 791L617 849Q529 904 438 851Z',p.fur,`stroke="${INK}" stroke-width="7"`);
      art+=line('M390 886L379 1005M414 900L402 1007M442 917L434 1009M650 883L668 1009M624 904L639 1009M599 917L611 1009',3,'#c5baa3');
    } else if(top==='aloha') {
      art+=path(body,'#578e88',`stroke="${INK}" stroke-width="11"`);
      art+=path('M410 763L354 815L442 885L484 818L538 866L581 819L658 884L710 812L639 760Q528 824 410 763Z','#87aaa0',`stroke="${INK}" stroke-width="7"`);
      art+=line('M538 866L551 1013',6);
      for(const [x,y,r] of [[319,932,28],[428,956,27],[656,956,31],[727,892,23],[777,986,24],[490,884,17]]) {
        art+=`<g transform="translate(${x} ${y})">`;
        for(let i=0;i<5;i++) art+=`<ellipse cx="0" cy="-${r*.62}" rx="${r*.43}" ry="${r*.62}" transform="rotate(${i*72})" fill="#dba69a" stroke="#3e6b66" stroke-width="3"/>`;
        art+=ellipse(0,0,r*.25,r*.25,'#ddc67d')+'</g>';
      }
      for(const y of [900,949,998]) art+=ellipse(548,y,5,5,'#c9c6a7',`stroke="${INK}" stroke-width="2"`);
    }
    return art;
  }
  function mane(p) {
    return path(manePath,p.mane,`stroke="${INK}" stroke-width="12"`)
      +path('M306 393L346 367L332 442L364 417L340 514L372 485L353 580L388 547L382 641L414 614L421 716L453 689L478 759L422 790L417 735L353 752L365 695L305 701L326 648L271 630L306 587L263 552L301 518L257 475L299 447L263 398Z',p.maneDark)
      +path('M687 327L735 342L712 400L766 416L727 457L776 483L737 529L776 554L733 598L755 629L700 638L711 676L663 665L666 715L615 711L593 794L628 728L669 755L697 683L741 699L736 637L789 641L762 582L810 567L775 515L816 488L766 441L799 412L744 364L772 331L710 301Z',p.maneDark)
      +path('M390 302L376 267L417 285L413 251L456 278L458 227L488 256L517 215L540 258L584 220L580 278L630 247L617 298L663 282L654 325C560 286 456 288 390 345Z',p.maneLight)
      +line('M330 393L357 367M316 471L345 443M316 552L348 523M343 618L371 587M377 680L405 647M432 721L448 689M490 752L507 714M569 756L590 712M651 690L669 655M710 603L735 577M734 512L758 488M721 428L744 402',6,INK)
      +line('M427 294L418 268M474 269L468 244M537 268L548 238M596 284L612 264M654 314L680 299',6,INK);
  }
  function face(p,s) {
    let art=ellipse(369,363,57,64,p.fur,`stroke="${INK}" stroke-width="10"`)+ellipse(367,363,28,36,p.ear,`stroke="${INK}" stroke-width="6"`)
      +ellipse(711,355,48,59,p.fur,`stroke="${INK}" stroke-width="10"`)+ellipse(714,355,23,31,p.ear,`stroke="${INK}" stroke-width="6"`)
      +path(facePath,p.fur,`stroke="${INK}" stroke-width="11"`)
      +`<g clip-path="url(#pride-face-clip)">`
      +path('M418 277C387 335 406 404 398 459C395 515 423 570 451 606C461 655 509 692 569 719L485 722L405 663L363 555L361 370Z',p.shadow)
      +path('M581 274C645 267 707 309 715 369Q696 331 647 320Q617 302 581 274Z',p.light)
      +path('M709 469Q730 511 716 562Q729 601 700 650L737 640L760 563L744 467Z',p.shadow);
    if(s.skin==='zombie') {
      art+=path('M405 348L444 338L457 374L426 389L398 377Z','#7b9464')+path('M683 475L729 489L716 526L689 518Z','#7c9466')+ellipse(467,582,18,10,'#7b9363')+line('M682 301L683 328L669 337M671 310L692 312M670 322L693 324',4,'#56684d');
    }
    if(s.skin==='tiger') {
      art+=path('M377 379L443 385L475 411L411 398ZM374 435L427 449L450 474L394 458ZM382 493L423 505L444 527L397 515ZM683 308L651 342L642 374L694 332ZM719 367L676 384L659 407L727 389ZM732 476L703 490L690 516L740 500Z',p.maneDark);
    }
    if(s.skin==='gold') {
      art+=path('M502 260L469 455L493 487L540 252ZM531 531L506 681L538 701L562 531Z',p.light)+path('M669 282L625 500L652 521L693 306Z','#c69738');
    }
    art+='</g>'+line('M534 328Q565 315 602 329M544 347Q574 337 598 346',5,p.shadow)
      +line('M422 529Q438 542 452 537M696 523L706 514',5,p.shadow);
    return art;
  }
  function eyes(p,s) {
    const color=traits.find(t=>t.key==='eyeColor').options.find(o=>o.id===s.eyeColor).color;
    const sclera=s.skin==='zombie'?'#e1dfb7':'#e8dfc5';
    let left='M424 440C445 407 501 403 536 437C507 463 454 468 424 440Z';
    let right='M601 433C625 407 672 408 698 439C672 461 625 459 601 433Z';
    if(s.eyeType==='wide'||s.eyeType==='hearts') {
      left='M422 435C426 391 512 386 539 433C529 475 444 482 422 435Z';
      right='M600 433C607 395 680 397 701 437C682 473 616 473 600 433Z';
    }
    if(s.eyeType==='sleepy') { left='M424 446Q475 428 536 443Q489 468 424 446Z';right='M602 441Q650 427 697 443Q652 462 602 441Z'; }
    let art=`<defs><clipPath id="pride-left-eye">${path(left,'white')}</clipPath><clipPath id="pride-right-eye">${path(right,'white')}</clipPath></defs>`;
    art+=path(left,sclera,`stroke="${INK}" stroke-width="8"`)+path(right,sclera,`stroke="${INK}" stroke-width="8"`);
    const heart = (x,y,scale) => `<g transform="translate(${x} ${y}) scale(${scale})">${path('M0 20C-34 0-28-25-13-23Q-4-23 0-13Q7-26 18-22C40-13 25 9 0 20Z',color,`stroke="${INK}" stroke-width="3"`)}</g>`;
    if(s.eyeType==='hearts') art+=heart(486,434,.75)+heart(652,434,.65);
    else {
      art+=`<g clip-path="url(#pride-left-eye)">`+ellipse(489,437,21,28,color,`stroke="${INK}" stroke-width="4"`)+ellipse(492,440,7,22,INK)+ellipse(482,428,4,4,'#eee4ca')+'</g>';
      art+=`<g clip-path="url(#pride-right-eye)">`+ellipse(655,437,18,25,color,`stroke="${INK}" stroke-width="4"`)+ellipse(658,440,6,20,INK)+ellipse(649,430,3,3,'#eee4ca')+'</g>';
    }
    if(s.eyeType==='bored'||s.eyeType==='cyborg') {
      art+=path('M423 438C444 402 503 401 536 435Q484 421 423 438Z',p.shadow,`stroke="${INK}" stroke-width="7"`)
        +path('M602 434C626 404 673 410 698 439Q652 425 602 434Z',p.shadow,`stroke="${INK}" stroke-width="7"`)
        +line('M426 403Q477 382 531 407M610 400Q650 384 689 412',9)
        +line('M438 477Q480 489 518 472M618 472Q652 481 682 468',5,p.shadow);
    } else if(s.eyeType==='angry') {
      art+=path('M422 410L536 444Q474 423 424 442Z',p.shadow,`stroke="${INK}" stroke-width="7"`)+path('M602 441L696 411L699 440Q654 425 602 441Z',p.shadow,`stroke="${INK}" stroke-width="7"`)
        +line('M425 393L536 423M603 420L693 391M560 405L567 423',10)
        +line('M550 371L560 391M581 372L575 393',5,p.shadow);
    } else if(s.eyeType==='sleepy') {
      art+=line('M425 431Q482 414 533 430M606 427Q651 417 693 432',7)+line('M434 478Q478 497 521 478M612 473Q651 490 684 474',7,p.shadow)+line('M445 493Q480 505 508 491M626 489Q650 501 675 487',4,p.shadow);
    } else {
      art+=line('M426 382Q475 356 526 383M608 379Q652 361 690 386',9)+line('M445 484Q480 497 515 480M620 482Q653 492 684 477',5,p.shadow);
    }
    if(s.eyeType==='cyborg') {
      art+=path('M591 404L610 378L676 384L711 411L710 470L681 493L614 481L592 461Z','#9a9da0',`stroke="${INK}" stroke-width="7"`)
        +ellipse(652,437,33,33,'#4d5358',`stroke="${INK}" stroke-width="6"`)+ellipse(652,437,20,20,color,`stroke="${INK}" stroke-width="5"`)+ellipse(652,437,8,8,'#eedbc5')
        +ellipse(611,407,4,4,INK)+ellipse(691,416,4,4,INK)+ellipse(691,465,4,4,INK)
        +line('M609 465L622 475M648 385L645 402M696 444L710 444',4,INK);
    }
    return art;
  }
  function muzzle(p,s) {
    let art=path('M485 573C520 544 575 551 608 575C639 549 694 553 723 581C754 610 743 652 706 672C676 688 640 684 612 669C582 692 538 688 508 670C470 650 458 607 485 573Z',p.muzzle,`stroke="${INK}" stroke-width="8"`)
      +path('M478 619Q483 655 518 668Q563 688 612 667Q661 686 703 667Q730 650 737 624Q732 676 692 689Q643 703 610 683Q564 705 519 682Q480 666 478 619Z',p.muzzleShade)
      +path('M590 554Q640 531 687 552Q694 570 670 586L643 604Q616 594 602 578Z',p.nose,`stroke="${INK}" stroke-width="8"`)
      +path('M612 554Q645 544 670 553Q638 551 625 562Z','#ffffff20')
      +line('M643 602L639 628',6)
      +ellipse(531,598,5,4,INK)+ellipse(550,588,4,4,INK)+ellipse(554,610,4,4,INK)+ellipse(689,594,4,4,INK)+ellipse(709,608,4,4,INK)+ellipse(685,617,4,4,INK);
    if(s.mouth==='smirk') art+=line('M551 640Q611 682 708 638',8)+line('M700 625Q711 630 714 643',5)+path('M663 653L678 649L673 668L664 666Z','#eee4cc',`stroke="${INK}" stroke-width="4"`)+line('M575 685Q615 701 651 686',5,p.shadow);
    else if(s.mouth==='bored') art+=line('M551 651Q622 639 699 653',8)+line('M565 678Q622 690 676 678',5,p.shadow);
    else if(s.mouth==='grin'||s.mouth==='gold') {
      art+=path('M540 631Q613 650 713 626Q692 691 627 696Q565 696 540 631Z',INK,`stroke="${INK}" stroke-width="7"`)
        +path('M547 636Q625 658 705 634L691 661Q620 679 561 655Z',s.mouth==='gold'?'#dfb554':'#eee5d1',`stroke="${INK}" stroke-width="5"`);
      art+=line('M575 643L581 664M603 648L607 669M632 649L634 669M662 644L660 664',3);
      if(s.mouth==='gold') art+=path('M593 651L599 646L605 653L599 660ZM653 649L659 643L665 649L659 656Z','#f5e6ad');
    } else if(s.mouth==='snarl') {
      art+=path('M540 641Q566 620 593 638Q652 655 713 626Q706 687 642 694Q582 701 550 671Z',INK,`stroke="${INK}" stroke-width="6"`)
        +path('M549 639L575 640L578 679Q559 676 549 639ZM684 640L704 633Q699 667 678 679Z','#eee5d1',`stroke="${INK}" stroke-width="5"`)
        +path('M591 647Q637 660 673 644L665 659L600 664Z','#d9cfb8',`stroke="${INK}" stroke-width="4"`)+line('M543 611Q568 599 590 614',6);
    } else if(s.mouth==='tongue') {
      art+=path('M552 640Q621 664 705 634Q688 691 624 695Q579 691 552 640Z',INK,`stroke="${INK}" stroke-width="7"`)
        +path('M603 679Q622 661 653 677L652 713Q629 738 606 714Z','#c67c7a',`stroke="${INK}" stroke-width="6"`)+line('M629 683L630 710',4,'#954e54');
    } else if(s.mouth==='bubble') {
      art+=line('M549 649Q613 666 694 644',7)+ellipse(681,675,74,71,'#d68d9e',`stroke="${INK}" stroke-width="7"`)+path('M641 652Q652 619 682 623Q660 630 654 655Z','#eab7c0');
    } else if(s.mouth==='cigar') {
      art+=line('M549 650Q619 671 697 640',8)+`<g transform="rotate(-13 716 669)">`+path('M658 650L786 647L795 682L660 680Z','#86553b',`stroke="${INK}" stroke-width="6"`)+path('M727 649L748 649L751 681L730 681Z','#c0a468',`stroke="${INK}" stroke-width="4"`)+ellipse(790,665,11,17,'#bcb9a7',`stroke="${INK}" stroke-width="5"`)+ellipse(791,665,6,12,'#a55b44')+'</g>'+line('M794 631Q768 602 796 576Q818 549 798 528',7,'#e6ddc9');
    }
    return art;
  }
  function scars(s,p) {
    if(s.scar==='none') return '';
    if(s.scar==='cheek') return line('M433 526L478 566',5,'#734b3b')+line('M434 536L444 525M444 545L455 535M454 554L465 545M466 565L476 554',4,INK);
    if(s.scar==='claws') return line('M451 366L459 411L447 444L464 507M474 368L482 413L472 444L488 499M497 378L505 414L496 444L512 489',6,'#8e4d3f')+line('M447 367L455 409M470 369L478 412M494 379L501 414',2,p.light);
    if(s.scar==='cross') return line('M431 509L476 555M473 512L433 554',7,'#8c5347')+line('M433 510L477 555M474 512L434 556',2,p.light);
    if(s.scar==='lightning') return path('M557 278L530 331L552 334L532 379L586 321L560 318L581 278Z','#af6650',`stroke="${INK}" stroke-width="4"`);
    if(s.scar==='bandage') return `<g transform="rotate(36 451 535)">`+`<rect x="411" y="519" width="82" height="32" rx="8" fill="#dac7a1" stroke="${INK}" stroke-width="4"/><rect x="438" y="521" width="29" height="28" rx="3" fill="#bbac8c"/>`+ellipse(421,530,2,2,'#9c8b6c')+ellipse(421,541,2,2,'#9c8b6c')+ellipse(484,530,2,2,'#9c8b6c')+ellipse(484,541,2,2,'#9c8b6c')+'</g>';
    return path('M464 385L475 383L488 415L478 419Z',p.fur)+line('M470 372L483 427',4,'#955e48');
  }
  function glasses(s) {
    if(s.glasses==='none') return '';
    let art=line('M416 426L358 394M708 431L744 405',10);
    if(s.glasses==='shades') {
      art+=path('M410 413L545 418L533 477Q489 500 435 471Z','#302c30',`stroke="${INK}" stroke-width="11"`)+path('M593 419L710 421L694 473Q649 492 607 471Z','#302c30',`stroke="${INK}" stroke-width="11"`)+line('M544 431Q565 417 594 432',11)+path('M427 423L451 425L475 481L453 477ZM611 429L629 429L653 480L634 478Z','#535056');
    } else if(s.glasses==='round') {
      art+=ellipse(484,442,64,59,'#dccf9d20',`stroke="${INK}" stroke-width="11"`)+ellipse(484,442,59,54,'none','stroke="#b89a5d" stroke-width="5"')+ellipse(655,440,56,55,'#dccf9d20',`stroke="${INK}" stroke-width="11"`)+ellipse(655,440,51,50,'none','stroke="#b89a5d" stroke-width="5"')+line('M548 434Q569 422 599 435',8,'#a98b54')+line('M442 422L455 407M619 420L631 408',5,'#eee4c5');
    } else if(s.glasses==='aviator') {
      art+=path('M416 410L548 414L540 451Q518 499 478 494Q426 489 416 410Z','#526263',`stroke="${INK}" stroke-width="10"`)+path('M592 415L712 414Q710 483 669 489Q623 501 601 451Z','#526263',`stroke="${INK}" stroke-width="10"`)+line('M422 415L543 419M598 419L706 419M548 432Q571 418 594 432M539 411Q568 394 601 412',5,'#c5a665')+path('M431 423L452 424L475 483L455 478ZM605 427L621 426L650 480L634 475Z','#83918a');
    } else if(s.glasses==='pixel') {
      art+=path('M410 411H545V467H531V482H438V468H424V454H410ZM594 415H711V454H698V470H684V482H617V468H604V453H594Z','#29252c',`stroke="${INK}" stroke-width="8"`)+path('M437 425H451V439H437ZM451 439H465V453H451ZM465 453H479V467H465ZM615 428H629V442H615ZM629 442H643V456H629Z','#c8c1ae')+path('M545 424H594V438H545Z',INK);
    } else if(s.glasses==='heart') {
      art+=path('M480 493C445 470 406 436 423 411Q444 382 479 412Q509 381 535 405C564 435 515 479 480 493Z','#b55b6c',`stroke="${INK}" stroke-width="9"`)+path('M653 491C620 470 584 439 602 412Q620 389 653 414Q682 387 703 409C727 438 685 478 653 491Z','#b55b6c',`stroke="${INK}" stroke-width="9"`)+line('M544 429Q567 416 594 432',9)+path('M432 422Q440 406 455 412L480 471Q449 448 432 422ZM612 423Q621 410 633 418L655 470Q626 448 612 423Z','#cc8a94');
    } else if(s.glasses==='monocle') {
      art=ellipse(653,441,58,57,'#e1cb9020',`stroke="${INK}" stroke-width="11"`)+ellipse(653,441,53,52,'none','stroke="#d5b261" stroke-width="5"')+line('M691 484Q724 558 690 620Q683 641 700 658',5,'#a98945')+line('M616 422L631 409',6,'#eee0ba');
    }
    return art;
  }
  function hats(s,p) {
    if(s.hat==='none') return '';
    if(s.hat==='beanie') {
      return path('M346 291Q354 188 406 158Q476 113 564 138Q674 141 718 265L727 310L365 326Z','#a64e42',`stroke="${INK}" stroke-width="11"`)
        +path('M420 153Q373 221 382 293L410 290Q398 205 449 142Z','#b65f50')
        +line('M475 143Q447 198 454 279M533 141Q523 199 534 282M590 150Q607 204 612 289M646 178Q668 225 677 293',5,'#803c35')
        +path('M345 278Q523 243 716 284L728 339Q544 303 355 340Z','#b85d4d',`stroke="${INK}" stroke-width="10"`)
        +line('M367 291L374 326M396 285L402 320M427 280L433 314M458 277L463 311M490 276L494 309M523 276L527 310M557 278L560 312M589 280L592 315M622 285L625 319M655 290L658 324M686 296L690 329',4,'#8e443b')
        +`<rect x="565" y="282" width="47" height="30" rx="3" fill="#d6be93" stroke="${INK}" stroke-width="4"/>`
        +path('M579 302L579 290L584 290L584 298L595 298L595 302Z','#704a36');
    }
    if(s.hat==='cap') {
      return path('M345 305Q354 188 467 167Q605 143 685 245L709 313Z','#48606d',`stroke="${INK}" stroke-width="11"`)
        +path('M466 168Q425 227 440 307L498 308Q481 222 513 166Z','#587583')+line('M521 171Q580 219 592 301',6,'#2d414b')
        +path('M490 295Q619 271 704 292L819 337Q832 359 803 362L645 335L492 337Z','#3c505c',`stroke="${INK}" stroke-width="10"`)
        +line('M651 310L797 346',4,'#6e8590')+ellipse(498,166,15,7,'#31434e',`stroke="${INK}" stroke-width="5"`)
        +path('M514 222L536 204L556 220L555 250L534 264L514 250Z','#c6b99a',`stroke="${INK}" stroke-width="5"`)
        +path('M526 224L526 246L543 246L544 240L533 240L533 224Z','#48606d');
    }
    if(s.hat==='bucket') {
      return path('M392 168Q512 135 642 173L690 289L729 326Q550 374 325 334L356 284Z','#c1b27c',`stroke="${INK}" stroke-width="11"`)
        +path('M393 172L364 285Q510 310 686 286L642 173Q625 248 628 290Q524 306 401 286Z','#d0c28c')
        +line('M358 283Q522 317 688 286M337 325Q518 350 714 319',6,'#8a805d')+ellipse(444,237,5,5,'#796f51')+ellipse(612,237,5,5,'#796f51')
        +path('M503 226L522 215L542 224L538 248L520 255L503 244Z','#c5b584',`stroke="${INK}" stroke-width="4"`);
    }
    if(s.hat==='crown') {
      return path('M370 291L345 175L422 225L460 135L520 220L589 130L625 221L714 164L694 293Q534 331 370 291Z','#dfbb57',`stroke="${INK}" stroke-width="11"`)
        +path('M379 261Q536 290 698 258L694 298Q535 333 375 298Z','#c79b3f',`stroke="${INK}" stroke-width="7"`)
        +path('M515 243L531 225L549 244L531 264Z','#8a534c',`stroke="${INK}" stroke-width="4"`)+ellipse(416,262,8,10,'#58847f',`stroke="${INK}" stroke-width="4"`)+ellipse(649,258,8,10,'#58847f',`stroke="${INK}" stroke-width="4"`)
        +ellipse(345,175,13,13,'#edce75',`stroke="${INK}" stroke-width="6"`)+ellipse(460,135,13,13,'#edce75',`stroke="${INK}" stroke-width="6"`)+ellipse(589,130,13,13,'#edce75',`stroke="${INK}" stroke-width="6"`)+ellipse(714,164,13,13,'#edce75',`stroke="${INK}" stroke-width="6"`);
    }
    if(s.hat==='cowboy') {
      return path('M374 285L397 161Q425 126 473 172Q514 203 550 154Q593 118 648 165L687 289Z','#a27d54',`stroke="${INK}" stroke-width="11"`)
        +path('M399 164Q412 216 451 222Q484 208 497 187L474 174Q426 131 399 164Z','#c29a68')
        +path('M375 268Q530 298 684 267L696 305Q529 339 369 305Z','#6e4b36',`stroke="${INK}" stroke-width="6"`)
        +path('M374 291Q302 316 270 278Q251 264 247 293Q265 371 399 347Q546 315 704 350Q796 367 817 292Q818 267 798 282Q759 314 687 289Q527 328 374 291Z','#b28a59',`stroke="${INK}" stroke-width="10"`)
        +line('M281 321Q325 343 395 327M706 329Q760 346 791 318',5,'#7b573b')
        +path('M511 287L532 273L554 287L550 307L528 317L511 305Z','#d6bc76',`stroke="${INK}" stroke-width="4"`);
    }
    if(s.hat==='sailor') {
      return path('M353 280Q384 165 516 162Q640 157 696 283Z','#deddd1',`stroke="${INK}" stroke-width="11"`)
        +path('M370 267Q531 236 688 266L711 309Q540 349 353 311Z','#eae5d4',`stroke="${INK}" stroke-width="10"`)
        +path('M494 176Q474 210 483 248', 'none','stroke="#b8b8ad" stroke-width="5"')
        +line('M378 293Q527 270 687 290',5,'#aeb0a6')
        +path('M526 276V305M514 290H538M509 297Q526 319 543 297M521 277Q526 265 532 277', 'none',`stroke="#465460" stroke-width="5"`);
    }
    return ellipse(527,152,148,27,'none',`stroke="${INK}" stroke-width="14"`)+ellipse(527,152,148,27,'none','stroke="#dfb850" stroke-width="7"')+line('M404 132L413 120M647 130L657 117M530 111V96',5,'#e7c86a');
  }
  function renderSVG(input,options={}) {
    const s=validate(input),p=palettes[s.skin];
    const bg=traits[0].options.find(o=>o.id===s.background).color;
    const size=Math.max(64,Math.min(8192,Math.round(Number(options.size)||1024)));
    const label=`PRIDE lion, ${traits[1].options.find(o=>o.id===s.skin).label}, ${traits[2].options.find(o=>o.id===s.hat).label}, ${traits[4].options.find(o=>o.id===s.eyeType).label}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1000 1000" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title><defs><clipPath id="pride-face-clip">${path(facePath,'white')}</clipPath></defs><rect width="1000" height="1000" fill="${bg}"/><g stroke-linecap="round" stroke-linejoin="round">${torso(p,s.top)}${mane(p)}${face(p,s)}${eyes(p,s)}${muzzle(p,s)}${scars(s,p)}${glasses(s)}${hats(s,p)}</g></svg>`;
  }
  function randomize(previous) {
    const next={};
    for(const trait of traits) {
      const optional=['hat','glasses','scar'].includes(trait.key);
      next[trait.key]=optional&&Math.random()<.26?'none':trait.options[Math.floor(Math.random()*trait.options.length)].id;
    }
    if(previous && traits.every(t=>next[t.key]===previous[t.key])) next.background=traits[0].options[(traits[0].options.findIndex(o=>o.id===next.background)+1)%traits[0].options.length].id;
    return next;
  }
  global.LionArt={traits,defaults:{...defaults},renderSVG,randomize,validate};
})(typeof window!=='undefined'?window:globalThis);
