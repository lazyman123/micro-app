import { createApp } from "vue";
import App from "./App.vue";
import setupPlugins from "@/plugins";

// 本地SVG图标
import "virtual:svg-icons-register";
// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";
import "animate.css";
// custom element dark css
import "@/styles/element-dark.scss";
// custom element css
import "@/styles/element.scss";
// CSS common style sheet
import "@/styles/common.scss";
// element plus
import ElementPlus from "element-plus";

import WujieVue from "wujie-vue3";
const { setupApp, preloadApp, bus } = WujieVue;
import { micros, getUrl } from "@/utils";
import router from "./router";
import lifecycles from "./wujie/lifecycles";

const app = createApp(App);
// 注册插件
app.use(ElementPlus).use(setupPlugins).use(WujieVue);
app.mount("#app");

const setMiro = () =>
  new Promise((resolve) => {
    for (const value of micros) {
      const obj: any = {
        path: `/${value.name}`,
        name: value.name,
        component: () => import(`@/subAppList/systemSubApp/index.vue`), //子应用使用同一个wujie配置
      };
    //   router.addRoute("home", obj);
      setupApp({
        name: value.name,
        url: getUrl(value.name, micros),
        exec: true,
        ...lifecycles,
      });
    }
    resolve(true);
  });

router.beforeEach(async (to, _from, next) => {
  if (router.getRoutes().length <= 3) {
    // 如果路由个数为基础路由，则说明没有进行路由和子应用添加，需要动态添加，添加完成，根据路由地址进行跳转
    await setMiro();
    next({
      path: to.path,
      query: { ...to.query },
    });
  } else {
    next();
  }
});
