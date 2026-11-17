# Yizhi Zhao 个人网站

适用于求职、实习和 PhD 申请的个人网站，使用蓝色主题、EPFL 校园背景、轻量页面切换动画和独立子页面。英文为默认语言，支持中文切换，手机和桌面均可浏览。页面不展示奖项与荣誉。

首页将个人介绍与大幅半身照并排放置，手机上改为上下排列。照片直接使用提供的 1717 × 1948 像素原文件，不重新压缩，可点击查看原图。研究、论文和经历分别位于 `research.html`、`publications.html`、`background.html`；它们是实际 HTML 文件，可以直接访问、刷新和分享。正文沿用此前版本，没有重新加入宣传口号。

## 替换 EPFL 背景图

1. 用新图片替换 **`dist/assets/epfl-campus.jpg`**，保持文件名一致即可。建议使用宽幅 JPG，宽度至少 1280 像素。
2. 图片位置和遮罩在 **`dist/styles.css`** 中设置：`--campus-image` 指定图片路径，`--campus-position` 控制裁切位置；`.campus-cover` 的 `background-image` 第一层为蓝色遮罩。
3. 提交并推送到 GitHub，网站会自动更新。单独替换图片不需要修改正文，也不需要重新生成页面。

当前照片为 Fridolin freudenfett 拍摄的 EPFL Rolex Learning Center，来自 [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:EPFL_Rolex_Learning_Center.jpg)，使用 CC BY-SA 4.0。来源和许可记录在 `dist/assets/PHOTO_CREDITS.md`，首页页脚也有署名。换成自己的图片后，可在 `scripts/build-pages.mjs` 的 `footerCredit` 中同步更新来源并运行 `npm run build`。

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
- `scripts/build-pages.mjs`：公共页面模板、导航、首页分页面入口与图片署名。修改上述源文件后运行 `npm run build`，生成四个 `dist/*.html` 文件。双语文本写在 `data-en` / `data-zh` 属性中；修改时请同步更新属性和默认英文文本。
- `dist/styles.css`：颜色、字体、布局与移动端样式。
- `dist/app.js`：语言切换、导航和引用复制。
- `dist/assets/Graduate_CV_Yizhi.pdf`：可下载的原始 CV。更新简历时，使用同名文件替换即可。
- `dist/assets/yizhi-zhao.jpg`：用户提供的原始个人照片，通过 CSS 控制显示尺寸与比例。
- `dist/assets/epfl-campus.jpg`：首页 EPFL 校园背景。
- `dist/assets/research-lines.svg`：代码绘制的概念性研究插图，不代表实验数据。
- `dist/assets/favicon.svg`：浏览器标签页图标。

网站使用 HTML、CSS 和原生 JavaScript。页面本身不请求任何个人数据，也不需要数据库。语言偏好仅保存在访客的浏览器里。字体使用系统字体与本机衬线字体，无第三方字体请求。邮件链接使用访客的邮件客户端；没有额外的联系表单后端。

支持的浏览器使用 CSS View Transitions 进行页面切换；其他浏览器正常跳转并使用入场淡入效果。系统开启“减少动态效果”时关闭动画。

## 内容依据

经历、日期、项目和论文信息均来自提供的 `Graduate_CV_Yizhi.pdf`，求职目标与照片来自本次沟通。未添加未经提供的论文链接、DOI 或实验结果。

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
