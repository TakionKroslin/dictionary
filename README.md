# 汉语古音手册 - Cloudflare Pages 部署

## 部署步骤

### 1. 本地开发
```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 本地预览（可选）
python -m http.server 8000
# 然后访问 http://localhost:8000
```

### 2. 部署到 Cloudflare Pages

#### 方法一：使用 GitHub 连接（推荐）
1. 推送代码到 GitHub
2. 登录 Cloudflare 控制面板
3. 点击 **Pages** → **连接到 Git**
4. 选择你的仓库
5. 设置构建选项：
   - **构建命令**：`npm run build`
   - **构建输出目录**：`dist`
6. 部署完成

#### 方法二：手动部署
1. 本地运行 `npm run build` 生成 `dist` 文件夹
2. 登录 Cloudflare 控制面板
3. 点击 **Pages** → **上传资产**
4. 上传 `dist` 文件夹内的所有文件

#### 方法三：使用 Wrangler CLI
```bash
# 安装 Wrangler
npm install -g wrangler

# 登录
wrangler login

# 部署
wrangler pages deploy dist
```

## 项目结构

```
dictionary/
├── 汉语古音手册.html      # 主页面
├── 汉语古音手册.css       # 样式表
├── s2t_map.js             # 简繁转换映射
├── search-index.json      # 搜索索引
├── chunks/                # 数据分片
│   ├── index.json        # 索引数据
│   └── part-*.html       # 236 个HTML分片
├── package.json           # 项目配置
├── vite.config.js         # Vite 构建配置
└── .gitignore            # Git 忽略文件
```

## 功能说明

- **繁体字查询**：支持通过繁体字搜索古音数据
- **分片加载**：HTML 拆分成 236 个小文件，提高加载速度
- **简繁互转**：集成 s2t_map.js 进行简繁字转换
- **搜索索引**：优化的 search-index.json 提供快速搜索

## 注意事项

1. **资源路径**：所有资源都使用相对路径，保证在任何部署环境下都能正确访问
2. **文件编码**：所有文件使用 UTF-8 编码
3. **中文文件名**：HTML 和 CSS 使用中文文件名，建议在部署前验证

## 构建输出

运行 `npm run build` 后，会在 `dist` 文件夹生成：
- 单一 HTML 文件（所有资源嵌入）或多文件版本（取决于 vite.config.js 配置）
- 可直接在浏览器打开使用

## 常见问题

### Q: 部署后页面显示空白？
A: 检查浏览器控制台是否有错误。可能原因：
- chunks/index.json 未正确上传
- search-index.json 缺失
- 资源路径错误

### Q: 搜索功能不工作？
A: 确保以下文件存在且路径正确：
- search-index.json
- chunks/index.json
- chunks/part-*.html

### Q: 如何修改分享链接？
A: 编辑 HTML 文件中 share-btn 事件处理器中的 `shareUrl` 变量

## 许可证

© 2026 Takion Kroslin
