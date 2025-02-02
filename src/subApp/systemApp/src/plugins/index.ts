import type { App } from "vue";

import { setupStore } from "@/store";
import { setupRouter } from "@/router";
import { setupElIcons } from "./icons";
import { setupPermission } from "./permission";
export default {
  install(app: App<Element>) {
    // 状态管理(store)
    setupStore(app);
    // 路由(router)
    setupRouter(app);
    // Element-plus图标
    setupElIcons(app);
    // 路由守卫
    setupPermission();
  },
};
