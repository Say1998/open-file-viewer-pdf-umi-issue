import { defineConfig } from 'umi';

export default defineConfig({
  // 使用 hash 路由，与 Ant Design Pro 一致
  history: { type: 'hash' },
  // 禁用 mock
  mock: false,
  // 与 bplinkage 项目保持一致的 Webpack 处理方式
  // 不排除任何 node_modules 的转换
});
