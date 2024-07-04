// vite.config.ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'file:///C:/5eme%20Info/PFE/saas-monorepo/node_modules/.pnpm/vite@5.1.4_@types+node@20.11.24_sass@1.71.1/node_modules/vite/dist/node/index.js'
import vue from 'file:///C:/5eme%20Info/PFE/saas-monorepo/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.4_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueJsx from 'file:///C:/5eme%20Info/PFE/saas-monorepo/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.1.4_vue@3.4.21/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs'
import yaml from 'file:///C:/5eme%20Info/PFE/saas-monorepo/node_modules/.pnpm/@rollup+plugin-yaml@4.1.2/node_modules/@rollup/plugin-yaml/dist/es/index.js'
import UnheadVite from 'file:///C:/5eme%20Info/PFE/saas-monorepo/node_modules/.pnpm/@unhead+addons@1.8.10/node_modules/@unhead/addons/dist/vite.mjs'
var __vite_injected_original_import_meta_url =
  'file:///C:/5eme%20Info/PFE/saas-monorepo/apps/app/vite.config.ts'
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    UnheadVite(),
    yaml({
      transform(data) {
        return data === null ? {} : void 0
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', __vite_injected_original_import_meta_url))
    }
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  }
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFw1ZW1lIEluZm9cXFxcUEZFXFxcXHNhYXMtbW9ub3JlcG9cXFxcYXBwc1xcXFxhcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXDVlbWUgSW5mb1xcXFxQRkVcXFxcc2Fhcy1tb25vcmVwb1xcXFxhcHBzXFxcXGFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovNWVtZSUyMEluZm8vUEZFL3NhYXMtbW9ub3JlcG8vYXBwcy9hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB5YW1sIGZyb20gJ0Byb2xsdXAvcGx1Z2luLXlhbWwnXHJcbmltcG9ydCBVbmhlYWRWaXRlIGZyb20gJ0B1bmhlYWQvYWRkb25zL3ZpdGUnXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIFVuaGVhZFZpdGUoKSxcclxuICAgIHlhbWwoe1xyXG4gICAgICB0cmFuc2Zvcm0oZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBkYXRhID09PSBudWxsID8ge30gOiB1bmRlZmluZWRcclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfSxcclxuICBkZWZpbmU6IHtcclxuICAgIF9fVlVFX0kxOE5fRlVMTF9JTlNUQUxMX186IHRydWUsXHJcbiAgICBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXzogZmFsc2UsXHJcbiAgICBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fOiBmYWxzZSxcclxuICAgIF9fVlVFX1BST0RfSFlEUkFUSU9OX01JU01BVENIX0RFVEFJTFNfXzogZmFsc2VcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVQsU0FBUyxlQUFlLFdBQVc7QUFFeFYsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFDakIsT0FBTyxnQkFBZ0I7QUFOMEssSUFBTSwyQ0FBMkM7QUFRbFAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsS0FBSztBQUFBLE1BQ0gsVUFBVSxNQUFNO0FBQ2QsZUFBTyxTQUFTLE9BQU8sQ0FBQyxJQUFJO0FBQUEsTUFDOUI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sMkJBQTJCO0FBQUEsSUFDM0IseUJBQXlCO0FBQUEsSUFDekIsMkJBQTJCO0FBQUEsSUFDM0IseUNBQXlDO0FBQUEsRUFDM0M7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
