import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://yizhi-zhao.github.io/';
const routes = [
  { key: 'home', file: 'index.html', en: 'Home', zh: '首页', title: 'Yizhi Zhao' },
  { key: 'research', file: 'research.html', en: 'Research', zh: '研究', title: 'Research' },
  { key: 'publications', file: 'publications.html', en: 'Publications', zh: '论文', title: 'Publications' },
  { key: 'background', file: 'background.html', en: 'Background', zh: '经历', title: 'Background' }
];
const fragments = Object.fromEntries(await Promise.all(['overview', 'research', 'publications', 'background', 'contact', 'personal'].map(async name => [name, (await readFile(path.join(root, 'content', `${name}.html`), 'utf8')).replaceAll('\r\n', '\n')])));
const bilingual = (tag, en, zh, attributes = '') => `<${tag}${attributes} data-en="${en}" data-zh="${zh}">${en}</${tag}>`;

// Presentation assets are separate from the CV text in content/.
const researchVisuals = {
  'Geographic Generalization in End-to-End Planning at Worldwide Scale': { file: 'geographic-generalization.svg', en: 'Concept illustration of geographic generalization across driving environments', zh: '不同驾驶环境间地理泛化的概念示意图' },
  'Pushing the Limits of State-of-the-Art End-to-End Driving Planners': { file: 'temporal-planning.svg', en: 'Concept illustration of temporal token fusion and future scene prediction', zh: '时序 token 融合与未来场景预测的概念示意图' },
  'Autonomous Vehicles Test Scenario Generation in Perception-Limited Environments': { file: 'perception-scenarios.svg', en: 'Concept illustration of sensor uncertainty and safety-critical driving scenarios', zh: '传感器不确定性与安全关键驾驶场景的概念示意图' },
  'Control of Connected and Autonomous Vehicles Utilizing Road Shoulder Lane Based on Deep Reinforcement Learning': { file: 'shoulder-lane-control.svg', en: 'Concept illustration of reinforcement learning for highway shoulder-lane control', zh: '强化学习高速公路路肩车道控制的概念示意图' }
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
    return `<article class="project project-with-image"${attributes}><figure class="project-visual"><img src="assets/research/${visual.file}" width="560" height="400" alt="${visual.en}" data-alt-en="${visual.en}" data-alt-zh="${visual.zh}" loading="lazy" decoding="async"></figure><div class="project-copy">${copy}</div></article>`;
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
  const zh = route.key === 'research' ? '研究项目' : route.key === 'publications' ? '论文发表' : '个人背景';
  return `<div class="page-heading"><div>${bilingual('a', 'Home', '首页', ' href="index.html" class="back-link" data-page-link')}<h1 id="page-title" data-en="${route.en}" data-zh="${zh}">${route.en}</h1><span class="heading-rule" aria-hidden="true"></span></div><img class="page-art" src="assets/research-lines.svg" width="520" height="300" alt="" aria-hidden="true"></div>`;
}

const pathsArt = `<svg viewBox="0 0 160 100" fill="none" aria-hidden="true"><path d="M10 82C45 75 40 35 76 49s39-26 75-35" stroke="currentColor" stroke-width="2"/><path d="M10 82C45 80 68 94 91 59s39-24 60-45M10 82C38 45 75 20 151 14" stroke="currentColor" stroke-dasharray="3 5" opacity=".4"/><circle cx="76" cy="49" r="5" fill="currentColor"/><circle cx="151" cy="14" r="5" stroke="currentColor"/></svg>`;
const paperArt = `<svg viewBox="0 0 160 100" fill="none" aria-hidden="true"><rect x="54" y="13" width="62" height="78" rx="3" stroke="currentColor" opacity=".3"/><rect x="42" y="5" width="62" height="78" rx="3" fill="#edf4ff" stroke="currentColor"/><path d="M55 24h36M55 34h24M55 53h36M55 63h27" stroke="currentColor" stroke-width="2"/><path d="m99 66 10 10 17-23" stroke="currentColor" stroke-width="2"/></svg>`;
const nodesArt = `<svg viewBox="0 0 160 100" fill="none" aria-hidden="true"><path d="m24 76 49-46 56 35" stroke="currentColor"/><path d="M24 76h105M73 30V8" stroke="currentColor" stroke-dasharray="3 4" opacity=".4"/><circle cx="24" cy="76" r="8" fill="#edf4ff" stroke="currentColor"/><circle cx="73" cy="30" r="10" fill="#edf4ff" stroke="currentColor"/><circle cx="129" cy="65" r="8" fill="#edf4ff" stroke="currentColor"/></svg>`;
function explore() {
  return `<nav class="explore-nav" aria-label="Explore the website">
    <a class="explore-link" href="research.html" id="research" data-page-link><span class="explore-art">${pathsArt}</span>${bilingual('h2', 'Research', '研究项目')}<span class="explore-arrow" aria-hidden="true">↗</span></a>
    <a class="explore-link" href="publications.html" id="publications" data-page-link><span class="explore-art">${paperArt}</span>${bilingual('h2', 'Publications', '论文发表')}<span class="explore-arrow" aria-hidden="true">↗</span></a>
    <a class="explore-link" href="background.html" id="about" data-page-link><span class="explore-art">${nodesArt}</span>${bilingual('h2', 'Background', '个人经历')}<span class="explore-arrow" aria-hidden="true">↗</span></a>
  </nav>`;
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
    if (route.key === 'background') body = decorateBackground(body);
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
console.log('Built index.html, research.html, publications.html, and background.html.');
