<template>
  <div class="container">
    <el-button
      type="primary"
      v-for="(route, index) in constantRoutes.filter((route) => route.hidden !== true)"
      :key="route.name"
      @click="handleClick(route)"
      >{{ route.name }}</el-button
    >
  </div>
</template>

<script setup lang="ts">
//@名称:
//@作者:
//@日期:
//@说明:
import { ref } from "vue";

import { constantRoutes } from "@/router";
import { RouteRecordRaw } from "vue-router";
import router from "@/router";

const handleClick = (route: RouteRecordRaw) => {
  //   console.log("clicked");
  router.push(route);
};
</script>

<style scoped>
.container {
  display: flex;
  margin: 10px;
}
</style>
