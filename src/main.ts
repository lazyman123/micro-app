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

// 正式环境引入版本更新提示
import.meta.env.VITE_LOAD_UPDATE === "true" ? import('./auto-update') : null;
const app = createApp(App);
app.config.warnHandler = () => null
// 注册插件
app.use(ElementPlus).use(setupPlugins);
app.mount("#app");
