import { ThemeEnum } from "./enums/ThemeEnum";
import { LanguageEnum } from "./enums/LanguageEnum";

// 检查用户的操作系统是否使用深色模式
const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

const settings: AppSettings = {
  // 是否显示设置
  showSettings: true,
  // 主题，根据操作系统的色彩方案自动选择
  theme: mediaQueryList.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT,
  // 主题颜色
  themeColor: "#4080FF",
  tabs: true,
  breadcrumbVisible: true,
  storeTabs: false,
  cacheKeyPrefix: "__VUE_ADMIN__",
  tabsNavCacheKey: `__VUE_ADMIN__tabsNav`,
  cacheDynamicRoutesKey: `__VUE_ADMIN__dynamic_routes`,
  layoutSize: "default",
  language: LanguageEnum.ZH_CN,
  routeUseI18n: true,
  menuWidth: 218, // 菜单宽度
};

const defaultSettings: AppSettings = {
  ...(settings as AppSettings),
};

export default defaultSettings;
