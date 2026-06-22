# open-file-viewer PDF 预览失败 - UmiJS 4 最小复现

## 环境

与 Ant Design Pro v6 (bplinkage) 项目完全一致的技术栈：

- **UmiJS 4** (Webpack 5)
- @open-file-viewer/core: 0.1.6
- @open-file-viewer/react: 0.1.6
- pdfjs-dist: 4.10.38

## 运行

```bash
npm install
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/
npm run dev
```

## 问题

1. 页面加载后 PDF 预览区域显示 "PDF 预览失败"（ofv-fallback）
2. 控制台无任何错误输出
3. 浏览器 Network 面板显示 PDF 文件请求成功 (200)
4. pdf.worker.min.mjs 成功加载

## 对比

| 环境 | 结果 |
|------|------|
| Vite (官方 Playground) | ✅ 正常 |
| Webpack 5 (UmiJS 4) | ❌ ofv-fallback |
| Webpack 5 (react-scripts) | ❌ ofv-fallback |

## 诊断

`pdfjs.getDocument({ url })` 在 Webpack 构建的 Worker 中 fetch PDF 失败，
但 `pdfjs.getDocument({ data: ArrayBuffer })` 可以正常工作。
