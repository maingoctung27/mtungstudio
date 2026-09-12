(function(){
  'use strict';

  var MOBILE_QUERY = '(max-width: 600px)';
  var AUTOPLAY_MS = 8000;

  var INFO = {
    en: {
      label:'About Mai Tung',
      title:'ARCHITECT\nDESIGNER\nSTORYTELLER',
      lead:'Based in Italy, working internationally.',
      body:'My practice explores the intersection of design, technology, culture and environmental performance. I work across architecture, urban design, landscape and visual communication, with a particular interest in climate-responsive and socially grounded design.',
      experience:'PROFESSIONAL EXPERIENCE',
      experienceRows:[
        ['Architect','Architecture · Spatial Design','High-level architectural design, spatial innovation and site planning.'],
        ['Designer','Sustainable Urban Projects','Conceptual development integrating environmental analysis and technology into design models.'],
        ['Assistant','Architecture · Documentation','Architectural documentation, 3D modelling and development support.'],
        ['Intern','International Practice','Experience across architecture offices in Vietnam, India and Egypt.']
      ],
      education:'EDUCATION',
      educationRows:[
        ['Master in Sustainable Architecture and Design','School of Sustainability, Milan'],
        ['Bachelor of Architecture','Hanoi Architectural University, Vietnam']
      ],
      expertise:'EXPERTISE',
      expertiseText:'Architecture · Sustainable Design · Environmental Performance · Urban Design · Landscape Architecture · Spatial Design · Architectural Research · Visualization',
      tools:'TOOLS',
      toolsText:'Rhino · Grasshopper · Revit · SketchUp · Lumion · Unreal Engine · Adobe Creative Suite · Ladybug Tools',
      contact:'CONTACT',
      contactTitle:'Let’s start a conversation.',
      email:'maingoctung@gmail.com',
      cv:'Download CV',
      end:'© M.TUNG STUDIO · Based in Italy'
    },
    vn: {
      label:'Về Mai Tung',
      title:'KIẾN TRÚC SƯ\nNHÀ THIẾT KẾ\nNGƯỜI KỂ CHUYỆN',
      lead:'Làm việc tại Ý, hoạt động quốc tế.',
      body:'Thực hành của tôi khám phá giao điểm giữa thiết kế, công nghệ, văn hóa và hiệu năng môi trường. Tôi làm việc trong các lĩnh vực kiến trúc, thiết kế đô thị, cảnh quan và truyền thông thị giác, đặc biệt quan tâm đến thiết kế thích ứng khí hậu và gắn với cộng đồng.',
      experience:'KINH NGHIỆM CHUYÊN MÔN',
      experienceRows:[
        ['Kiến trúc sư','Kiến trúc · Thiết kế không gian','Thiết kế kiến trúc, đổi mới không gian và quy hoạch địa điểm.'],
        ['Nhà thiết kế','Dự án đô thị bền vững','Phát triển ý tưởng tích hợp phân tích môi trường và công nghệ vào mô hình thiết kế.'],
        ['Trợ lý','Kiến trúc · Hồ sơ','Triển khai hồ sơ kiến trúc, dựng mô hình 3D và hỗ trợ phát triển thiết kế.'],
        ['Thực tập sinh','Thực hành quốc tế','Kinh nghiệm tại các văn phòng kiến trúc ở Việt Nam, Ấn Độ và Ai Cập.']
      ],
      education:'HỌC VẤN',
      educationRows:[
        ['Thạc sĩ Kiến trúc và Thiết kế Bền vững','School of Sustainability, Milan'],
        ['Cử nhân Kiến trúc','Đại học Kiến trúc Hà Nội, Việt Nam']
      ],
      expertise:'CHUYÊN MÔN',
      expertiseText:'Kiến trúc · Thiết kế bền vững · Hiệu năng môi trường · Thiết kế đô thị · Kiến trúc cảnh quan · Thiết kế không gian · Nghiên cứu kiến trúc · Diễn họa',
      tools:'CÔNG CỤ',
      toolsText:'Rhino · Grasshopper · Revit · SketchUp · Lumion · Unreal Engine · Adobe Creative Suite · Ladybug Tools',
      contact:'LIÊN HỆ',
      contactTitle:'Hãy bắt đầu một cuộc trò chuyện.',
      email:'maingoctung@gmail.com',
      cv:'Tải CV',
      end:'© M.TUNG STUDIO · Làm việc tại Ý'
    }
  };

  var PROJECT_VN = {
    'Milano Community Food Hub':'Trung tâm Thực phẩm Cộng đồng Milano',
    'Hanoi Theater':'Nhà hát Hà Nội',
    'Thang Long Youth Center':'Trung tâm Thanh thiếu niên Thăng Long',
    'Son La Climate Combat Urban Design':'Thiết kế Đô thị Ứng phó Khí hậu Sơn La',
    'Hanoi Museum Installation':'Sắp đặt Bảo tàng Hà Nội',
    'Tura':'Tura'
  };

  function isMobile(){ return window.matchMedia && window.matchMedia(MOBILE_QUERY).matches; }

  function init(){
    if(!isMobile()) return;
    var page=document.querySelector('.projects-page');
    var grid=page && page.querySelector('.grid');
    if(!page || !grid || page.querySelector('.mtung-mobile-scene')) return;

    var sourceCards=Array.prototype.slice.call(grid.querySelectorAll(':scope > .card'));
    if(!sourceCards.length) return;

    var scene=document.createElement('div');
    scene.className='mtung-mobile-scene';

    var carousel=document.createElement('section');
    carousel.className='mtung-mobile-carousel';
    carousel.setAttribute('aria-label','Selected projects');
    carousel.innerHTML=
      '<div class="mtung-mobile-topline"></div>'+
      '<div class="mtung-mobile-status"><div class="mtung-mobile-dots"></div><span class="mtung-mobile-counter">01 / 06</span></div>'+
      '<div class="mtung-mobile-stage"></div>'+
      '<button class="mtung-mobile-info-trigger" type="button" aria-label="Open information"><span class="info-chevron">⌃</span><span class="info-label">Info</span></button>';

    var info=document.createElement('section');
    info.className='mtung-mobile-info-panel';
    info.setAttribute('aria-hidden','true');
    info.innerHTML=
      '<div class="mtung-mobile-info-header"><span class="mobile-info-word">INFO</span><div class="mobile-info-actions"><button class="mobile-lang en" type="button">EN</button><span>/</span><button class="mobile-lang vn" type="button">VN</button><button type="button" class="mtung-mobile-info-close" aria-label="Close information">×</button></div></div>'+
      '<div class="mtung-mobile-info-content"></div>';

    page.insertBefore(scene,grid);
    scene.appendChild(carousel);
    scene.appendChild(info);

    var stage=carousel.querySelector('.mtung-mobile-stage');
    var dots=carousel.querySelector('.mtung-mobile-dots');
    var counter=carousel.querySelector('.mtung-mobile-counter');
    var trigger=carousel.querySelector('.mtung-mobile-info-trigger');
    var close=info.querySelector('.mtung-mobile-info-close');
    var cards=[];
    var total=sourceCards.length;

    sourceCards.forEach(function(src,i){
      var c=document.createElement('a');
      c.className='mtung-mobile-card';
      c.href=src.getAttribute('href') || '#';
      c.setAttribute('data-index',i);
      var media=src.querySelector('img,video');
      var mediaWrap=document.createElement('div'); mediaWrap.className='mm-media';
      if(media){
        var clone=media.cloneNode(true); clone.removeAttribute('loading'); clone.removeAttribute('width'); clone.removeAttribute('height');
        if(clone.tagName==='VIDEO'){ clone.autoplay=true; clone.muted=true; clone.loop=true; clone.playsInline=true; clone.setAttribute('preload','metadata'); }
        mediaWrap.appendChild(clone);
      }
      var meta=document.createElement('div'); meta.className='mm-info';
      var num=((src.querySelector('.num')||{}).textContent || String(i+1).padStart(2,'0')).trim();
      var title=((src.querySelector('h2')||{}).textContent || '').trim();
      var type=((src.querySelector('.meta p')||{}).textContent || '').trim();
      meta.innerHTML='<div class="mm-num"></div><div class="mm-title"></div><div class="mm-type"></div>';
      meta.querySelector('.mm-num').textContent=num; meta.querySelector('.mm-title').textContent=title; meta.querySelector('.mm-type').textContent=type;
      c.appendChild(mediaWrap); c.appendChild(meta); stage.appendChild(c); cards.push(c);
      var dot=document.createElement('span'); dot.className='mtung-mobile-dot'; dots.appendChild(dot);
    });

    var index=0,timer=null,downX=0,downY=0,moved=false,infoOpen=false,lang=localStorage.getItem('mtungLang')||'en';

    function norm(n){return (n%total+total)%total;}
    function position(){
      cards.forEach(function(c,i){
        var d=i-index; if(d>total/2)d-=total; if(d<-total/2)d+=total;
        c.setAttribute('data-pos',Math.abs(d)>2?'far':String(d));
        c.style.pointerEvents=d===0?'auto':'none';
        c.setAttribute('aria-hidden',d===0?'false':'true');
      });
      Array.prototype.slice.call(dots.children).forEach(function(d,i){d.classList.toggle('active',i===index);});
      counter.textContent=String(index+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
    }
    function restart(){clearInterval(timer);if(!infoOpen)timer=setInterval(function(){go(1);},AUTOPLAY_MS);}
    function go(step){if(infoOpen)return;index=norm(index+step);position();restart();}

    function renderInfo(){
      var t=INFO[lang], content=info.querySelector('.mtung-mobile-info-content');
      var title=t.title.replace(/\n/g,'<br>');
      var exp=t.experienceRows.map(function(r){return '<div class="info-row"><strong>'+r[0]+'</strong><span>'+r[1]+'</span><p>'+r[2]+'</p></div>';}).join('');
      var edu=t.educationRows.map(function(r){return '<div class="info-edu"><strong>'+r[0]+'</strong><span>'+r[1]+'</span></div>';}).join('');
      content.innerHTML=
        '<p class="mm-info-label">'+t.label+'</p>'+
        '<h1>'+title+'</h1>'+
        '<p class="mm-info-lead">'+t.lead+'</p>'+
        '<div class="mm-info-rule"></div>'+
        '<p class="mm-info-body">'+t.body+'</p>'+
        '<div class="mm-info-rule"></div>'+
        '<h2>'+t.experience+'</h2>'+exp+
        '<div class="mm-info-rule"></div>'+
        '<h2>'+t.education+'</h2>'+edu+
        '<div class="mm-info-rule"></div>'+
        '<h2>'+t.expertise+'</h2><p class="mm-info-text">'+t.expertiseText+'</p>'+
        '<h2 class="info-subhead">'+t.tools+'</h2><p class="mm-info-text">'+t.toolsText+'</p>'+
        '<div class="mm-info-rule"></div>'+
        '<h2>'+t.contact+'</h2><h3>'+t.contactTitle+'</h3>'+
        '<div class="mm-info-contact"><a href="mailto:'+t.email+'">'+t.email+'</a><a href="https://www.linkedin.com/in/mai-tung-79a442216/" target="_blank" rel="noopener">LinkedIn</a><a href="https://www.instagram.com/maitungiii/" target="_blank" rel="noopener">Instagram</a><a href="https://mtungstudio.pages.dev/" target="_blank" rel="noopener">mtungstudio.pages.dev</a></div>'+
        '<a class="mm-info-cv" href="/assets/Mai-Tung-CV.pdf" target="_blank" rel="noopener">'+t.cv+' <span>↓</span></a>'+
        '<p class="mm-info-end">'+t.end+'</p>';
      info.querySelector('.mobile-lang.en').classList.toggle('active',lang==='en');
      info.querySelector('.mobile-lang.vn').classList.toggle('active',lang==='vn');
      carousel.querySelector('.info-label').textContent=lang==='vn'?'Thông tin':'Info';
      cards.forEach(function(c){
        var title=c.querySelector('.mm-title').textContent.trim();
        c.querySelector('.mm-title').textContent=lang==='vn'?(PROJECT_VN[title]||title):title;
      });
    }

    function setLang(next){lang=next;localStorage.setItem('mtungLang',lang);renderInfo();}
    function openInfo(){if(infoOpen)return;infoOpen=true;clearInterval(timer);renderInfo();scene.classList.add('is-info-open');document.body.classList.add('mtung-mobile-info-open');info.setAttribute('aria-hidden','false');}
    function closeInfo(){if(!infoOpen)return;infoOpen=false;scene.classList.remove('is-info-open');document.body.classList.remove('mtung-mobile-info-open');info.setAttribute('aria-hidden','true');restart();}

    trigger.addEventListener('click',openInfo); close.addEventListener('click',closeInfo);
    info.querySelector('.mobile-lang.en').addEventListener('click',function(){setLang('en');});
    info.querySelector('.mobile-lang.vn').addEventListener('click',function(){setLang('vn');});

    var infoStartY=0,infoMoved=false;
    carousel.addEventListener('pointerdown',function(e){if(infoOpen)return;if(e.pointerType==='mouse'&&e.button!==0)return;downX=e.clientX;downY=e.clientY;moved=false;if(carousel.setPointerCapture)carousel.setPointerCapture(e.pointerId);});
    carousel.addEventListener('pointermove',function(e){if(infoOpen)return;if(Math.abs(e.clientX-downX)>8||Math.abs(e.clientY-downY)>8)moved=true;});
    carousel.addEventListener('pointerup',function(e){
      if(infoOpen)return;
      var dx=e.clientX-downX,dy=e.clientY-downY;
      if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.15){go(dx<0?1:-1);e.preventDefault();return;}
      restart();
    });
    carousel.addEventListener('pointercancel',restart);
    carousel.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);

    cards.forEach(function(c){c.addEventListener('click',function(e){if(moved)return;var i=Number(c.getAttribute('data-index'));var d=i-index;if(d>total/2)d-=total;if(d<-total/2)d+=total;if(d!==0){e.preventDefault();go(d>0?1:-1);}});});

    info.addEventListener('pointerdown',function(e){infoStartY=e.clientY;infoMoved=false;if(info.setPointerCapture)info.setPointerCapture(e.pointerId);});
    info.addEventListener('pointermove',function(e){if(Math.abs(e.clientY-infoStartY)>8)infoMoved=true;});
    info.addEventListener('pointerup',function(e){var dy=e.clientY-infoStartY;if(dy>70&&Math.abs(dy)>Math.abs(e.clientX-(window.innerWidth/2))*0.15){closeInfo();e.preventDefault();}});

    position(); renderInfo(); restart();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('resize',function(){if(isMobile()&&!document.querySelector('.mtung-mobile-scene'))init();});
})();
