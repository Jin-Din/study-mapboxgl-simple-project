<template>
  <a-config-provider :theme="themeStyle" :locale="zhCN">
    <el-config-provider namespace="ep">
      <div id="container" class="root-container">
        <router-view />
      </div>
    </el-config-provider>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";

import { theme } from "ant-design-vue";
import autofit from "@libs/autofit";
import { getUrl } from "@/utils/url";
import { useDebounceFn, useWindowSize } from "@vueuse/core";
/*import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  dayjs.locale('zh-cn');*/

//定义andt主题
const themeStyle = ref({
  algorithm: theme.darkAlgorithm,
  token: {
    // "colorBgLayout":"#52C41A",
    colorBgContainer: "rgba(31,31,31,0.6)",
    colorBorder: "#7e7e7e",
    colorPrimaryBg: "transparent",
    colorPrimary: "#52C41A",
  },
});

onMounted(async () => {
  //方法一:使用autofit 自适应大屏, 效果不好
  // autofit.init({
  //   dw: 4096,
  //   dh: 1097,
  //   el: "#app",
  //
  //   ignore:[],
  //   resize: true
  // })
});

onBeforeUnmount(() => {
  // autofit.off()
});
</script>
<style>
.root-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
