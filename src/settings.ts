import { ThemeEnum } from "./enums/ThemeEnum";

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
  storeTabs: true,
  cacheKeyPrefix: "__VUE_ADMIN__",
  tabsNavCacheKey: `__VUE_ADMIN__tabsNav`,
  cacheDynamicRoutesKey: `__VUE_ADMIN__dynamic_routes`,
};

const defaultSettings: AppSettings = {
  ...(settings as AppSettings),
};

export default defaultSettings;
