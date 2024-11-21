import type { RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

export const systemRoutes: RouteRecordRaw[] = [
  {
    path: "/system",
    component: Layout,
    name: "System",
    meta: {
      title: "广告管理",
      icon: "document",
      hidden: false,
      alwaysShow: true,
      params: null,
    },
    redirect: "/system/taskList",
    children: [
      {
        path: "taskList",
        component: () => import("@/views/system/index.vue"),
        name: "TaskList",
        meta: {
          title: "任务列表",
          activeMenu: "/system/taskList",
          icon: "link",
          hidden: false,
          alwaysShow: false,
          keepAlive: false,
          params: null,
        },
      },
      {
        path: "goodsList",
        component: () => import("@/views/system/goodsList.vue"),
        name: "GoodsList",
        meta: {
          title: "商品列表",
          hidden: true,
          alwaysShow: false,
          activeMenu: "/system/taskList",
          params: null,
          keepAlive: false,
          breadcrumb: true,
        },
      },
      {
        path: "advertisementConfig",
        component: () => import("@/views/system/advertisementConfig.vue"),
        name: "AdvertisementConfig",
        meta: {
          title: "广告配置",
          hidden: true,
          alwaysShow: false,
          activeMenu: "/system/taskList",
          keepAlive: true,
          params: null,
          breadcrumb: true,
        },
      },
    ],
  },
];
