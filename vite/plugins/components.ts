import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver, ElementPlusResolver} from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';

export default (path: any) => {
    return Components({
        // 允许自动加载在 ./src/components/ 目录下的 markdown 组件
        extensions: ['vue', 'md'],
        resolvers: [
            AntDesignVueResolver({
                importStyle: false, // css-in-js
                resolveIcons: true
            }),
            // 自动导入 Element Plus 组件
            ElementPlusResolver(
                {
                    importStyle: 'sass', //这里要配置成 sass 格式，要不然不起作用，因为在本工程中引入的styles/element/index.scss 文件是用 sass 编写的
                }
            ),
            // 自动注册图标组件
            IconsResolver({
                enabledCollections: ['ep']  //@iconify-json/ep 是 Element Plus 的图标库，所以 IconsResolver 配置了 enabledCollections: ['ep']
            })
        ],
        dirs: path.resolve(path.resolve(__dirname, '../../src'), 'components'),
        dts: path.resolve(path.resolve(__dirname, '../../src'), 'types', 'components.d.ts')
    });
};
