import { defineConfig } from "vite"
import path from "path"
import fs from "fs"

export default defineConfig({
  build: {
    target: "esnext",
    minify: false,
    rollupOptions: {
      input: path.resolve(__dirname, "intex.html"),
      output: {
        dir: path.resolve(__dirname, "dist")
      }
    },
    copyPublicDir: true,
    emptyOutDir: true,
    outDir: "dist"
  },
  publicDir: "public",
  server: {
    middlewareMode: false
  },
  plugins: [
    {
      name: "rename-html-to-index",
      apply: "build",
      enforce: "post",
      generateBundle(options, bundle) {
        // 找到生成的 HTML 文件并将其重命名为 index.html
        for (const [filename, asset] of Object.entries(bundle)) {
          if (filename.includes("intex") && filename.endsWith(".html")) {
            // 创建 index.html 的引用
            const content = asset.source
            bundle["index.html"] = {
              type: "asset",
              fileName: "index.html",
              source: content
            }
            break
          }
        }
      },
      writeBundle() {
        // 确保 index.html 作为入口点存在
        const distPath = path.resolve(__dirname, "dist")
        const htmlFile = path.join(distPath, "intex.html")
        const indexFile = path.join(distPath, "index.html")
        
        if (fs.existsSync(htmlFile)) {
          fs.copyFileSync(htmlFile, indexFile)
          console.log("✓ Created index.html for Cloudflare Pages")
        }
      }
    }
  ]
})
