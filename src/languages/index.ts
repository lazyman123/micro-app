import type { App } from "vue";
import { createI18n } from "vue-i18n";
import { useAppStoreHook } from "@/store/modules/app";
// 本地语言包
import enLocale from "./modules/en";
import zhCnLocale from "./modules/zh-cn";

const appStore = useAppStoreHook();

const messages = {
  "zh-cn": {
    ...zhCnLocale,
  },
  en: {
    ...enLocale,
  },
};

/**
 * 根据指定的 I18n 前缀返回对应的内容
 * @param prefix I18n 前缀
 */
function siphonI18n(prefix = "zh-CN") {
  return Object.fromEntries(
    // key 表示文件名，value 表示模块的默认导出，所以文件名在这里统一是 zh-CN.yml 和 en-US.yml
    Object.entries(import.meta.glob("./modules/*.ts", { eager: true })).map(([key, value]: any) => {
      // 数组的第一个元素是文件名，第二个元素是内容
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  )[prefix];
}

/**
 * 自定义的国际化转换函数，等价于 $t 或 t
 * 在其他 .ts 文件使用国际化，则使用该函数转换，因为 useI18n 必须在 setup 中使用
 * @param message message
 * @returns 转化后的 message
 */
export function transformI18n(message: any = ""): string {
  if (!message) return "";

  // 处理存储动态路由的 title，格式 { zh: "", en: "" }
  if (typeof message === "object") {
    const locale: string | WritableComputedRef<string> | any = i18n.global.locale;
    return message[locale?.value];
  }
  const key = message.match(/(\S*)\./)?.[1];
  if (key && Object.keys(siphonI18n("zh-CN")).includes(key)) {
    return i18n.global.t.call(i18n.global.locale, message, message, message);
  } else if (!key && Object.keys(siphonI18n("zh-CN")).includes(message)) {
    // 兼容非嵌套形式的国际化写法
    return i18n.global.t.call(i18n.global.locale, message, message, message);
  } else {
    return message;
  }
}

const i18n = createI18n({
  legacy: false,
  locale: appStore.language,
  messages: messages,
  globalInjection: true, // 全局注入 $t
});

// 全局注册 i18n
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}

export default i18n;
