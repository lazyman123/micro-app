export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

export type AssemblySizeType = "large" | "default" | "small";

export type LanguageType = "zh" | "en" | null;

export type LayoutSizeType = "default" | "small" | "large";

/* GlobalState */
export interface GlobalState {
  layout: LayoutType;
  assemblySize: AssemblySizeType;
  language: LanguageType;
  maximize: boolean;
  primary: string;
  isDark: boolean;
  isGrey: boolean;
  isWeak: boolean;
  asideInverted: boolean;
  headerInverted: boolean;
  isCollapse: boolean;
  accordion: boolean;
  watermark: boolean;
  breadcrumbVisible: boolean; // 是否显示面包屑
  breadcrumbIcon: boolean; // 面包屑图标
  tabs: boolean;  // 是否开启标签页
  storeTabs: boolean; // 是否持久化开启标签页
  tabsIcon: boolean; // 标签页图标
  footer: boolean; // 是否显示页脚
  tabsNavCacheKey: string; // 缓存标签页的 key
  cacheDynamicRoutesKey: string; // 缓存动态路由的 key
  layoutSize: LayoutSizeType;
}

/* UserState */
export interface UserState {
  token: string;
  userInfo: { name: string };
}

/* tabsMenuProps */
export interface TabsMenuProps {
  icon: string;
  title: string;
  path: string;
  name: string;
  close: boolean;
  isKeepAlive: boolean;
}

/* TabsState */
export interface TabsState {
  tabsMenuList: TabsMenuProps[];
}

/* KeepAliveState */
export interface KeepAliveState {
  keepAliveName: string[];
}
