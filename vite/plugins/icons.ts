import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default () => {
  return Icons({
    // 自动安装图标库
    //自动按需安装使用iconify 图标
    autoInstall: true
  });
};
