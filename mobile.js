(function(){
  var translations = {
    en: {
      navProjects: 'Projects', navInfo: 'Info', language: 'Language',
      projects: [
        ['Milano Community Food Hub','Architecture · Urban · Landscape'],
        ['Hanoi Theater','Architecture · Cultural'],
        ['Thang Long Youth Center','Architecture · Urban · Landscape'],
        ['Son La Climate Combat Urban Design','Urban Design · Climate'],
        ['Hanoi Museum Installation','Architecture · Installation'],
        ['Tura','Architecture · Cultural']
      ]
    },
    vn: {
      navProjects: 'Dự án', navInfo: 'Thông tin', language: 'Ngôn ngữ',
      projects: [
        ['Trung tâm Thực phẩm Cộng đồng Milano','Kiến trúc · Đô thị · Cảnh quan'],
        ['Nhà hát Hà Nội','Kiến trúc · Văn hóa'],
        ['Trung tâm Thanh thiếu niên Thăng Long','Kiến trúc · Đô thị · Cảnh quan'],
        ['Thiết kế Đô thị Ứng phó Khí hậu Sơn La','Thiết kế Đô thị · Khí hậu'],
        ['Sắp đặt Bảo tàng Hà Nội','Kiến trúc · Sắp đặt'],
        ['Tura','Kiến trúc · Văn hóa']
      ]
    }
  };

  function initLanguageSwitch(){
    if(window.innerWidth>600 || document.querySelector('.mtung-mobile-language')) return;
    var header=document.querySelector('.header');
    if(!header) return;
    var wrap=document.createElement('div');
    wrap.className='mtung-mobile-language';
    wrap.setAttribute('aria-label','Language');
    wrap.innerHTML='<button type="button" data-lang="en">EN</button><span>/</span><button type="button" data-lang="vn">VN</button>';
    header.appendChild(wrap);
    wrap.querySelectorAll('button').forEach(function(btn){
      btn.addEventListener('click',function(){ setLanguage(btn.getAttribute('data-lang')); });
    });
  }

  function setLanguage(lang){
    if(lang!=='vn') lang='en';
    document.documentElement.lang = lang==='vn' ? 'vi' : 'en';
    try{ localStorage.setItem('mtung-language',lang); }catch(e){}
    var wrap=document.querySelector('.mtung-mobile-language');
    if(wrap){
      wrap.querySelectorAll('button').forEach(function(btn){btn.classList.toggle('active',btn.getAttribute('data-lang')===lang);});
    }
    var cards=document.querySelectorAll('.mtung-mobile-card');
    cards.forEach(function(card,i){
      var item=translations[lang].projects[i];
      if(!item) return;
      var title=card.querySelector('.mm-title');
      var type=card.querySelector('.mm-type');
      if(title) title.textContent=item[0];
      if(type) type.textContent=item[1];
      card.setAttribute('aria-label','Open '+item[0]);
    });
    var nav=document.querySelector('.header nav');
    if(nav){
      var links=nav.querySelectorAll('a');
      if(links[0]) links[0].textContent=translations[lang].navProjects;
      if(links[1]) links[1].textContent=translations[lang].navInfo;
    }
  }

  function init(){
    if(window.innerWidth>800) return;
    var page=document.querySelector('.projects-page');
    var grid=page && page.querySelector('.grid');
    if(!page || !grid || page.querySelector('.mtung-mobile-carousel')) return;
    var sourceCards=[].slice.call(grid.querySelectorAll(':scope > .card'));
    if(!sourceCards.length) return;

    var carousel=document.createElement('section');
    carousel.className='mtung-mobile-carousel';
    carousel.setAttribute('aria-label','Selected projects');
    carousel.innerHTML='<div class="mtung-mobile-topline"></div><div class="mtung-mobile-status"><div class="mtung-mobile-dots"></div><span class="mtung-mobile-counter">01 / 06</span></div><div class="mtung-mobile-stage"></div><div class="mtung-mobile-bottom"></div>';
    page.insertBefore(carousel,grid);

    var stage=carousel.querySelector('.mtung-mobile-stage');
    var dots=carousel.querySelector('.mtung-mobile-dots');
    var counter=carousel.querySelector('.mtung-mobile-counter');
    var cards=[];

    sourceCards.forEach(function(src,i){
      var c=document.createElement('a');
      c.className='mtung-mobile-card';
      c.href=src.getAttribute('href') || '#';
      c.setAttribute('data-index',i);
      c.setAttribute('aria-label','Open '+((src.querySelector('h2')||{}).textContent||'project').trim());
      var media=src.querySelector('img,video');
      var mediaWrap=document.createElement('div'); mediaWrap.className='mm-media';
      if(media){
        var clone=media.cloneNode(true);
        clone.removeAttribute('loading');
        clone.removeAttribute('width'); clone.removeAttribute('height');
        if(clone.tagName==='VIDEO'){clone.setAttribute('autoplay','');clone.setAttribute('muted','');clone.setAttribute('loop','');clone.setAttribute('playsinline','');clone.setAttribute('preload','metadata');}
        mediaWrap.appendChild(clone);
      }
      var info=document.createElement('div'); info.className='mm-info';
      var num=(src.querySelector('.num')||{}).textContent || String(i+1).padStart(2,'0');
      var title=(src.querySelector('h2')||{}).textContent || '';
      var type=(src.querySelector('.meta p')||{}).textContent || '';
      info.innerHTML='<div><div class="mm-num"></div><div class="mm-title"></div><div class="mm-type"></div></div>';
      info.querySelector('.mm-num').textContent=num.trim();
      info.querySelector('.mm-title').textContent=title.trim();
      info.querySelector('.mm-type').textContent=type.trim();
      c.appendChild(mediaWrap); c.appendChild(info); stage.appendChild(c); cards.push(c);
      var dot=document.createElement('span'); dot.className='mtung-mobile-dot'; dots.appendChild(dot);
    });

    var index=0,timer=null,downX=0,downY=0,dragging=false,moved=false;
    var total=cards.length;
    var duration=8000;

    function norm(n){return (n%total+total)%total;}
    function position(){
      cards.forEach(function(c,i){
        var d=i-index;
        if(d>total/2)d-=total;
        if(d<-total/2)d+=total;
        c.setAttribute('data-pos',Math.abs(d)>2?'far':String(d));
        c.style.pointerEvents=(d===0)?'auto':'none';
      });
      [].slice.call(dots.children).forEach(function(d,i){d.classList.toggle('active',i===index);});
      counter.textContent=String(index+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
    }
    function go(step){index=norm(index+step);position();restart();}
    function restart(){clearInterval(timer);timer=setInterval(function(){go(1);},duration);}

    carousel.addEventListener('pointerdown',function(e){
      if(e.pointerType==='mouse' && e.button!==0)return;
      downX=e.clientX;downY=e.clientY;dragging=true;moved=false;
      if(carousel.setPointerCapture) carousel.setPointerCapture(e.pointerId);
    });
    carousel.addEventListener('pointermove',function(e){
      if(!dragging)return;
      if(Math.abs(e.clientX-downX)>8 || Math.abs(e.clientY-downY)>8)moved=true;
    });
    carousel.addEventListener('pointerup',function(e){
      if(!dragging)return;dragging=false;
      var dx=e.clientX-downX,dy=e.clientY-downY;
      if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.15){
        go(dx<0?1:-1);e.preventDefault();return;
      }
      restart();
    });
    carousel.addEventListener('pointercancel',function(){dragging=false;restart();});
    carousel.addEventListener('click',function(e){
      if(moved){e.preventDefault();e.stopPropagation();moved=false;}
    },true);

    cards.forEach(function(c){c.addEventListener('click',function(e){
      var i=Number(c.getAttribute('data-index'));var d=i-index;
      if(d>total/2)d-=total;if(d<-total/2)d+=total;
      if(d!==0){e.preventDefault();go(d>0?1:-1);}
    });});

    position();restart();
    initLanguageSwitch();
    var saved='en';
    try{saved=localStorage.getItem('mtung-language')||'en';}catch(e){}
    setLanguage(saved);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.addEventListener('resize',function(){if(window.innerWidth<=800 && !document.querySelector('.mtung-mobile-carousel'))init();});
})();
