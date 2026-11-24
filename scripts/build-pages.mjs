import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://yizhi-zhao.github.io/';
const routes = [
  { key: 'home', file: 'index.html', en: 'Home', zh: '首页', title: 'Yizhi Zhao' },
  { key: 'research', file: 'research.html', en: 'Research', zh: '研究', title: 'Research', headingZh: '研究项目', art: 'assets/research-driving.svg' },
  { key: 'publications', file: 'publications.html', en: 'Publications', zh: '论文', title: 'Publications', headingZh: '论文发表', art: 'assets/publication-papers.svg' },
  { key: 'background', file: 'background.html', en: 'Background', zh: '经历', title: 'Background', headingZh: '个人背景', art: 'assets/background-timeline.svg', cardId: 'about', cardZh: '个人经历' },
  { key: 'course-projects', file: 'course-projects.html', en: 'Course Projects', zh: '课程项目', title: 'Course Projects', art: 'assets/coursework-notes.svg' }
];
const fragments = Object.fromEntries(await Promise.all(['overview', 'research', 'course-projects', 'publications', 'background', 'coursework', 'contact', 'personal'].map(async name => [name, (await readFile(path.join(root, 'content', `${name}.html`), 'utf8')).replaceAll('\r\n', '\n')])));
const bilingual = (tag, en, zh, attributes = '') => `<${tag}${attributes} data-en="${en}" data-zh="${zh}">${en}</${tag}>`;

// Presentation assets are separate from the CV text in content/.
const researchVisuals = {
  'Geographic Generalization in End-to-End Planning at Worldwide Scale': {
    file: 'geographic-generalization.svg',
    altEn: 'Planned paths on a city street, a divided highway, and a winding rural road',
    altZh: '城市街道、分隔式高速公路和乡间弯道上的规划轨迹',
    captionEn: 'Compare planning across road environments with a shared benchmark.',
    captionZh: '用同一套评测基准比较不同道路环境下的规划表现。'
  },
  'Pushing the Limits of State-of-the-Art End-to-End Driving Planners': {
    file: 'temporal-planning.svg',
    altEn: 'Past and current driving frames lead to a predicted future frame and trajectory',
    altZh: '历史和当前驾驶帧连接到预测的未来场景与轨迹',
    captionEn: 'Fuse past observations and predict the next scene to help plan the trajectory.',
    captionZh: '融合历史观测并预测未来场景，辅助轨迹规划。'
  },
  'Autonomous Vehicles Test Scenario Generation in Perception-Limited Environments': {
    file: 'perception-scenarios.svg',
    altEn: 'At an intersection, an amber dashed outline shows a detection offset from a crossing car',
    altZh: '在交叉路口，橙色虚线框与横穿的车辆错开，表示感知误差',
    captionEn: 'Use sensor errors in distance and speed to generate critical test scenarios.',
    captionZh: '将距离和速度的感知误差纳入关键测试场景生成。'
  },
  'Control of Connected and Autonomous Vehicles Utilizing Road Shoulder Lane Based on Deep Reinforcement Learning': {
    file: 'shoulder-lane-control.svg',
    altEn: 'A connected vehicle takes a highlighted shoulder lane beside regular freeway traffic',
    altZh: '在高速公路的混合车流中，网联车辆驶入高亮的路肩车道',
    captionEn: 'Evaluate a reinforcement learning policy for shoulder-lane use in mixed traffic.',
    captionZh: '在混合车流中评估强化学习的路肩车道控制策略。'
  }
};
const organizationLogos = {
  'Bosch China': { file: 'bosch.svg', alt: 'Bosch logo' },
  'VITA Lab, EPFL': { file: 'vita-epfl.png', alt: 'EPFL VITA Lab logo' },
  'EPFL': { file: 'epfl.svg', alt: 'EPFL logo' },
  'Southeast University': { file: 'southeast-university.svg', alt: 'Southeast University logo' }
};
function decorateResearch(body) {
  return body.replace(/<article class="project"([^>]*)>([\s\S]*?)<\/article>/g, (original, attributes, copy) => {
    const title = copy.match(/<h3[^>]*>([^<]+)<\/h3>/)?.[1];
    const visual = researchVisuals[title];
    if (!visual) return original;
    const caption = bilingual('figcaption', visual.captionEn, visual.captionZh);
    return `<article class="project project-with-image"${attributes}><figure class="project-visual"><img src="assets/research/${visual.file}" width="560" height="400" alt="${visual.altEn}" data-alt-en="${visual.altEn}" data-alt-zh="${visual.altZh}" loading="lazy" decoding="async">${caption}</figure><div class="project-copy">${copy}</div></article>`;
  });
}
function decoratePublications(body) {
  return body.replace(/<article class="publication"([^>]*)>([\s\S]*?)<\/article>/g, (_, attributes, copy) => `<article class="publication publication-with-logo"${attributes}><div class="venue-logo"><img src="assets/logos/itsc-2026.png" width="4776" height="2836" alt="IEEE ITSC 2026 conference logo" loading="lazy" decoding="async"></div><div class="publication-copy">${copy}</div></article>`);
}
function decorateBackground(body) {
  return body.replace(/<div class="entry">(<span class="date"[\s\S]*?<\/span>)<div>([\s\S]*?)<\/div><\/div>/g, (original, date, copy) => {
    const name = copy.match(/<h3[^>]*>([^<]+)<\/h3>/)?.[1];
    const logo = organizationLogos[name];
    if (!logo) return original;
    return `<div class="entry entry-with-logo">${date}<div class="entry-copy"><div class="entry-logo"><img src="assets/logos/${logo.file}" alt="${logo.alt}" loading="lazy" decoding="async"></div>${copy}</div></div>`;
  });
}

function pageHeader(route) {
  const zh = route.headingZh || route.zh;
  return `<div class="page-heading"><div>${bilingual('a', 'Home', '首页', ' href="index.html" class="back-link" data-page-link')}<h1 id="page-title" data-en="${route.en}" data-zh="${zh}">${route.en}</h1><span class="heading-rule" aria-hidden="true"></span></div><img class="page-art" src="${route.art}" width="520" height="300" alt="" aria-hidden="true"></div>`;
}

function explore() {
  const cards = routes.filter(route => route.art).map(route => {
    const title = bilingual('h2', route.en, route.cardZh || route.headingZh || route.zh);
    return `<a class="explore-link" href="${route.file}" id="${route.cardId || route.key}" data-page-link><img class="explore-art" src="${route.art}" width="520" height="300" alt="">${title}<span class="explore-arrow" aria-hidden="true">&#8599;</span></a>`;
  });
  return `<nav class="explore-nav" aria-label="Explore the website">${cards.join('')}</nav>`;
}

for (const route of routes) {
  let content;
  if (route.key === 'home') {
    content = `<div class="campus-cover" role="img" aria-label="EPFL campus photographed by Yizhi on his first day"><div class="cover-grid" aria-hidden="true"></div><div class="cover-caption"><span>EPFL</span><span>LAUSANNE, SWITZERLAND</span></div><span class="cover-scan" aria-hidden="true"></span></div>${fragments.overview}${explore()}${fragments.personal}${fragments.contact}`;
  } else {
    let body = fragments[route.key];
    if (route.key !== 'background') body = body.replace(/<h2 id="(?:research|publications)-title"[^>]*>[\s\S]*?<\/h2>/, '').replace(/aria-labelledby="(?:research|publications)-title"/, 'aria-labelledby="page-title"');
    body = body.replace('href="#paper-itsc2026"', 'href="publications.html#paper-itsc2026"');
    if (route.key === 'research') body = decorateResearch(body);
    if (route.key === 'publications') body = decoratePublications(body);
    if (route.key === 'background') body = decorateBackground(body.replace('<!-- SELECTED_COURSEWORK -->', fragments.coursework));
    content = `${pageHeader(route)}${body}<nav class="page-bottom-nav" aria-label="Other pages">${routes.filter(item => item.key !== route.key).map(item => `<a href="${item.file}" data-page-link>${bilingual('span', item.en, item.zh)}<span class="nav-arrow" aria-hidden="true">→</span></a>`).join('')}</nav>`;
  }
  const nav = routes.map(item => `<a href="${item.file}" data-page-link${route.key === item.key ? ' aria-current="page"' : ''} data-en="${item.en}" data-zh="${item.zh}">${item.en}</a>`).join('');
  const footerCredit = route.key === 'home' ? `<p class="photo-credit" data-en="Campus photo taken by Yizhi on his first day at EPFL." data-zh="校园照片由 Yizhi 在来到 EPFL 校园的第一天拍摄。">Campus photo taken by Yizhi on his first day at EPFL.</p>` : '';
  const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f7faff">
<meta name="description" content="Yizhi Zhao, M.Sc. student at EPFL and project student at VITA Lab. Research in end-to-end autonomous driving, world models, and reinforcement learning.">
<meta property="og:title" content="${route.key === 'home' ? 'Yizhi Zhao | EPFL' : `${route.title} | Yizhi Zhao`}"><meta property="og:type" content="website"><meta property="og:url" content="${origin}${route.key === 'home' ? '' : route.file}">
<title>${route.key === 'home' ? 'Yizhi Zhao | EPFL' : `${route.title} | Yizhi Zhao`}</title>
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="styles.css"><script src="app.js" defer></script>
</head><body data-page="${route.key}"><div class="reading-progress" aria-hidden="true"></div>
${bilingual('a', 'Skip to content', '跳转到正文', ' class="skip-link" href="#main"')}
<header class="site-header"><div class="container header-inner"><a class="brand" href="index.html" data-page-link><span class="brand-dot" aria-hidden="true"></span>Yizhi Zhao</a><nav class="main-nav" id="main-nav" aria-label="Main navigation">${nav}</nav><div class="header-actions"><button class="language-toggle" type="button" aria-label="Switch to Chinese" lang="zh-CN">中文</button>${bilingual('button', 'Menu', '菜单', ' class="menu-toggle" type="button" aria-controls="main-nav" aria-expanded="false"')}</div></div></header>
<main id="main" class="container page-content">${content}</main>
<footer class="container footer"><div><span>© <span id="year">2026</span> Yizhi Zhao</span>${footerCredit}</div><div class="footer-links"><a href="mailto:yizhi.zhao@epfl.ch">Email</a><a href="assets/Graduate_CV_Yizhi.pdf" download>CV</a>${bilingual('a', 'Back to top', '返回顶部', ' href="#"')}</div></footer>
</body></html>`;
  await writeFile(path.join(root, 'dist', route.file), html + '\n');
}
console.log(`Built ${routes.map(route => route.file).join(', ')}.`);
