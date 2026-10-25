/* ============================================================
   马嘉祺 · 生日纪念页 — 交互逻辑
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------------------------------------------------------
     数据：语录
  --------------------------------------------------------- */
  const QUOTES = [
    { t: '发光不是太阳的权利，你也可以。',                        f: '马嘉祺' },
    { t: '值得或不值得，行至终点之前，没有人可以下定论。',          f: '马嘉祺' },
    { t: '不要抗拒改变，这个世界上唯一不变的事情，就是所有的东西都在变化。', f: '马嘉祺' },
    { t: '努力没用，要刻苦。',                                     f: '《星期五练习生》' },
    { t: '喜欢的东西哪有那么容易忘记。',                           f: '《念念》向横' },
    { t: '人生只有一次，自己终归是为了自己活着，别人还替你活不成？',   f: '《念念》向横' },
    { t: '想让别人喜欢你，你得先喜欢你自己；想让别人接受你，你得先接受你自己。', f: '《念念》向横' },
    { t: '喜欢日落，不是很亮，不是特别亮，所以就可以直视它。不管今天发生了什么，反正随着日落都过去了。', f: '马嘉祺' },
    { t: '其实勇敢就是在那些你自己觉得很难受的事情里，但即便再难受、再不愿意，你都要想着法子去整。', f: '马嘉祺' },
    { t: '因为有想要追逐的光，所以即使是迷茫痛苦的时刻也是幸福的。',   f: '马嘉祺' },
    { t: '既然逃不掉的话，不如主动出击，然后消减掉一切让你后悔的可能性。', f: '马嘉祺' },
    { t: '只要心中有想要追逐的光，即使是迷茫痛苦的时刻，也是幸福的。', f: '马嘉祺' },
    { t: '希望我们的未来，总有星火。',                             f: '马嘉祺' },
    { t: '少年赤诚，少年无畏，少年遥望，少年承担。',                f: '马嘉祺' },
    { t: '我其实觉得，不管是现在还是未来，最大的对手都是自己。',    f: '马嘉祺' },
    { t: '哪怕落下去了，也是在发着光的，不是吗？',                  f: '马嘉祺' },
    { t: '人朝着理想奋斗的过程，很像追光者。',                       f: '马嘉祺' },
    { t: '无论现在还是未来，都不要对自己妥协。',                     f: '马嘉祺' }
  ];

  /* ---------------------------------------------------------
     数据：他的歌
  --------------------------------------------------------- */
  const SONGS = [
    { name: '唯我论者的独白', en: 'The Sick Rose', album: '《心室》先行曲', year: '2026',
      lyric: '花朵会主动调整到最美的角度盛开。我已经感觉到了，它轻轻地，试探地拉扯我的衣角。',
      link: 'https://y.qq.com/n/ryqq_v2/songDetail/001pfooo4GOPDm' },
    { name: '如是春', en: 'Cicada', album: '《心室》情绪转折点', year: '2026',
      lyric: '祈祷是一种和天地的对话，用虔诚换一句生活的回音。',
      link: 'https://y.qq.com/n/ryqq_v2/songDetail/0037OjL44KAvAw' },
    { name: '冰箱没有鸡蛋', en: 'TBC', album: '《心室》主打曲', year: '2026',
      lyric: '但是，大事化小蛋糕吧。',
      link: 'https://y.qq.com/n/ryqq_v2/songDetail/003rucaJ1vkeYx' },
    { name: '潮汐锁定', en: 'Lunatic', album: '《心室》情绪切片', year: '2026',
      lyric: '等到下一次潮水回来，我会带着同一轮月亮的影子，对着没有你的舞台，一遍遍谢幕。',
      link: 'https://y.qq.com/n/ryqq_v2/songDetail/000OV6dD44VhCe' },
    { name: '穿帮', en: 'Feel Off', album: '《心室》情绪切片', year: '2026',
      lyric: '霓虹与笑声搭起一座纸糊的舞台，但幕布已开，人生谨记：show must go on.',
      link: 'https://y.qq.com/n/ryqq_v2/songDetail/004V93ZW0Y6jZF' },
    { name: '黑与红', en: 'Mates', album: '《心室》情绪切片', year: '2026',
      lyric: '致亲密的对手：你是我磨刀石上的裂痕。',
      link: 'https://y.qq.com/n/ryqq_v2/songDetail/002N0Q1x3b7Olz' },
    { name: '一千一万朵', en: '', album: '《月鳞绮纪》花誓曲', year: '2026',
      lyric: '你一定等着我，我捧着全世界来见你。',
      link: 'https://y.qq.com/n/ryqq_v2/singer/004aejZR04LPCH' },
    { name: '节气颂', en: '', album: '人民日报二搭 · 登封观星台', year: '2026',
      lyric: '一首歌里走完二十四节气。',
      link: 'https://y.qq.com/n/ryqq_v2/singer/004aejZR04LPCH' },
    { name: '摆脱地心引力', en: '', album: '《加冠》专辑', year: '2026',
      lyric: '不是为了逃离，是想带着所有陪伴我们的人，一起看看更高处的风景。',
      link: 'https://y.qq.com/n/ryqq_v2/singer/004aejZR04LPCH' },
    { name: '唯我论者的独白 · 加冠礼版', en: '', album: '「加冠礼」演唱会 上海站', year: '2026',
      lyric: '布满荆棘红玫瑰的舞台上，他用声线把歌里的拉扯唱活了。',
      link: 'https://y.qq.com/n/ryqq_v2/singer/004aejZR04LPCH' },
    { name: '果实', en: '', album: '「加冠礼」演唱会 上海站', year: '2026',
      lyric: '所有向下扎根的努力，都会在某个时刻结出果实。',
      link: 'https://y.qq.com/n/ryqq_v2/singer/004aejZR04LPCH' },
    { name: '冬日来信', en: '', album: '「加冠礼」巡演', year: '2026',
      lyric: '七个人在练习室里互相系鞋带的那个夜晚，谁也没想到会有今天。',
      link: 'https://y.qq.com/n/ryqq_v2/singer/004aejZR04LPCH' }
  ];

  /* ---------------------------------------------------------
     数据：加冠礼舞台片段
  --------------------------------------------------------- */
  const GUAN_FILMS = [
    { id: 'guan_solo', title: '《唯我论者的独白》solo',
      desc: '「加冠礼」演唱会 · 上海收官场 DAY2',
      poster: 'assets/video/posters/guan_solo.jpg', file: 'assets/video/guan_solo.mp4', dur: 75, w: 640, h: 360 },
    { id: 'guan_slow', title: '《慢冷》纯享',
      desc: '「叁重楼」演唱会 · 重庆站',
      poster: 'assets/video/posters/guan_slow.jpg', file: 'assets/video/guan_slow.mp4', dur: 75, w: 640, h: 360 },
    { id: 'guan_song', title: '《曾经我也想过一了百了》',
      desc: '用歌声接住坠落，拥抱世界',
      poster: 'assets/video/posters/guan_song.jpg', file: 'assets/video/guan_song.mp4', dur: 75, w: 640, h: 360 }
  ];

  /* ---------------------------------------------------------
     数据：已知行程 / 心愿（便签板静态部分）
  --------------------------------------------------------- */
  const PLAN_NOTES = [
    { src: '专辑', text: '全新个人 EP《心室》已于 <strong>2026.9.7</strong> 发行 —— 情绪叙事向，七段碎片拼凑出一个完整的自我。' },
    { src: '演唱会', text: '<strong>「加冠礼」演唱会 · 2026.5.17</strong>，加冠之年，一场只属于他的舞台。' },
    { src: '影视', text: '主演的首部电视剧集《我们生活在南京》，饰演男主白杨，优酷预约中。' },
    { src: 'OST', text: '为剧集《月鳞绮纪》献唱花誓曲《一千一万朵》，2026.4.9 上线，全平台出圈。' },
    { src: '单曲', text: '新歌《唯我论者的独白》《摆脱地心引力》陆续释出，继续往外走。' },
    { src: '综艺', text: '《这是我的西游》S2、《奔跑吧14》、《你好星期六》等节目里，都有他的身影。' },
    { src: '舞台', text: '《活力视听·万象同屏》唱演秀《一眼千年》、卫视春晚《登顶》，舞台一直在。' },
    { src: '音乐', text: '《节气颂》三平台累计上榜 17 个，斩获 11 个榜单 TOP1，被人民日报二搭唱响。' }
  ];

  const WISH_NOTES = [
    { src: '写给你 · 01', text: '生日快乐，小羊同学。愿你今年比去年更松弛一点，更像你自己一点。' },
    { src: '写给你 · 02', text: '愿你想追的那束光，一直都在。也愿你始终觉得自己值得被喜欢。' },
    { src: '写给你 · 03', text: '愿你累的时候有地方歇，迷茫的时候有人说话，想任性的时候不必找理由。' },
    { src: '写给你 · 04', text: '愿你以后每次打开这首歌，都能想起今天有人很认真地对你说过生日快乐。' },
    { src: '写给你 · 05', text: '愿你保留住那份认真 —— 对喜欢的事，对难过的事，对喜欢的人。' },
    { src: '写给你 · 06', text: '愿下一次他站上更大的舞台时，你还在那片灯海里，一如既往地喊他的名字。' }
  ];

  /* ---------------------------------------------------------
     工具
  --------------------------------------------------------- */
  /* ---------------------------------------------------------
     数据来源：优先使用内联数据（file:// 双击打开也能用），
     fetch 仅作为兜底（例如部署到服务器时的动态更新）
  --------------------------------------------------------- */
  function loadJSON(url, inlineKey) {
    if (window.SITE_DATA && inlineKey && window.SITE_DATA[inlineKey]) {
      return Promise.resolve(window.SITE_DATA[inlineKey]);
    }
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    });
  }

  function fmtTime(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var m = Math.floor(s / 60), ss = Math.floor(s % 60);
    return m + ':' + (ss < 10 ? '0' : '') + ss;
  }

  var toastEl = $('#toast'), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('on'); }, 2600);
  }

  /* 音量渐变：避免突然切换刺耳 */
  function fadeVolume(target, ms, done) {
    var start = audio.volume, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / ms);
      audio.volume = start + (target - start) * p;
      if (p < 1) requestAnimationFrame(step);
      else if (done) done();
    }
    requestAnimationFrame(step);
  }

  /* ---------------------------------------------------------
     导航滚动态
  --------------------------------------------------------- */
  var nav = $('#nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     进场遮罩 + 音乐启动
  --------------------------------------------------------- */
  var gate = $('#gate');
  var audio = $('#bgm');
  var MUSIC = [];
  var musicIdx = 0;
  var userVol = 0.26;
  var started = false;

  function setEq(on) {
    $('.eq').classList.toggle('on', on);
  }

  function startExperience() {
    if (started) return;
    started = true;
    gate.classList.add('hide');
    setTimeout(function () { gate.style.display = 'none'; }, 950);
    $('#player').classList.add('show');
    loadPlaylist();
    // 浏览器要求用户手势后才能播放
    var p = audio.play();
    if (p && p.catch) p.catch(function () { setEq(false); });
  }
  gate.addEventListener('click', startExperience);
  gate.addEventListener('touchstart', startExperience, { passive: true });

  /* ---------------------------------------------------------
     音乐：循环播放多首
  --------------------------------------------------------- */
  function loadPlaylist() {
    loadJSON('data/music.json','music').then(function (list) {
      if (!list || !list.length) return;
      // 合并用户自带的曲目
      scanCustomMusic(function (custom) {
        MUSIC = mergeMusic(list.slice(), custom);
        if (custom && custom.length) {
          toast('已载入 ' + custom.length + ' 首自定义曲目');
        }
        audio.volume = 0;
        audio.src = MUSIC[0].file;
        var p = audio.play();
        if (p && p.then) {
          p.then(function () {
            fadeVolume(userVol, 1800);
            setEq(true);
            updateTrackName();
          }).catch(function () { setEq(false); });
        }
      });
    }).catch(function () {
      toast('音乐列表加载失败');
    });
  }

  /* ---------------------------------------------------------
     自定义音乐：读取用户自带的曲目
     用户可把自己合法获取的音频放进 assets/music_sel/ 并运行 addmusic.py，
     网页会自动把它们加入背景音乐轮播
  --------------------------------------------------------- */
  function scanCustomMusic(cb) {
    // 服务端模式：读 manifest
    if (location.protocol !== 'file:') {
      fetch('data/music_custom.json').then(function (r) {
        return r.ok ? r.json() : [];
      }).then(function (list) {
        cb(list || []);
      }).catch(function () {
        cb((window.SITE_DATA && window.SITE_DATA.musicCustom) || []);
      });
    } else {
      // file:// 直接读内联数据，避免 fetch 报错
      cb((window.SITE_DATA && window.SITE_DATA.musicCustom) || []);
    }
  }

  function mergeMusic(base, custom) {
    if (!custom || !custom.length) return base;
    var seen = {};
    (base || []).forEach(function (m) { seen[m.file] = true; });
    custom.forEach(function (m) {
      if (!m.file || seen[m.file]) return;
      seen[m.file] = true;
      base.push({
        id: m.id || m.file,
        file: m.file,
        name: m.name || '自定义曲目',
        mood: m.mood || 'From You'
      });
    });
    return base;
  }

  function updateTrackName() {
    if (!MUSIC.length) return;
    var t = MUSIC[musicIdx % MUSIC.length];
    $('#pName').textContent = t.name + ' · ' + t.mood;
    $('#navTrack').textContent = t.name;
  }

  function playAt(idx) {
    if (!MUSIC.length) return;
    musicIdx = (idx + MUSIC.length) % MUSIC.length;
    var t = MUSIC[musicIdx];
    audio.src = t.file;
    audio.volume = 0;
    var p = audio.play();
    if (p && p.then) {
      p.then(function () { fadeVolume(userVol, 1200); updateTrackName(); })
       .catch(function () { toast('无法播放：' + t.name); });
    }
  }

  audio.addEventListener('ended', function () {
    playAt(musicIdx + 1);
  });

  audio.addEventListener('play',  function () { setEq(true);  $('#pIconPause').style.display = ''; $('#pIconPlay').style.display = 'none'; });
  audio.addEventListener('pause', function () { setEq(false); $('#pIconPause').style.display = 'none'; $('#pIconPlay').style.display = ''; });

  $('#pPlay').addEventListener('click', function () {
    if (audio.paused) { audio.play().catch(function () { toast('点击页面任意处可开启音乐'); }); }
    else { audio.pause(); }
  });

  var volEl = $('#pVol');
  volEl.addEventListener('input', function () {
    userVol = volEl.value / 100;
    audio.volume = userVol;
    $('#volOff').style.display = (userVol === 0) ? '' : 'none';
    $('#volOn').style.display  = (userVol === 0) ? 'none' : '';
  });
  $('#pMute').addEventListener('click', function () {
    if (audio.volume > 0) {
      audio.dataset.prev = audio.volume;
      fadeVolume(0, 350);
      volEl.value = 0;
    } else {
      var prev = parseFloat(audio.dataset.prev || 0.26);
      volEl.value = Math.round(prev * 100);
      fadeVolume(prev, 350);
    }
    $('#volOff').style.display = audio.volume === 0 ? '' : 'none';
    $('#volOn').style.display  = audio.volume === 0 ? 'none' : '';
  });

  // 顶栏工具：全局静音切换
  $('#musicToggle').addEventListener('click', function () {
    if (audio.paused) { audio.play().catch(function () {}); }
    else { audio.pause(); }
  });

  // 播放进度
  var pBar = $('#pBar');
  audio.addEventListener('timeupdate', function () {
    if (!audio.duration) return;
    pBar.style.width = (audio.currentTime / audio.duration * 100) + '%';
    $('#pTime').textContent = fmtTime(audio.currentTime) + ' / ' + fmtTime(audio.duration);
  });
  $('#pBarWrap').addEventListener('click', function (e) {
    if (!audio.duration) return;
    var r = this.getBoundingClientRect();
    audio.currentTime = (e.clientX - r.left) / r.width * audio.duration;
  });

  /* ---------------------------------------------------------
     语录轮播
  --------------------------------------------------------- */
  var qIdx = 0, qTimer = null;
  var qText = $('#qText'), qFrom = $('#qFrom'), qIdxEl = $('#qIdx');
  var qBar = $('#qBar'), qDots = $('#qDots'), qSide = $('#quoteSide');

  QUOTES.forEach(function (q, i) {
    var d = document.createElement('button');
    d.className = 'qdot';
    d.setAttribute('aria-label', '第 ' + (i + 1) + ' 句');
    d.addEventListener('click', function () { goQuote(i); restartQuoteTimer(); });
    qDots.appendChild(d);

    var s = document.createElement('button');
    s.className = 'qs-item';
    s.innerHTML = '<span class="qs-i">' + String(i + 1).padStart(2, '0') + '</span><span class="qs-t">' + q.t + '</span>';
    s.addEventListener('click', function () { goQuote(i); restartQuoteTimer(); });
    qSide.appendChild(s);
  });

  function goQuote(i, instant) {
    if (instant) {
      qIdx = (i + QUOTES.length) % QUOTES.length;
      var q0 = QUOTES[qIdx];
      qText.textContent = q0.t;
      qFrom.textContent = '— ' + q0.f;
      qIdxEl.textContent = String(qIdx + 1).padStart(2, '0') + ' / ' + String(QUOTES.length).padStart(2, '0');
      qText.classList.remove('fade');
    } else {
      qText.classList.add('fade');
      setTimeout(function () {
        qIdx = (i + QUOTES.length) % QUOTES.length;
        var q = QUOTES[qIdx];
        qText.textContent = q.t;
        qFrom.textContent = '— ' + q.f;
        qIdxEl.textContent = String(qIdx + 1).padStart(2, '0') + ' / ' + String(QUOTES.length).padStart(2, '0');
        qText.classList.remove('fade');
      }, 380);
    }

    $$('.qdot', qDots).forEach(function (d, k) { d.classList.toggle('on', k === qIdx); });
    $$('.qs-item', qSide).forEach(function (s, k) { s.classList.toggle('on', k === qIdx); });
    // 只滚动侧栏自身，避免 scrollIntoView 牵引整个页面
    var on = $$('.qs-item', qSide)[qIdx];
    if (on && qSide) {
      var top = on.offsetTop - qSide.clientHeight / 2 + on.clientHeight / 2;
      qSide.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }

  /* --------- 语录：滑动切换（鼠标拖拽 + 触摸滑动） --------- */
  var qCard = $('#quoteCard');
  var swipe = { active: false, startX: 0, startY: 0, dx: 0, locked: null };

  function swipeStart(x, y) {
    swipe.active = true; swipe.startX = x; swipe.startY = y; swipe.dx = 0; swipe.locked = null;
    qText.style.transition = 'none';
  }

  // 带方向动画的切换
  function goQuoteSwipe(i, dir) {
    var next = (i + QUOTES.length) % QUOTES.length;
    qText.classList.remove('fade');
    qText.classList.remove('slide-in');
    qText.style.setProperty('--slide-from', dir > 0 ? '28px' : '-28px');
    qText.classList.add('slide-in');
    qIdx = next;
    var q = QUOTES[qIdx];
    qText.textContent = q.t;
    qFrom.textContent = '— ' + q.f;
    qIdxEl.textContent = String(qIdx + 1).padStart(2, '0') + ' / ' + String(QUOTES.length).padStart(2, '0');
    $$('.qdot', qDots).forEach(function (d, k) { d.classList.toggle('on', k === qIdx); });
    $$('.qs-item', qSide).forEach(function (s, k) { s.classList.toggle('on', k === qIdx); });
    var on = $$('.qs-item', qSide)[qIdx];
    if (on && qSide) {
      var top = on.offsetTop - qSide.clientHeight / 2 + on.clientHeight / 2;
      qSide.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
    restartQuoteTimer();
  }

  if (qCard) {
    // 指针事件：统一处理鼠标与触摸
    qCard.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button, a')) return;
      swipeStart(e.clientX, e.clientY);
      if (qCard.setPointerCapture) { try { qCard.setPointerCapture(e.pointerId); } catch (err) {} }
    });
    qCard.addEventListener('pointermove', function (e) {
      if (!swipe.active) return;
      var dx = e.clientX - swipe.startX, dy = e.clientY - swipe.startY;
      if (swipe.locked === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
        swipe.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
      if (swipe.locked === 'x') {
        swipe.dx = dx;
        qText.style.transform = 'translateX(' + dx + 'px)';
        qText.style.opacity = String(Math.max(0.25, 1 - Math.abs(dx) / 320));
        if (e.cancelable) e.preventDefault();
      }
    });
    var release = function (e) {
      if (!swipe.active) return;
      var dx = swipe.dx;
      qText.style.transition = '';
      qText.style.opacity = '';
      qText.style.transform = '';
      swipe.active = false;
      if (swipe.locked === 'x' && Math.abs(dx) > 55) {
        goQuoteSwipe(qIdx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      }
      swipe.locked = null; swipe.dx = 0;
    };
    qCard.addEventListener('pointerup', release);
    qCard.addEventListener('pointercancel', release);
    qCard.addEventListener('pointerleave', function () { if (swipe.active) release(); });
  }

  // 首次进入时显示一次滑动提示
  var swipeHint = $('#qSwipeHint');
  if (swipeHint) {
    setTimeout(function () { swipeHint.classList.add('on'); }, 1400);
    setTimeout(function () { swipeHint.classList.remove('on'); }, 6400);
  }

  function restartQuoteTimer() {
    clearInterval(qTimer);
    var started2 = Date.now();
    qTimer = setInterval(function () {
      var el = Date.now() - started2;
      var dur = 9000;
      qBar.style.width = Math.min(100, el / dur * 100) + '%';
      if (el >= dur) { goQuote(qIdx + 1); started2 = Date.now(); }
    }, 60);
  }

  $('#qNext').addEventListener('click', function () { goQuote(qIdx + 1); restartQuoteTimer(); });
  $('#qPrev').addEventListener('click', function () { goQuote(qIdx - 1); restartQuoteTimer(); });
  goQuote(0, true); restartQuoteTimer();

  /* ---------------------------------------------------------
     HERO 背景图（从图库随机取一张）
  --------------------------------------------------------- */
  var gallery = [];
  loadJSON('data/gallery.json','gallery').then(function (list) {
    gallery = list || [];
    if (gallery.length) {
      var pick = gallery[Math.floor(Math.random() * gallery.length)];
      var bg = $('#heroBg');
      bg.style.backgroundImage = 'url("' + pick.file + '")';
      setTimeout(function () { bg.classList.add('ready'); }, 120);

      // 写真滚动条：正反两行
      var a = $('#marqueeA'), b = $('#marqueeB');
      var half = Math.ceil(gallery.length / 2);
      var rowA = gallery.slice(0, half), rowB = gallery.slice(half);
      function buildRow(el, arr) {
        var html = '';
        arr.concat(arr).forEach(function (g) {
          html += '<figure class="mq-item"><img loading="lazy" src="' + g.file + '" alt="马嘉祺"></figure>';
        });
        el.innerHTML = html;
      }
      buildRow(a, rowA);
      buildRow(b, rowB);
      $('#galCount').textContent = gallery.length;
    }
  }).catch(function () {
    toast('图库加载失败');
  });

  /* ---------------------------------------------------------
     写真滚动条：鼠标 / 触摸拖拽
     做法：拖拽时接管 transform，松开后按拖拽速度惯性续滑一小段
  --------------------------------------------------------- */
  (function initMarqueeDrag() {
    var wrap = $('#marqueeWrap');
    if (!wrap) return;
    var rows = [$('#marqueeA'), $('#marqueeB')].filter(Boolean);
    if (!rows.length) return;

    var st = {
      dragging: false, startX: 0, startY: 0, lastX: 0, lastT: 0,
      vx: 0, moved: false, lock: null
    };

    // 每行的位移状态
    var rowState = {};

    function rowOffset(el) {
      var t = getComputedStyle(el).transform;
      if (!t || t === 'none') return 0;
      try { return new DOMMatrixReadOnly(t).m41; } catch (e) { return 0; }
    }
    function rowWidth(el) {
      return el.scrollWidth / 2;   // 一份内容的宽度
    }

    rows.forEach(function (el) {
      rowState[el.id] = { x: rowOffset(el), w: rowWidth(el), t: null };
    });

    wrap.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      st.dragging = true; st.moved = false; st.lock = null;
      st.startX = e.clientX; st.startY = e.clientY;
      st.lastX = e.clientX; st.lastT = Date.now(); st.vx = 0;
      rows.forEach(function (el) {
        // 冻结当前动画位置，切到手动模式
        el.style.animation = 'none';
        var s = rowState[el.id];
        s.x = rowOffset(el);
        s.w = rowWidth(el);
        s.t = null;
      });
      wrap.classList.add('dragging');
    });

    wrap.addEventListener('pointermove', function (e) {
      if (!st.dragging) return;
      var dx = e.clientX - st.startX, dy = e.clientY - st.startY;
      if (st.lock === null) {
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
        st.lock = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (st.lock === 'x' && wrap.setPointerCapture) {
          try { wrap.setPointerCapture(e.pointerId); } catch (err) {}
        }
      }
      if (st.lock !== 'x') return;
      st.moved = true;
      if (e.cancelable) e.preventDefault();
      var now = Date.now(), dt = now - st.lastT;
      if (dt > 0) st.vx = (e.clientX - st.lastX) / dt * 16;   // px/frame
      st.lastX = e.clientX; st.lastT = now;

      rows.forEach(function (el) {
        var s = rowState[el.id];
        var x = s.x + dx;
        // 无缝循环：把位移折回 [-w, 0)
        x = ((x % s.w) + s.w) % s.w - s.w;
        s.x = x;
        el.style.transform = 'translateX(' + x + 'px)';
      });
    });

    function endDrag() {
      if (!st.dragging) return;
      st.dragging = false;
      wrap.classList.remove('dragging');

      var v = st.vx;
      rows.forEach(function (el) {
        var s = rowState[el.id];
        var x = s.x, vx = v;
        function glide() {
          vx *= 0.94;
          x += vx;
          x = ((x % s.w) + s.w) % s.w - s.w;
          s.x = x;
          el.style.transform = 'translateX(' + x + 'px)';
          if (Math.abs(vx) > 0.25) requestAnimationFrame(glide);
          else {
            // 交还给 CSS 动画：从当前偏移平滑接回
            el.style.transition = 'transform .5s ease';
            el.style.transform = '';
            setTimeout(function () {
              el.style.transition = '';
              el.style.animation = '';
              rowState[el.id].x = rowOffset(el);
            }, 520);
          }
        }
        if (Math.abs(v) > 0.6) glide();
        else {
          el.style.transition = 'transform .5s ease';
          el.style.transform = '';
          setTimeout(function () {
            el.style.transition = '';
            el.style.animation = '';
            rowState[el.id].x = rowOffset(el);
          }, 520);
        }
      });
      st.moved = false; st.lock = null;
    }

    wrap.addEventListener('pointerup', endDrag);
    wrap.addEventListener('pointercancel', endDrag);
    wrap.addEventListener('pointerleave', endDrag);
    // 阻止图片默认拖拽
    wrap.addEventListener('dragstart', function (e) { e.preventDefault(); });
  })();

  /* ---------------------------------------------------------
     加冠礼屏
  --------------------------------------------------------- */
  (function initGuan() {
    var bg = $('#guanBg');
    var film = $('#guanFilm');
    if (!film) return;

    var html = '';
    GUAN_FILMS.forEach(function (v) {
      html +=
        '<article class="gf-item" data-src="' + v.file + '" data-poster="' + v.poster +
        '" data-title="' + v.title + '" data-desc="' + v.desc + '">' +
          '<div class="gf-media">' +
            '<img loading="lazy" src="' + v.poster + '" alt="' + v.title + '">' +
            '<div class="gf-veil"></div>' +
            '<div class="gf-play"><span><svg width="17" height="19" viewBox="0 0 18 20"><path d="M17 8.2v3.6L3 19 3 1z"/></svg></span></div>' +
            '<div class="gf-dur">' + fmtTime(v.dur) + '</div>' +
          '</div>' +
          '<div class="gf-info">' +
            '<div class="gf-title">' + v.title + '</div>' +
            '<div class="gf-desc">' + v.desc + '</div>' +
          '</div>' +
        '</article>';
    });
    film.innerHTML = html;

    film.addEventListener('click', function (e) {
      var card = e.target.closest('.gf-item');
      if (!card) return;
      openLightbox({
        file: card.dataset.src, poster: card.dataset.poster,
        title: card.dataset.title, desc: card.dataset.desc, orient: 'landscape'
      });
    });

    // 背景图：独立取一张，不依赖 gallery 是否已就绪
    var gbg = $('#guanBg');
    if (gbg) {
      loadJSON('data/gallery.json','gallery').then(function (list) {
        if (!list || !list.length) return;
        var pick = list[Math.floor(Math.random() * list.length)];
        gbg.style.backgroundImage = 'url("' + pick.file + '")';
      }).catch(function () {});
    }
    var gio = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { gbg.classList.add('ready'); gio.disconnect(); }
      });
    }, { threshold: 0.12 });
    if (gbg) gio.observe(gbg);
  })();

  /* ---------------------------------------------------------
     他的歌 · 歌单墙
  --------------------------------------------------------- */
  (function initSongs() {
    var wall = $('#songWall');
    if (!wall) return;
    wall.innerHTML = SONGS.map(function (s, i) {
      return '<a class="song" href="' + s.link + '" target="_blank" rel="noopener">' +
        '<div class="song-top">' +
          '<span class="song-idx">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span class="song-year">' + s.year + '</span>' +
        '</div>' +
        '<div class="song-name">' + s.name +
          (s.en ? '<span class="song-en">' + s.en + '</span>' : '') +
        '</div>' +
        '<div class="song-album">' + s.album + '</div>' +
        '<div class="song-lyric">' + s.lyric + '</div>' +
        '<div class="song-foot">' +
          '<span class="song-link">去官方平台听 <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
        '</div>' +
      '</a>';
    }).join('');
  })();

  /* ---------------------------------------------------------
     数字滚动
  --------------------------------------------------------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var t0 = null, dur = 1400;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var heroSeen = false;
  var heroObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && !heroSeen) {
        heroSeen = true;
        $$('[data-count]').forEach(countUp);
      }
    });
  }, { threshold: 0.3 });
  var heroSec = $('.hero');
  if (heroSec) heroObs.observe(heroSec);

  /* ---------------------------------------------------------
     视频片段
  --------------------------------------------------------- */
  var lb = $('#lightbox'), lbVideo = $('#lbVideo');
  loadJSON('data/videos.json','videos').then(function (vids) {
    var grid = $('#clipGrid');
    (vids || []).forEach(function (v) {
      var portrait = v.orient === 'portrait';
      var card = document.createElement('article');
      card.className = 'clip' + (portrait ? ' clip-p' : '');
      card.innerHTML =
        '<div class="clip-poster">' +
          '<img loading="lazy" src="' + v.poster + '" alt="' + v.title + '">' +
          '<div class="clip-veil"></div>' +
          '<div class="clip-play"><span><svg width="18" height="20" viewBox="0 0 18 20"><path d="M17 8.2v3.6L3 19 3 1z"/></svg></span></div>' +
          '<div class="clip-dur">' + fmtTime(v.dur) + '</div>' +
          (portrait ? '<div class="clip-badge">竖屏</div>' : '') +
        '</div>' +
        '<div class="clip-info">' +
          '<div class="clip-title">' + v.title + '</div>' +
          '<div class="clip-desc">' + v.desc + '</div>' +
          '<div class="clip-cta">全屏观看 <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div>' +
        '</div>';
      card.addEventListener('click', function () { openLightbox(v); });
      grid.appendChild(card);
    });
  }).catch(function () { toast('视频列表加载失败'); });

  function openLightbox(v) {
    lbVideo.src = v.file;
    lbVideo.poster = v.poster;
    lbVideo.classList.toggle('portrait', v.orient === 'portrait');
    $('#lbTitle').textContent = v.title;
    $('#lbDesc').textContent = v.desc;
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
    var p = lbVideo.play();
    if (p && p.catch) p.catch(function () {});
    // 原生全屏
    if (lbVideo.requestFullscreen) {
      setTimeout(function () {
        var r = lbVideo.requestFullscreen && lbVideo.requestFullscreen();
        if (r && r.catch) r.catch(function () {});
      }, 260);
    }
  }
  function closeLightbox() {
    lb.classList.remove('on');
    document.body.style.overflow = '';
    try { lbVideo.pause(); } catch (e) {}
    lbVideo.removeAttribute('src');
    lbVideo.classList.remove('portrait');
    lbVideo.load();
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
  }
  $('#lbClose').addEventListener('click', closeLightbox);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb.classList.contains('on')) closeLightbox();
  });

  /* ---------------------------------------------------------
     动向便签：真实动态快照 + 已知行程 + 写给你的便签
     动态数据来自 data/live.js（构建时抓取），
     之所以不用运行时接口：第三方热榜受 CORS / 限流影响，浏览器端直连不稳定。
  --------------------------------------------------------- */
  var LIVE_SNAPSHOT = window.LIVE_DATA || [];

  function noteEl(cls, src, html, foot) {
    var d = document.createElement('article');
    d.className = 'note ' + cls;
    d.style.setProperty('--rot', rand(-2.4, 2.4).toFixed(2) + 'deg');
    d.innerHTML =
      '<div class="note-src">' + src + '</div>' +
      '<div class="note-text">' + html + '</div>' +
      (foot ? '<div class="note-foot"><span>' + foot + '</span></div>' : '');
    return d;
  }

  function renderNotes() {
    var board = $('#notesBoard');
    board.innerHTML = '';

    // 真实动态
    LIVE_SNAPSHOT.forEach(function (it) {
      board.appendChild(noteEl(
        'note-live', it.tag || '动态',
        '<a href="' + it.url + '" target="_blank" rel="noopener">' + it.title + '</a>',
        it.meta
      ));
    });

    // 已知行程
    PLAN_NOTES.forEach(function (n) {
      board.appendChild(noteEl('note-plan', n.src, n.text, '已公开信息'));
    });

    // 写给小羊
    WISH_NOTES.forEach(function (n) {
      board.appendChild(noteEl('note-wish', n.src, n.text, '写给你的'));
    });
  }

  function initNews() {
    renderNotes();
    var now = new Date();
    $('#newsStatusText').textContent = '最新动态 · 已收录 ' + LIVE_SNAPSHOT.length + ' 条';
    $('.news-pulse').classList.remove('off');
    $('#newsTime').textContent = '更新于 ' + now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
  }

  initNews();

  /* ---------------------------------------------------------
     祝福正文：以马嘉祺的口吻，写给小羊同学
  --------------------------------------------------------- */
  var LETTER = [
    '小羊同学：',
    '生日快乐。',
    '今天这封信，是借着别人的手送到你手上的，但每一个字，都是我想说的。',
    '我知道你一直在看我。从练习室到舞台，从《心室》的七个房间到加冠礼的万人海边。你收藏的那些瞬间，其实也是我一步一步走过来的证据 —— 所以你每一次的喜欢，都不是凭空落下来的。',
    '你说过，喜欢日落，不是很亮，不是特别亮，所以就可以直视它。我想把这句话送回给你，也送给今天的你：不必很亮，不必被所有人看见，你只需要做自己的那束光，就已经很好了。',
    '你身上有一种很难得的认真 —— 对喜欢的事认真，对难过的事认真，对喜欢的人也认真。这份认真很难得，希望你永远别丢掉它。',
    '所以今天这些话，送给你：',
    '愿你想去的地方都有人同行，想留的当下都有人记录。',
    '愿你被很多人喜欢，也一直有底气喜欢自己。',
    '愿你累了的时候有地方歇，迷茫的时候有人说话，想任性的时候不必找理由。',
    '也愿下一次他站上更大的舞台的时候，你还在那片灯海里，一如既往地喊他的名字。',
    '<strong>生日快乐，小羊同学。</strong>',
    '<strong>谢谢你，这么喜欢我们。</strong>'
  ];
  $('#wishLetter').innerHTML = LETTER.map(function (p) { return '<p>' + p + '</p>'; }).join('');

  $('#wishMeta').textContent = '2026 · 10 月 30 日 · 为小羊同学生日而作';
})();
