# Yizhi Zhao 个人网站

适用于求职、实习和 PhD 申请的个人学术主页，使用白底、蓝色链接和简洁的文字排版。英文为默认语言，支持中文切换，手机和桌面均可浏览。页面不展示奖项与荣誉。

首页将个人介绍与大幅半身照并排放置，手机上改为上下排列。照片直接使用提供的 1717 × 1948 像素原文件，不重新压缩，可点击查看原图。页面已移除装饰性小车与研究示意图、口号、机构展示条和重复卡片。

## 本地查看

最简单的方式：直接用浏览器打开 `dist/index.html`，无需安装依赖。

也可以在此项目目录打开 PowerShell，运行：

```powershell
npm run dev
```

然后访问 <http://127.0.0.1:8000>。按 `Ctrl+C` 停止预览。需要 Node.js；项目不依赖第三方 npm 包，也不需要 `npm install`。

## 修改内容

- `dist/index.html`：个人介绍、研究、论文、经历和联系方式。双语文本写在 `data-en` / `data-zh` 属性中；修改英文内容时，也请更新对应的中文和标签内的默认英文文本。
- `dist/styles.css`：颜色、字体、布局与移动端样式。
- `dist/app.js`：语言切换、导航和引用复制。
- `dist/assets/Graduate_CV_Yizhi.pdf`：可下载的原始 CV。更新简历时，使用同名文件替换即可。
- `dist/assets/yizhi-zhao.jpg`：用户提供的原始个人照片，通过 CSS 控制显示尺寸与比例。
- `dist/assets/favicon.svg`：浏览器标签页图标。

网站使用 HTML、CSS 和原生 JavaScript。页面本身不请求任何个人数据，也不需要数据库。语言偏好仅保存在访客的浏览器里。字体使用系统字体与本机衬线字体，无第三方字体请求。邮件链接使用访客的邮件客户端；没有额外的联系表单后端。

## 内容依据

经历、日期、项目和论文信息均来自提供的 `Graduate_CV_Yizhi.pdf`，求职目标与照片来自本次沟通。未添加未经提供的论文链接、DOI 或实验结果。

- DrivoR 项目的 23% EPDMS 提升仅指 navmini 子集；navtrain 全量验证仍为后续工作。
- 地理泛化评估项目为进行中。
- ITSC 2026 论文标记为已接收，引用不虚构页码、DOI 或出版信息。

后续适合补充：可公开的研究代码仓库、论文正式链接、项目报告或实际可展示的实验视频。准备好对应资料后，再把真实链接加入页面即可。

## GitHub Pages

公开源码仓库：<https://github.com/Patrickstarh/yizhi-portfolio>

GitHub Pages 地址：<https://patrickstarh.github.io/yizhi-portfolio/>

已准备 `.github/workflows/deploy.yml`：推送到 `main` 或手动运行工作流时，自动将 `dist/` 部署到 GitHub Pages，不需要额外的 npm 依赖或构建步骤。

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
