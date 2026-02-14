# 汉语古音手册词典（main 分支）

本仓库的 `main` 分支用于开发与维护源码。

## 分支职责

- `main`：开发分支，放源码、构建配置、文档
- `gh-pages`：发布分支，只放可直接部署的静态产物

## 项目简介

这是一个静态词典站点，核心特性：

- 分片（chunks）按需加载，减小首屏压力
- 站内检索与分片跳转
- 固定头部/底部与玻璃态风格 UI
- 桌面端 + 移动端自适应

## 目录说明

- `intex.html`：主页面入口
- `汉语古音手册.css`：主样式
- `public/`：构建时复制到产物目录的静态资源
  - `public/chunks/`：分片数据
  - `public/search-index.json`：搜索索引
  - `public/s2t_map.js`：简繁映射
- `chunks/`：本地分片数据（用于运行/索引）
- `vite.config.js`：构建配置
- `package.json`：脚本与依赖
- `_redirects`、`wrangler.toml`：部署相关配置

## 本地开发

安装依赖：

```bash
npm install
```

构建：

```bash
npm run build
```

本地静态预览（可选）：

```bash
python -m http.server 8000
```

访问：`http://localhost:8000`

## 构建输出

`npm run build` 后生成 `dist/`，常见关键文件：

- `dist/index.html`
- `dist/intex.html`
- `dist/汉语古音手册.css`
- `dist/s2t_map.js`
- `dist/search-index.json`
- `dist/chunks/index.json`
- `dist/chunks/part-*.html`

## 发布流程（从 main 到 gh-pages）

1. 在 `main` 完成改动并验证构建通过
2. 将 `dist/` 内文件平铺到 `gh-pages` 分支根目录（不要带 `dist` 目录本身）
3. 推送 `gh-pages`

## 发布前检查清单

- `npm run build` 成功
- 搜索、翻页、分片加载正常
- 页脚不遮挡主要交互
- 移动端（窄屏）布局可用
- 部署产物里存在 `chunks/index.json` 与 `chunks/part-*.html`

## 故障排查

若页面空白或词条不显示：

- 检查 `chunks/index.json` 是否可访问
- 检查 `chunks/part-*.html` 是否部署完整
- 打开浏览器 Network 看是否有 404

若 HTTPS 推送异常，可使用 SSH over 443：

- `ssh://git@ssh.github.com:443/TakionKroslin/dictionary.git`

## 维护约定

- 功能与样式修改只在 `main` 做
- `gh-pages` 仅作为发布产物分支
- 流程变更时，优先更新本 README
