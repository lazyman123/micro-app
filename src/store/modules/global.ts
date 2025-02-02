import { defineStore } from "pinia";
import type { GlobalState } from "@/store/interface";
import piniaPersistConfig from "@/store/helper/persist";

type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];
export const useGlobalStore = defineStore({
  id: "global",
  // 修改默认值之后，需清除 localStorage 数据
  state: (): GlobalState => ({
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: "vertical",
    // element 组件大小
    assemblySize: "default",
    // 当前系统语言
    language: null,
    // 当前页面是否全屏
    primary: "#409eff",
    maximize: false,
    // 深色模式
    isDark: false,
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 侧边栏反转
    asideInverted: false,
    // 头部反转
    headerInverted: false,
    // 折叠菜单
    isCollapse: false,
    // 菜单手风琴
    accordion: true,
    // 页面水印
    watermark: false,
    // 面包屑导航
    breadcrumbVisible: true,
    // 面包屑导航图标
    breadcrumbIcon: true,
    // 标签页
    tabs: true,
    // 标签页持久化
    storeTabs: true,
    // 标签页图标
    tabsIcon: true,
    // 页脚
    footer: true,
    tabsNavCacheKey: "__VUE_ADMIN__tabsNav",
    cacheDynamicRoutesKey: "__VUE_ADMIN__dynamic_routes",
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    },
  },
  persist: piniaPersistConfig("global"),
});
