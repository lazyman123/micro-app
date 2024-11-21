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
 // 路由表初始化配置类型
  type RouterConfigRaw = Omit<RouteRecordRaw, "meta" | "component" | "children"> & {
    meta?: MetaProp;
    component?: string | RouteComponent | (() => Promise<RouteComponent>);
    children?: RouterConfigRaw[];
  };

  /**
   * 分页查询参数
   */
  interface PageQuery {
    pageNum: number;
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
  }
}

type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

export {};
