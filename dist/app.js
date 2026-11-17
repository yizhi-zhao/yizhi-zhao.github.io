(() => {
  'use strict';

  const languageButton = document.querySelector('.language-toggle');
  const nav = document.querySelector('#main-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const scene = document.querySelector('.scene-svg');
  const themeDescription = document.querySelector('.diagram-description');
  const citationToggle = document.querySelector('#citation-toggle');
  const citationPanel = document.querySelector('#citation-panel');
  const copyStatus = document.querySelector('#copy-status');
  let language = 'en';
  let theme = 'planning';

  const descriptions = {
    planning: {
      en: 'Learning to turn observations into driving decisions.',
      zh: '将环境观测转化为驾驶决策。'
    },
    world: {
      en: 'Learning representations that anticipate how a scene may evolve.',
      zh: '学习环境表征，预测场景将如何演变。'
    },
    safety: {
      en: 'Understanding risk when observations are uncertain.',
      zh: '理解观测存在不确定性时的驾驶风险。'
    }
  };

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
    document.querySelector('.diagram-tabs').setAttribute('aria-label', language === 'en' ? 'Explore research themes' : '探索研究主题');
    document.querySelector('#scene-title').textContent = language === 'en' ? 'Autonomous driving research' : '自动驾驶研究';
    document.querySelector('.profile-photo').alt = language === 'en' ? 'Portrait of Yizhi Zhao' : 'Yizhi Zhao 的个人照片';
    document.querySelector('#scene-desc').textContent = language === 'en'
      ? 'A conceptual driving scene showing a vehicle, alternative trajectories, and predicted scene representations. This illustration does not display experimental data.'
      : '自动驾驶概念示意图，展示车辆、候选轨迹与场景预测，不表示实验数据。';
    themeDescription.textContent = descriptions[theme][language];
    copyStatus.textContent = '';
    citationToggle.textContent = citationPanel.hidden
      ? (language === 'en' ? 'View citation ↗' : '查看引用 ↗')
      : (language === 'en' ? 'Hide citation ↑' : '收起引用 ↑');
    document.title = language === 'en'
      ? 'Yizhi Zhao — Autonomous Driving & Physical AI'
      : 'Yizhi Zhao — 自动驾驶与物理智能';
    try { localStorage.setItem('yizhi-portfolio-language', language); } catch { /* Browsing with storage disabled is supported. */ }
  }

  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
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

  document.querySelectorAll('[data-theme]').forEach(button => {
    button.addEventListener('click', () => {
      theme = button.dataset.theme;
      scene.dataset.mode = theme;
      document.querySelectorAll('[data-theme]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      themeDescription.textContent = descriptions[theme][language];
    });
  });

  citationToggle.addEventListener('click', () => {
    citationPanel.hidden = !citationPanel.hidden;
    citationToggle.setAttribute('aria-expanded', String(!citationPanel.hidden));
    citationToggle.textContent = citationPanel.hidden
      ? (language === 'en' ? 'View citation ↗' : '查看引用 ↗')
      : (language === 'en' ? 'Hide citation ↑' : '收起引用 ↑');
  });

  document.querySelector('#copy-citation').addEventListener('click', async () => {
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

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        nav.querySelectorAll('a').forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('#research, #publications, #about').forEach(section => observer.observe(section));
  }

  document.querySelector('#year').textContent = String(new Date().getFullYear());
  let savedLanguage = 'en';
  try { savedLanguage = localStorage.getItem('yizhi-portfolio-language') || 'en'; } catch { /* Use English when storage is unavailable. */ }
  setLanguage(savedLanguage);
})();
