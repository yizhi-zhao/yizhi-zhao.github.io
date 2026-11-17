(() => {
  'use strict';

  const languageButton = document.querySelector('.language-toggle');
  const nav = document.querySelector('#main-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const citationToggle = document.querySelector('#citation-toggle');
  const citationPanel = document.querySelector('#citation-panel');
  const copyStatus = document.querySelector('#copy-status');
  const portraitButton = document.querySelector('.portrait-toggle');
  const portrait = document.querySelector('.portrait');
  let showFormalPortrait = false;
  let language = 'en';

  function updatePortrait() {
    if (!portraitButton) return;
    portrait.classList.toggle('is-flipped', showFormalPortrait);
    portraitButton.setAttribute('aria-pressed', String(showFormalPortrait));
    portraitButton.setAttribute('aria-label', showFormalPortrait
      ? (language === 'en' ? 'Show outdoor photo' : '查看户外照片')
      : (language === 'en' ? 'Show formal portrait' : '查看正式照片'));
    portrait.querySelector('.portrait-face--outdoors').setAttribute('aria-hidden', String(showFormalPortrait));
    portrait.querySelector('.portrait-face--formal').setAttribute('aria-hidden', String(!showFormalPortrait));
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-en][data-zh]').forEach(element => {
      element.textContent = element.dataset[language];
    });
    languageButton.textContent = language === 'en' ? '中文' : 'EN';
    languageButton.lang = language === 'en' ? 'zh-CN' : 'en';
    languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Chinese' : '切换为英文');
    nav.setAttribute('aria-label', language === 'en' ? 'Main navigation' : '主导航');
    document.querySelector('.campus-cover')?.setAttribute('aria-label', language === 'en' ? 'EPFL campus photographed by Yizhi on his first day' : 'Yizhi 来到 EPFL 校园第一天拍摄的校园照片');
    document.querySelectorAll('img[data-alt-en][data-alt-zh]').forEach(image => { image.alt = image.dataset[language === 'en' ? 'altEn' : 'altZh']; });
    document.querySelector('.profile-links')?.setAttribute('aria-label', language === 'en' ? 'Contact and profiles' : '联系方式与个人资料');
    updatePortrait();
    if (copyStatus) copyStatus.textContent = '';
    if (citationToggle && citationPanel) citationToggle.textContent = citationPanel.hidden
      ? (language === 'en' ? 'Citation' : '引用')
      : (language === 'en' ? 'Hide citation' : '收起引用');
    const titles = { home: ['Yizhi Zhao | EPFL', 'Yizhi Zhao | 个人主页'], research: ['Research | Yizhi Zhao', '研究项目 | Yizhi Zhao'], publications: ['Publications | Yizhi Zhao', '论文发表 | Yizhi Zhao'], background: ['Background | Yizhi Zhao', '个人经历 | Yizhi Zhao'] };
    document.title = (titles[document.body.dataset.page] || titles.home)[language === 'en' ? 0 : 1];
    try { localStorage.setItem('yizhi-portfolio-language', language); } catch { /* Browsing with storage disabled is supported. */ }
  }

  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  portraitButton?.addEventListener('click', () => {
    showFormalPortrait = !showFormalPortrait;
    updatePortrait();
  });
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });

  function closeMenu() {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 741px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  citationToggle?.addEventListener('click', () => {
    citationPanel.hidden = !citationPanel.hidden;
    citationToggle.setAttribute('aria-expanded', String(!citationPanel.hidden));
    citationToggle.textContent = citationPanel.hidden
      ? (language === 'en' ? 'Citation' : '引用')
      : (language === 'en' ? 'Hide citation' : '收起引用');
  });

  document.querySelector('#copy-citation')?.addEventListener('click', async () => {
    const citationText = document.querySelector('#citation-text');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(citationText.textContent);
      copyStatus.textContent = language === 'en' ? 'Citation copied.' : '引用已复制。';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(citationText);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = language === 'en'
        ? 'Citation selected. Press Ctrl+C (or ⌘C) to copy.'
        : '已选中引用，请按 Ctrl+C（或 ⌘C）复制。';
    }
  });

  let scrollFrame;
  function updateProgress() {
    scrollFrame = undefined;
    const available = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--scroll-progress', String(available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0));
  }
  window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  document.querySelector('#year').textContent = String(new Date().getFullYear());
  let savedLanguage = 'en';
  try { savedLanguage = localStorage.getItem('yizhi-portfolio-language') || 'en'; } catch { /* Use English when storage is unavailable. */ }
  setLanguage(savedLanguage);
})();
