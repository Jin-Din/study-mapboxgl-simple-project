import { createWebHistory, createWebHashHistory, createRouter, RouteOption } from "vue-router";

// 公共路由
export const constantRoutes: RouteOption[] = [
  {
    path: "/",
    hidden: true,
    component: () => import("@/views/index.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/map/index.vue"),
  },
  //
  {
    path: "/redirect",
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error/401.vue"),
    hidden: true,
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_CONTEXT_PATH),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
