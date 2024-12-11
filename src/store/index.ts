import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

// 全局注册 store
export function setupStore(app: App<Element>) {
  app.use(store);
}

export * from "./modules/permission";
export * from "./modules/user";
export * from "./modules/tagsView";
export * from "./modules/app";
export * from "./modules/settings";
export * from "./modules/global";
export * from "./modules/router";
export * from "./modules/layout";
export { store };
