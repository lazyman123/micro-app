type MetaNeedKey = "_fullPath" | "_dynamic";
declare global {
  /**
   * 页签对象
   */
  interface TagView {
    /** 页签名称 */
    name: string;
    /** 页签标题 */
    title: string;
    /** 页签路由路径 */
    path: string;
    /** 页签路由完整路径 */
    fullPath: string;
    /** 页签图标 */
    icon?: string;
    /** 是否固定页签 */
    affix?: boolean;
    /** 是否开启缓存 */
    keepAlive?: boolean;
    /** 路由查询参数 */
    query?: any;
  }
  interface Meta {
    /** 【目录】只有一个子路由是否始终显示 */
    alwaysShow?: boolean;
    /** 是否隐藏(true-是 false-否) */
    hidden?: boolean;
    /** ICON */
    icon?: string;
    /** 【菜单】是否开启页面缓存 */
    keepAlive?: boolean;
    /** 路由title */
    title?: string;
    /** 高亮菜单 */
    activeMenu?: string;
    useI18n?: boolean; // 是否开启 i18n，默认读取全局的 routeUseI18n（src/config/settings.ts）
    isByMainApp?: boolean; // 是否是主应用启动
  }
 // 路由表初始化配置类型
  type RouterConfigRaw = Omit<RouteRecordRaw, "meta" | "component" | "children"> & {
    meta?: Meta;
    component?: string | RouteComponent | (() => Promise<RouteComponent>);
    children?: RouterConfigRaw[];
  };

  // 路由表加工后的类型
  type RouterConfig = Omit<RouterConfigRaw, "meta" | "children"> & {
    meta: RequiredKey<Meta, MetaNeedKey>;
    children?: RouterConfig[];
  };

  /**
   * 分页查询参数
   */
  interface PageQuery {
    pageNumber: number;
    pageSize: number;
  }
  /**
   * 分页响应对象
   */
  interface PageResult<T> {
    /** 数据列表 */
    list: T;
    /** 总数 */
    total: number;
  }
  /**
   * 系统设置
   */
  interface AppSettings {
    /** 是否显示设置 */
    showSettings: boolean;
    /** 主题颜色 */
    themeColor: string;
    /** 主题模式(dark|light) */
    theme: string;
    /** 是否显示标签页 */
    tabs: boolean;
    /** 是否持久化标签页 */
    storeTabs: boolean;
    /** 是否显示面包屑 */
    breadcrumbVisible: boolean;
    /** 缓存路由的 key 前缀 */
    cacheKeyPrefix: string;
    /** 页签缓存的 key 前缀 */
    tabsNavCacheKey: string;
    /** 动态路由缓存的 key 前缀 */
    cacheDynamicRoutesKey: string;
    layoutSize: LayoutSizeType;
     // 国际化
    language: string;
    routeUseI18n: boolean; // 「路由」布局是否使用国际化，默认为 false，如果不使用，则需要在路由中给需要在菜单中展示的路由设置 meta: {title: 'xxx'} 用来在菜单中显示文字
    menuWidth: number; // 菜单宽度
  }
}

type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

/**
   * 下拉选项数据类型
   */
interface OptionType {
  /** 值 */
  value: string | number;
  /** 文本 */
  label: string;
  /** 子列表  */
  children?: OptionType[];
}

export {};
