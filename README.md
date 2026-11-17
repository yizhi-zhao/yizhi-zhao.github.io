# Yizhi Zhao 个人网站

适用于求职、实习和 PhD 申请的个人网站，使用蓝色主题、EPFL 校园背景、轻量页面切换动画和独立子页面。英文为默认语言，支持中文切换，手机和桌面均可浏览。页面不展示奖项与荣誉。

线上地址：<https://yizhi-zhao.github.io/>。GitHub 仓库：<https://github.com/yizhi-zhao/yizhi-zhao.github.io>。

首页将个人介绍与照片卡片并排放置，手机上改为上下排列。默认显示用户提供的户外照 `Yizhi_pic.jpg`（1079 × 1619 像素），点击照片翻面后显示原来的正式照 `Yizhi-2_blue_bg1.jpg`（1717 × 1948 像素），以“校园之外 / 校园之中”作对照；再次点击翻回。可用 Tab 聚焦照片、Enter 或空格翻面，开启减少动态效果时即时切换。原始图片不重新压缩，点击不会打开图片或跳转。全站正文约 17px，导航与按钮约 16–17px，辅助文字至少 14px；校园装饰性地名为 11–12px。研究、论文和经历分别位于 `research.html`、`publications.html`、`background.html`；它们是实际 HTML 文件，可以直接访问、刷新和分享。首页三个入口只保留标题、图形和箭头，不添加会变化的内容摘要。

## 替换 EPFL 背景图

1. 用新图片替换 **`dist/assets/epfl-campus.jpg`**，保持文件名一致即可。建议使用宽幅 JPG，宽度至少 1280 像素。
2. 图片位置和遮罩在 **`dist/styles.css`** 中设置：`--campus-image` 指定图片路径，`--campus-position` 控制裁切位置；`.campus-cover` 的 `background-image` 第一层为蓝色遮罩。
3. 提交并推送到 GitHub，网站会自动更新。单独替换图片不需要修改正文，也不需要重新生成页面。

当前背景使用用户提供的 `campus photo.jpg`（1620 × 1080 像素），页脚注明由 Yizhi 在来到 EPFL 校园的第一天拍摄。照片信息记录在 `dist/assets/PHOTO_CREDITS.md`；故事文案位于 `scripts/build-pages.mjs` 的 `footerCredit`，修改后运行 `npm run build`。

## 修改个人爱好

首页底部“研究之外”的内容在 **`content/personal.html`**，使用用户提供的运动、徒步、摄影、音乐、动画、剧集和咖啡描述，以小区块呈现。修改这个文件中的 `data-en`、`data-zh` 和默认英文文本，然后运行 `npm run build` 并推送即可更新。

## 本地查看

最简单的方式：直接用浏览器打开 `dist/index.html`，无需安装依赖。

也可以在此项目目录打开 PowerShell，运行：

```powershell
npm run dev
```

然后访问 <http://127.0.0.1:8000>。按 `Ctrl+C` 停止预览。需要 Node.js；项目不依赖第三方 npm 包，也不需要 `npm install`。

如果 Windows PowerShell 提示不能执行 `npm.ps1`，使用 `npm.cmd run dev`；生成页面可用 `npm.cmd run build` 或 `node scripts/build-pages.mjs`。

## 修改内容

- `content/overview.html`：首页个人介绍与照片。
- `content/research.html`、`content/publications.html`、`content/background.html`：研究、论文与经历。
- `content/contact.html`：首页联系信息。
- `content/personal.html`：首页底部的个人兴趣。
- `scripts/build-pages.mjs`：公共页面模板、导航、首页分页面入口与图片署名。修改上述源文件后运行 `npm run build`，生成四个 `dist/*.html` 文件。双语文本写在 `data-en` / `data-zh` 属性中；修改时请同步更新属性和默认英文文本。
- `dist/styles.css`：颜色、字体、布局与移动端样式。
- `dist/app.js`：语言切换、导航和引用复制。
- `dist/assets/Graduate_CV_Yizhi.pdf`：可下载的原始 CV。更新简历时，使用同名文件替换即可。
- `dist/assets/yizhi-zhao.jpg`：用户提供的原始个人照片，通过 CSS 控制显示尺寸与比例。
- `dist/assets/yizhi-formal.jpg`：原始正式照，显示在照片卡片背面。
- `dist/assets/epfl-campus.jpg`：首页 EPFL 校园背景。
- `dist/assets/research-lines.svg`：代码绘制的概念性研究插图，不代表实验数据。
- `dist/assets/research/`：四个研究项目的独立概念示意图，分别对应地理泛化、时序规划、感知受限场景生成、路肩车道控制；并非实验截图或结果。
- `dist/assets/logos/`：Bosch、EPFL、VITA、东南大学和 ITSC 2026 的原始标志，来源记录于 `SOURCES.md`。显示时保持原色和原比例。
- `dist/assets/favicon.svg`：浏览器标签页图标。

首页 Email、CV、LinkedIn、GitHub 的 SVG 图标写在 `content/overview.html` 的 `.profile-links` 中，样式在 `dist/styles.css`。双语属性放在链接内的文字 `<span>` 上；不要放到包含 SVG 的 `<a>` 上，因为语言切换会替换带双语属性元素的全部内容。修改后运行构建，不要只修改生成的 `dist/index.html`。

## 提交并更新网站

PowerShell 需要先进入实际 Git 仓库，再执行 Git 命令：

```powershell
cd "C:\Users\60310\Desktop\personal_web\yizhi-portfolio"
npm.cmd run build
git add .
git commit -m "Update website"
git push origin main
```

`origin` 应指向 `https://github.com/yizhi-zhao/yizhi-zhao.github.io.git`，可用 `git remote -v` 检查。推送到 `main` 后，现有 GitHub Actions 会自动构建并部署。

网站使用 HTML、CSS 和原生 JavaScript。页面本身不请求任何个人数据，也不需要数据库。语言偏好仅保存在访客的浏览器里。字体使用系统字体与本机衬线字体，无第三方字体请求。邮件链接使用访客的邮件客户端；没有额外的联系表单后端。

支持的浏览器使用 CSS View Transitions 进行页面切换；其他浏览器正常跳转并使用入场淡入效果。系统开启“减少动态效果”时关闭动画。

## 内容依据

经历、日期、项目和论文信息均来自提供的 `Graduate_CV_Yizhi.pdf`，求职目标与照片来自本次沟通。未添加未经提供的论文链接、DOI 或实验结果。

**Research 内容约束：** 四个研究标题、英文项目概述、单位、导师、日期和成果均使用 CV 完整原文，仅合并 PDF 换行。标题在中英文页面中均保持 CV 的英文原题；中文正文提供完整对应翻译。后续不要擅自改写、缩写、概括标题或研究内容，更新必须以用户提供的新 CV 或明确文字为准。

配图与标志由 `scripts/build-pages.mjs` 在生成页面时加入，映射位于 `researchVisuals` 和 `organizationLogos`；研究原文仍独立保存在 `content/research.html`，不会因更换图片而修改。Publication 的会议标志位于 `decoratePublications` 中。

- DrivoR 项目的 23% EPDMS 提升仅指 navmini 子集；navtrain 全量验证仍为后续工作。
- 地理泛化评估项目为进行中。
- ITSC 2026 论文标记为已接收，引用不虚构页码、DOI 或出版信息。

后续适合补充：可公开的研究代码仓库、论文正式链接、项目报告或实际可展示的实验视频。准备好对应资料后，再把真实链接加入页面即可。

## GitHub Pages

公开源码仓库：<https://github.com/Patrickstarh/yizhi-portfolio>

GitHub Pages 地址：<https://patrickstarh.github.io/yizhi-portfolio/>

已准备 `.github/workflows/deploy.yml`：推送到 `main` 或手动运行工作流时，运行 `npm run build` 生成静态页面并将 `dist/` 部署到 GitHub Pages，不需要安装第三方 npm 依赖。

仓库需要在 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。页面资源使用相对路径，同时支持 `用户名.github.io/仓库名/` 形式的网址。实际部署状态以仓库 Actions 与 Pages 页面为准。

工作流遵循 [GitHub 官方 Pages 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

本地修改后，在项目目录执行以下命令，提交并触发自动部署：

```powershell
git add .
git commit -m "Update portfolio"
git push origin main
```

## Sites 托管

可部署文件全部位于 `dist/`。Sites 配置位于 `.openai/hosting.json`，其中 `project_id` 应在后续更新时保留。新建的 Sites 默认为私有访问。

如需迁移到其他静态网站托管服务，将 `dist/` 中的内容作为站点根目录即可。更换域名时，请同步更新 `dist/index.html` 中的 `og:url`。
