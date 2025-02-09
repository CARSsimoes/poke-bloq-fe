import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html'],
        exclude: ['**/shared/layouts/**', '**/main.ts', '**/mocks/', '**/shared/types/**'],
        enabled: false,
      },
    },
  }),
)
