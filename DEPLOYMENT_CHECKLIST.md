# 部署检查清单 (Cloudflare Pages 部署前)

## 文件结构验证

- ✅ 根目录文件完整
  - [ ] 汉语古音手册.html
  - [ ] 汉语古音手册.css
  - [ ] s2t_map.js
  - [ ] package.json
  - [ ] vite.config.js
  - [ ] .gitignore
  - [ ] README.md
  - [ ] wrangler.toml
  - [ ] _redirects

- ✅ public/ 文件完整
  - [ ] public/search-index.json
  - [ ] public/chunks/index.json
  - [ ] public/chunks/part-0.html 到 part-235.html (236 个文件)

## 配置检查

- [ ] package.json 中 build 脚本正确
  - 应为: `"build": "vite build"`

- [ ] vite.config.js 配置
  - 入口点: 汉语古音手册.html
  - 输出目录: dist
  - publicDir: public
  - copyPublicDir: true

- [ ] HTML 文件中的引用
  - [ ] 确认 CSS 路径正确: `href="汉语古音手册.css"`
  - [ ] 确认 JS 路径正确: `src="s2t_map.js"`
  - [ ] 确认 chunks 路径正确: `chunks/part-${n}.html`

## 资源路径验证

在浏览器开发者工具中检查以下资源是否加载成功：

- [ ] 样式表 (汉语古音手册.css)
- [ ] JS 文件 (s2t_map.js)
- [ ] 索引数据 (chunks/index.json)
- [ ] 搜索索引 (search-index.json)
- [ ] HTML 分片 (chunks/part-0.html 等)

## 部署步骤

### 本地构建测试
```bash
npm install
npm run build
```

### 验证构建输出
检查 dist/ 文件夹应包含：
- dist/汉语古音手册.html
- dist/汉语古音手册.css
- dist/s2t_map.js
- dist/search-index.json
- dist/chunks/index.json
- dist/chunks/part-*.html

### Cloudflare Pages 配置

**构建配置:**
- 构建命令: `npm run build`
- 构建输出目录: `dist`
- 根目录: `/`

**环境变量:** (如果需要)
- (暂无)

## 常见问题排查

### 页面加载空白
- [ ] 确认网络请求没有 404 错误
- [ ] 检查 chunks/index.json 是否存在
- [ ] 检查浏览器控制台是否有 CORS 或其他错误

### 搜索功能不工作
- [ ] 确认 search-index.json 已正确加载
- [ ] 确认 chunks/ 目录中所有文件都已上传
- [ ] 检查浏览器开发者工具网络标签

### 样式未加载
- [ ] 确认 CSS 文件路径正确
- [ ] 检查 Content-Type 响应头
- [ ] 清除浏览器缓存重新加载

## 最终部署

1. 推送代码到 GitHub/GitLab
2. 在 Cloudflare Pages 中连接 Git 仓库
3. 填写构建配置（参考上面的 CF Pages 配置）
4. 点击"部署"
5. 等待构建完成

部署完成后，访问 CF Pages 提供的域名验证网站
