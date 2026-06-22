import React, { useCallback, useMemo, useState } from 'react';
import {
  archivePlugin,
  audioPlugin,
  imagePlugin,
  officePlugin,
  pdfPlugin,
  textPlugin,
  videoPlugin,
} from '@open-file-viewer/core';
import { FileViewer } from '@open-file-viewer/react';
import '@open-file-viewer/core/style.css';
import * as pdfjsLib from 'pdfjs-dist';

// ============================================================
// 最小可复现 Demo — UmiJS 4 (Webpack 5) 环境
// 复现 open-file-viewer PDF 预览显示 ofv-fallback 的问题
// 与 bplinkage 项目完全相同的技术栈
// ============================================================

const plugins = [
  imagePlugin(),
  pdfPlugin({
    pdfjs: pdfjsLib,
    workerSrc: '/pdf.worker.min.mjs',
  }),
  officePlugin(),
  textPlugin(),
  videoPlugin(),
  audioPlugin(),
  archivePlugin(),
];

// 公开可访问的测试 PDF
const PDF_URL =
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export default function HomePage() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'fail'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  const files = useMemo(
    () => [{ file: PDF_URL, fileName: 'test.pdf', mimeType: 'application/pdf' }],
    [],
  );

  const onError = useCallback((err: any) => {
    console.error('onError:', err);
    setStatus('fail');
    setErrorMsg(err?.message || String(err));
  }, []);

  const onLoad = useCallback(() => {
    setStatus('ok');
  }, []);

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 24 }}>
      <h1 style={{ color: '#d4380d' }}>
        🐛 open-file-viewer PDF 预览失败 — UmiJS 4 环境复现
      </h1>

      <div
        style={{
          background: '#fff',
          border: '1px solid #e8e8e8',
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 16,
        }}
      >
        <strong>环境：</strong>UmiJS 4 (Webpack 5) + react-scripts +
        @open-file-viewer 0.1.6 + pdfjs-dist 4.10.38
      </div>

      <div
        style={{
          background: '#fff',
          border: '1px solid #e8e8e8',
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 16,
        }}
      >
        <strong>问题：</strong>Vite 官方 Playground 正常 ✅ → Webpack 环境显示
        ofv-fallback ❌
        <br />
        <strong>根因：</strong>
        <code>pdfjs.getDocument(&#123; url &#125;)</code> 在 Webpack Worker
        中无法 fetch PDF，但{' '}
        <code>getDocument(&#123; data: ArrayBuffer &#125;)</code> 正常
      </div>

      {status === 'fail' && (
        <div
          style={{
            background: '#fff2f0',
            color: '#ff4d4f',
            border: '1px solid #ffa39e',
            padding: '10px 16px',
            borderRadius: 6,
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          ❌ PDF 预览失败 — 显示 ofv-fallback（{errorMsg || '无错误信息'}）
        </div>
      )}
      {status === 'ok' && (
        <div
          style={{
            background: '#f6ffed',
            color: '#52c41a',
            border: '1px solid #b7eb8f',
            padding: '10px 16px',
            borderRadius: 6,
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          ✅ PDF 预览成功
        </div>
      )}

      <div
        style={{
          background: '#fff',
          border: '1px solid #e8e8e8',
          borderRadius: 8,
          overflow: 'hidden',
          height: 500,
        }}
      >
        <FileViewer
          files={files}
          theme="light"
          plugins={plugins}
          width="100%"
          height="100%"
          fit="contain"
          fallback="custom"
          onError={onError}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}
