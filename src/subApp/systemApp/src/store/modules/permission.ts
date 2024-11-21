import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { store } from "@/store";
// import MenuAPI, { type RouteVO } from "@/api/menu";
import type { RouteVO } from "@/api/menu";

const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

import router from "@/router";

export const usePermissionStore = defineStore("permission", () => {
  /** 所有路由，包括静态和动态路由 */
  const routes = ref<RouteRecordRaw[]>([]);

  const isRoutesLoaded = ref(false);

  /**
   * 生成动态路由
   */
  function generateRoutes() {
    routes.value = constantRoutes;

    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      routes.value = constantRoutes;
      isRoutesLoaded.value = true;
      resolve(constantRoutes);
    });

    // return new Promise<RouteRecordRaw[]>((resolve, reject) => {
    //   MenuAPI.getRoutes()
    //     .then((data) => {
    //       const dynamicRoutes = transformRoutes(data);
    //       // routes.value = constantRoutes.concat(dynamicRoutes);
    //       routes.value = constantRoutes;
    //       isRoutesLoaded.value = true;
    //       resolve(dynamicRoutes);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }

  /**
   * 重置路由
   */
  const resetRouter = () => {
    // 删除动态路由，保留静态路由
    routes.value.forEach((route) => {
      if (route.name && !constantRoutes.find((r) => r.name === route.name)) {
        router.removeRoute(route.name); // 从 router 实例中移除动态路由
      }
    });

    routes.value = [];
    isRoutesLoaded.value = false;
  };

  return {
    routes,
    generateRoutes,
    isRoutesLoaded,
    resetRouter,
  };
});

/**
 * 转换路由数据为组件
 */
const transformRoutes = (routes: RouteVO[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmpRoute = { ...route } as RouteRecordRaw;
    // 顶级目录，替换为 Layout 组件
    if (tmpRoute.component?.toString() == "Layout") {
      tmpRoute.component = Layout;
    } else {
      // 其他菜单，根据组件路径动态加载组件
      const component = modules[`../../views/${tmpRoute.component}.vue`];
      if (component) {
        tmpRoute.component = component;
      } else {
        tmpRoute.component = modules["../../views/error-page/404.vue"];
      }
    }

    if (tmpRoute.children) {
      tmpRoute.children = transformRoutes(route.children);
    }

    asyncRoutes.push(tmpRoute);
  });

  return asyncRoutes;
};

/**
 * 在组件外使用 Pinia store 实例
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
