import type { RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

export const advertiseRoutes: RouteRecordRaw[] = [
  {
    path: "/advertise",
    component: Layout,
    name: "Advertise",
    meta: {
      title: "AdManagement",
      icon: "document",
      hidden: false,
      alwaysShow: true,
      params: null,
    },
    redirect: "/advertise/taskList",
    children: [
      {
        path: "taskList",
        component: () => import("@/views/advertise/index.vue"),
        name: "TaskList",
        meta: {
          title: "TaskList",
          activeMenu: "/advertise/taskList",
          icon: "link",
          hidden: false,
          alwaysShow: false,
          keepAlive: false,
          params: null,
        },
      },
      {
        path: "subApp",
        component: () => import("@/subAppList/systemSubApp/index.vue"),
        name: "SubApp",
        meta: {
          title: "子应用",
          icon: "link",
          hidden: false,
          alwaysShow: false,
          keepAlive: false,
          params: null,
        },
      },
      {
        path: "goodsList/:adAccountId",
        component: () => import("@/views/advertise/goodsList.vue"),
        name: "GoodsList",
        meta: {
          title: "GoodsList",
          hidden: true,
          alwaysShow: false,
          activeMenu: "/advertise/taskList",
          params: null,
          keepAlive: false,
          breadcrumb: true,
        },
      },
      {
        path: "advertisementConfig/:adAccountId",
        component: () => import("@/views/advertise/advertisementConfig.vue"),
        name: "AdvertisementConfig",
        meta: {
          title: "AdConfig",
          hidden: true,
          alwaysShow: false,
          activeMenu: "/advertise/taskList",
          keepAlive: true,
          params: null,
          breadcrumb: true,
        },
      },
    ],
  },
];
