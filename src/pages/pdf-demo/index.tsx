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
import { PageContainer } from '@ant-design/pro-components';
import { Card, Space, Tag } from 'antd';
import React, { useMemo } from 'react';

const plugins = [
  imagePlugin(),
  pdfPlugin({
    workerSrc: '/pdf.worker.min.mjs',
  }),
  officePlugin(),
  textPlugin(),
  videoPlugin(),
  audioPlugin(),
  archivePlugin(),
];

const TEST_PDF_URL = '/dummy.pdf';

const PdfDemo: React.FC = () => {

  const files = useMemo(
    () => [
      {
        file: TEST_PDF_URL,
        fileName: 'test.pdf',
        mimeType: 'application/pdf',
      },
    ],
    [],
  );

  return (
    <PageContainer title='PDF 预览问题复现'>
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        {/* 环境信息 */}
        <Card size="small" title="环境信息">
          <Space wrap>
            <Tag>UmiJS Max v4</Tag>
            <Tag>React 19</Tag>
            <Tag>@open-file-viewer/core 0.1.6</Tag>
            <Tag>@open-file-viewer/react 0.1.6</Tag>
            <Tag>pdfjs-dist 4.10.38</Tag>
          </Space>
        </Card>

        <Card size="small" title="PDF 预览区域">
          <div style={{ width: '100%', height: 500, border: '1px solid #f0f0f0' }}>
            <FileViewer
              files={files}
              theme="light"
              plugins={plugins}
              width="100%"
              height="100%"
              fit="contain"
              onError={(err: any) => {
                console.error('onError callback:', err);
              }}
              onLoad={() => {}}
            />
          </div>
        </Card>
      </Space>
    </PageContainer>
  );
};

export default PdfDemo;
