import type { App } from "vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

export const Layout = () => import("@/layout/index.vue");
export const internalDoc = () => import("@/views/doc/internal-doc.vue");
import { systemRoutes } from "./system";
// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  {
    path: "/",
    name: "/",
    component: Layout,
    children: [
      // {
      //   path: "homepage",
      //   component: () => import("@/views/home/index.vue"),
      //   // 用于 keep-alive 功能，需要与 SFC 中自动推导或显式声明的组件名称一致
      //   // 参考文档: https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
      //   name: "HomePage",
      //   meta: {
      //     title: "首页",
      //     icon: "homepage",
      //     affix: true,
      //     keepAlive: true,
      //   },
      // },
      {
        path: "404",
        component: () => import("@/views/error/404.vue"),
        meta: { hidden: true },
      },
    ],
  },
  ...systemRoutes,
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
