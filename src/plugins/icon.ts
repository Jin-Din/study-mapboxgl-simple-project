import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { App } from 'vue';
// svg图标
import 'virtual:svg-icons-register';

export default {
  install: (app: App) => {
    //Element icon 注册到全局
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  }
};
