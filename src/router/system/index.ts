import type { RouteRecordRaw } from "vue-router";
export const Layout = () => import("@/layout/index.vue");

export const systemRoutes: RouteRecordRaw[] = [
  {
    path: "/system",
    component: Layout,
    name: "SystemManagement",
    meta: {
      title: "SystemManagement",
      icon: "system",
      hidden: true,
      alwaysShow: true,
      params: null,
    },
    redirect: "/system/departmentManagement",
    children: [
      {
        path: "departmentManagement",
        component: () => import("@/views/system/departmentManagement/index.vue"),
        name: "DepartmentManagement",
        meta: {
          title: "DepartmentManagement",
          activeMenu: "/system/departmentManagement",
          icon: "link",
          hidden: false,
          alwaysShow: false,
          keepAlive: false,
          params: null,
        },
      },
    ],
  },
];
