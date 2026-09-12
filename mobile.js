(function(){
  'use strict';

  var MOBILE_QUERY = '(max-width: 600px)';
  var AUTOPLAY_MS = 8000;

  function isMobile(){
    return window.matchMedia && window.matchMedia(MOBILE_QUERY).matches;
  }

  function init(){
    if(!isMobile()) return;

    var page = document.querySelector('.projects-page');
    var grid = page && page.querySelector('.grid');
    if(!page || !grid || page.querySelector('.mtung-mobile-carousel')) return;

    var sourceCards = Array.prototype.slice.call(grid.querySelectorAll(':scope > .card'));
    if(!sourceCards.length) return;

    var scene = document.createElement('div');
    scene.className = 'mtung-mobile-scene';

    var carousel = document.createElement('section');
    carousel.className = 'mtung-mobile-carousel';
    carousel.setAttribute('aria-label','Selected projects');
    carousel.innerHTML =
      '<div class="mtung-mobile-topline"></div>' +
      '<div class="mtung-mobile-status"><div class="mtung-mobile-dots"></div><span class="mtung-mobile-counter">01 / 06</span></div>' +
      '<div class="mtung-mobile-stage"></div>' +
      '<button class="mtung-mobile-info-trigger" type="button" aria-label="Open information"><span class="info-chevron">⌃</span><span>Info</span></button>';

    var info = document.createElement('section');
    info.className = 'mtung-mobile-info-panel';
    info.setAttribute('aria-hidden','true');
    info.innerHTML =
      '<div class="mtung-mobile-info-header">' +
        '<span>INFO</span>' +
        '<div class="mm-info-header-actions">' +
          '<button type="button" class="mm-lang lang-active" data-lang="en">EN</button>' +
          '<span>/</span>' +
          '<button type="button" class="mm-lang" data-lang="vi">VN</button>' +
          '<button type="button" class="mtung-mobile-info-close" aria-label="Close information">×</button>' +
        '</div>' +
      '</div>' +

      '<div class="mtung-mobile-info-content" data-info-lang="en">' +
        '<div class="mm-info-intro">' +
          '<div class="mm-info-portrait"><img src="/assets/mai-tung-portrait.jpg" alt="Mai Tung — architect and designer based in Italy"></div>' +
          '<div class="mm-info-intro-text">' +
            '<p class="mm-info-label">ABOUT MAI TUNG</p>' +
            '<h1>ARCHITECT<br>DESIGNER<br>STORYTELLER</h1>' +
            '<p class="mm-info-lead">Based in Italy, working internationally.</p>' +
          '</div>' +
        '</div>' +
        '<div class="mm-info-rule"></div>' +
        '<p class="mm-info-body">My practice explores the intersection of design, technology, culture and environmental performance. I work across architecture, urban design, landscape and visual communication, with a particular interest in climate-responsive and socially grounded design.</p>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>PROFESSIONAL EXPERIENCE</h2>' +
        '<div class="mm-info-list">' +
          '<div><strong>ARCHITECT</strong><span>Architecture · Spatial Design<br>High-level architectural design, spatial innovation and site planning.</span></div>' +
          '<div><strong>DESIGNER</strong><span>Sustainable Urban Projects<br>Conceptual development integrating environmental analysis and technology into design models.</span></div>' +
          '<div><strong>ASSISTANT</strong><span>Architecture · Documentation<br>Architectural documentation, 3D modelling and development support.</span></div>' +
          '<div><strong>INTERN</strong><span>International Practice<br>Experience across architecture offices in Vietnam, India and Egypt.</span></div>' +
        '</div>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>EDUCATION</h2>' +
        '<div class="mm-info-list">' +
          '<div><strong>MASTER</strong><span>Sustainable Architecture and Design<br>School of Sustainability, Milan</span></div>' +
          '<div><strong>BACHELOR</strong><span>Architecture<br>Hanoi Architectural University, Vietnam</span></div>' +
        '</div>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>EXPERTISE</h2>' +
        '<p class="mm-info-tags"><span>Architecture</span><span>Sustainable Design</span><span>Environmental Performance</span><span>Urban Design</span><span>Landscape Architecture</span><span>Spatial Design</span><span>Architectural Research</span><span>Visualization</span></p>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>TOOLS</h2>' +
        '<p class="mm-info-tags"><span>Rhino</span><span>Grasshopper</span><span>Revit</span><span>SketchUp</span><span>Lumion</span><span>Unreal Engine</span><span>Adobe Creative Suite</span><span>Ladybug Tools</span></p>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>CONTACT</h2>' +
        '<h3 class="mm-info-contact-title">Let’s start a conversation.</h3>' +
        '<div class="mm-info-contact">' +
          '<a href="mailto:maingoctung27@gmail.com">maingoctung27@gmail.com</a>' +
          '<a href="https://www.instagram.com/maitungiii/" target="_blank" rel="noopener">Instagram</a>' +
          '<a href="https://www.linkedin.com/in/mai-tung-79a442216/" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a class="mm-info-cv" href="/assets/CV00.pdf" target="_blank" rel="noopener" download>Download CV <span>↓</span></a>' +
        '</div>' +
      '</div>' +

      '<div class="mtung-mobile-info-content mm-info-vn" data-info-lang="vi" hidden>' +
        '<div class="mm-info-intro">' +
          '<div class="mm-info-portrait"><img src="/assets/mai-tung-portrait.jpg" alt="Mai Tung — kiến trúc sư và nhà thiết kế"></div>' +
          '<div class="mm-info-intro-text">' +
            '<p class="mm-info-label">VỀ MAI TUNG</p>' +
            '<h1>KIẾN TRÚC SƯ<br>NHÀ THIẾT KẾ<br>NGƯỜI KỂ CHUYỆN</h1>' +
            '<p class="mm-info-lead">Làm việc tại Ý và quốc tế.</p>' +
          '</div>' +
        '</div>' +
        '<div class="mm-info-rule"></div>' +
        '<p class="mm-info-body">Thực hành thiết kế của tôi khám phá giao điểm giữa thiết kế, công nghệ, văn hóa và hiệu suất môi trường. Tôi làm việc trong kiến trúc, thiết kế đô thị, cảnh quan và truyền thông thị giác, với mối quan tâm đặc biệt đến thiết kế thích ứng khí hậu và hướng đến cộng đồng.</p>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>KINH NGHIỆM CHUYÊN MÔN</h2>' +
        '<div class="mm-info-list">' +
          '<div><strong>KIẾN TRÚC SƯ</strong><span>Kiến trúc · Thiết kế không gian<br>Thiết kế kiến trúc, đổi mới không gian và quy hoạch địa điểm.</span></div>' +
          '<div><strong>NHÀ THIẾT KẾ</strong><span>Dự án đô thị bền vững<br>Phát triển ý tưởng kết hợp phân tích môi trường và công nghệ.</span></div>' +
          '<div><strong>TRỢ LÝ</strong><span>Kiến trúc · Hồ sơ<br>Hồ sơ kiến trúc, dựng hình 3D và hỗ trợ phát triển thiết kế.</span></div>' +
          '<div><strong>THỰC TẬP</strong><span>Thực hành quốc tế<br>Kinh nghiệm tại các văn phòng kiến trúc ở Việt Nam, Ấn Độ và Ai Cập.</span></div>' +
        '</div>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>HỌC VẤN</h2>' +
        '<div class="mm-info-list">' +
          '<div><strong>THẠC SĨ</strong><span>Kiến trúc và Thiết kế Bền vững<br>School of Sustainability, Milan</span></div>' +
          '<div><strong>CỬ NHÂN</strong><span>Kiến trúc<br>Đại học Kiến trúc Hà Nội, Việt Nam</span></div>' +
        '</div>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>CHUYÊN MÔN</h2>' +
        '<p class="mm-info-tags"><span>Kiến trúc</span><span>Thiết kế bền vững</span><span>Hiệu suất môi trường</span><span>Thiết kế đô thị</span><span>Cảnh quan</span><span>Thiết kế không gian</span><span>Nghiên cứu kiến trúc</span><span>Diễn họa</span></p>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>CÔNG CỤ</h2>' +
        '<p class="mm-info-tags"><span>Rhino</span><span>Grasshopper</span><span>Revit</span><span>SketchUp</span><span>Lumion</span><span>Unreal Engine</span><span>Adobe Creative Suite</span><span>Ladybug Tools</span></p>' +
        '<div class="mm-info-rule"></div>' +
        '<h2>LIÊN HỆ</h2>' +
        '<h3 class="mm-info-contact-title">Hãy bắt đầu một cuộc trò chuyện.</h3>' +
        '<div class="mm-info-contact">' +
          '<a href="mailto:maingoctung27@gmail.com">maingoctung27@gmail.com</a>' +
          '<a href="https://www.instagram.com/maitungiii/" target="_blank" rel="noopener">Instagram</a>' +
          '<a href="https://www.linkedin.com/in/mai-tung-79a442216/" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a class="mm-info-cv" href="/assets/CV00.pdf" target="_blank" rel="noopener" download>Tải CV <span>↓</span></a>' +
        '</div>' +
      '</div>';

    page.insertBefore(scene, grid);
    scene.appendChild(carousel);
    scene.appendChild(info);

    var stage = carousel.querySelector('.mtung-mobile-stage');
    var dots = carousel.querySelector('.mtung-mobile-dots');
    var counter = carousel.querySelector('.mtung-mobile-counter');
    var trigger = carousel.querySelector('.mtung-mobile-info-trigger');
    var close = info.querySelector('.mtung-mobile-info-close');
    var langButtons = Array.prototype.slice.call(info.querySelectorAll('.mm-lang'));
    var langPanels = Array.prototype.slice.call(info.querySelectorAll('[data-info-lang]'));
    langButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var lang = btn.getAttribute('data-lang');
        langButtons.forEach(function(b){ b.classList.toggle('lang-active', b === btn); });
        langPanels.forEach(function(panel){
          var show = panel.getAttribute('data-info-lang') === lang;
          panel.hidden = !show;
        });
      });
    });
    var cards = [];

    sourceCards.forEach(function(src, i){
      var c = document.createElement('a');
      c.className = 'mtung-mobile-card';
      c.href = src.getAttribute('href') || '#';
      c.setAttribute('data-index', i);
      var media = src.querySelector('img,video');
      var mediaWrap = document.createElement('div');
      mediaWrap.className = 'mm-media';
      if(media){
        var clone = media.cloneNode(true);
        clone.removeAttribute('loading');
        clone.removeAttribute('width');
        clone.removeAttribute('height');
        if(clone.tagName === 'VIDEO'){
          clone.autoplay = true; clone.muted = true; clone.loop = true; clone.playsInline = true;
          clone.setAttribute('preload','metadata');
        }
        mediaWrap.appendChild(clone);
      }

      var meta = document.createElement('div');
      meta.className = 'mm-info';
      var num = ((src.querySelector('.num') || {}).textContent || String(i+1).padStart(2,'0')).trim();
      var title = ((src.querySelector('h2') || {}).textContent || '').trim();
      var type = ((src.querySelector('.meta p') || {}).textContent || '').trim();
      meta.innerHTML = '<div class="mm-num"></div><div class="mm-title"></div><div class="mm-type"></div>';
      meta.querySelector('.mm-num').textContent = num;
      meta.querySelector('.mm-title').textContent = title;
      meta.querySelector('.mm-type').textContent = type;

      c.appendChild(mediaWrap);
      c.appendChild(meta);
      stage.appendChild(c);
      cards.push(c);

      var dot = document.createElement('span');
      dot.className = 'mtung-mobile-dot';
      dots.appendChild(dot);
    });

    var index = 0;
    var timer = null;
    var downX = 0, downY = 0;
    var moved = false;
    var total = cards.length;
    var infoOpen = false;

    function norm(n){ return (n % total + total) % total; }

    function position(){
      cards.forEach(function(c,i){
        var d = i - index;
        if(d > total/2) d -= total;
        if(d < -total/2) d += total;
        c.setAttribute('data-pos', Math.abs(d) > 2 ? 'far' : String(d));
        c.style.pointerEvents = d === 0 ? 'auto' : 'none';
        c.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      });
      Array.prototype.slice.call(dots.children).forEach(function(d,i){ d.classList.toggle('active', i === index); });
      counter.textContent = String(index+1).padStart(2,'0') + ' / ' + String(total).padStart(2,'0');
    }

    function restart(){
      clearInterval(timer);
      if(!infoOpen) timer = setInterval(function(){ go(1); }, AUTOPLAY_MS);
    }

    function go(step){
      if(infoOpen) return;
      index = norm(index + step);
      position();
      restart();
    }

    function openInfo(){
      if(infoOpen) return;
      infoOpen = true;
      clearInterval(timer);
      scene.classList.add('is-info-open');
      document.body.classList.add('mtung-mobile-info-open');
      info.setAttribute('aria-hidden','false');
    }

    function closeInfo(){
      if(!infoOpen) return;
      infoOpen = false;
      scene.classList.remove('is-info-open');
      document.body.classList.remove('mtung-mobile-info-open');
      info.setAttribute('aria-hidden','true');
      restart();
    }

    trigger.addEventListener('click', openInfo);
    close.addEventListener('click', closeInfo);

    carousel.addEventListener('pointerdown', function(e){
      if(infoOpen) return;
      if(e.pointerType === 'mouse' && e.button !== 0) return;
      downX = e.clientX;
      downY = e.clientY;
      moved = false;
      if(carousel.setPointerCapture) carousel.setPointerCapture(e.pointerId);
    });

    carousel.addEventListener('pointermove', function(e){
      if(infoOpen) return;
      if(Math.abs(e.clientX-downX) > 8 || Math.abs(e.clientY-downY) > 8) moved = true;
    });

    carousel.addEventListener('pointerup', function(e){
      if(infoOpen) return;
      var dx = e.clientX - downX;
      var dy = e.clientY - downY;

      if(Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx) * 1.15 && dy < 0){
        openInfo();
        e.preventDefault();
        return;
      }

      if(Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.15){
        go(dx < 0 ? 1 : -1);
        e.preventDefault();
        return;
      }
      restart();
    });

    carousel.addEventListener('pointercancel', restart);

    carousel.addEventListener('click', function(e){
      if(moved){
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    }, true);

    cards.forEach(function(c){
      c.addEventListener('click', function(e){
        if(moved) return;
        var i = Number(c.getAttribute('data-index'));
        var d = i - index;
        if(d > total/2) d -= total;
        if(d < -total/2) d += total;
        if(d !== 0){
          e.preventDefault();
          go(d > 0 ? 1 : -1);
        }
      });
    });

    position();
    restart();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.addEventListener('resize', function(){
    if(isMobile() && !document.querySelector('.mtung-mobile-carousel')) init();
  });
})();
