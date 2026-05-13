import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'nr check --fix'
  },
  lint: { options: { typeAware: true, typeCheck: true } }
})
