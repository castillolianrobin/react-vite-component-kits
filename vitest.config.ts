import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'
// import dotenv from 'dotenv';

// dotenv.config();

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: 'src/components/__tests__/config.ts',
      exclude: [...configDefaults.exclude, 'e2e/*', '**/helpers/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'istanbul', // or 'c8'
        reporter: ['text', 'json', 'html'],
      },
    }
  })
)
