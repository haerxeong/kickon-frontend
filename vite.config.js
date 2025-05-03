import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/predict': {
          target: env.VITE_API_PREDICT_URL,
          changeOrigin: true,
          rewrite: (path) =>
              path.replace(/^\/api\/predict/, '/default/kickon-transfer-predict'),
        },
      },
    },
  };
});