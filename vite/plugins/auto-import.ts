import AutoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';

export default (path: any) => {
  return AutoImport({
    // 自动导入 Vue 相关函数
    imports: [
      'vue',
      'vue-router',
      'pinia',
      //custom
      {
        axios: [
          // default imports
          ['default', 'axios'] // import { default as axios } from 'axios',
        ]
      }
    ],
    dirs: [
      '../../src/**',
      '../../src/api/**',
      '../../src/hooks/**',
      '../../src/libs/**',
      '../../src/utils/**',
      // './composables' // only root modules
      // './composables/**', // all nested modules
      // ...
    ],
    eslintrc: {
      enabled: false,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true
    },
    resolvers: [
      AntDesignVueResolver(),
      // 自动导入 Element Plus 相关函数ElMessage, ElMessageBox... (带样式)
      ElementPlusResolver()

      // IconsResolver({
      //   prefix: 'Icon'
      // })
    ],
    vueTemplate: true, // 是否在 vue 模板中自动导入
    dts: path.resolve(path.resolve(__dirname, '../../src'), 'types', 'auto-imports.d.ts')
  });
};
