import { useI18n } from "vue-i18n";
import settings from "@/settings";
import { transformI18n } from "@/languages";
import { isFunction, isString } from "@/utils";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export const useLayout = () => {
  const { t } = useI18n();

  /**
   * @description 是否为移动端
   * @returns boolean：true 是，false 不是
   */
  const isMobile = () => {
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < 767; // 这里以 ipad Mini 的宽度为移动端的阈值
  };

  /**
   * @description 获取页面标题、侧边菜单、面包屑、tabsNav 展示的 title
   * @param route 当前路由
   * @param start 是否从头开始解析出 title，因为路由在编译阶段已经解析了一部分，所以涉及路由里的配置不需要从头开始解析，具体看 ./useRoutes.ts 的 processRouteMeta 函数
   * @returns 路由的 title
   */
  const getTitle = (route: RouteLocationNormalizedLoaded | RouterConfigRaw, start = false) => {
    if (start) return getLayoutTitle(route);
    // 虽然 handleFunctionTitle 函数内部会对 title 是否是函数进行判断，但是因为 title 是函数的场景相比较小，所以这里先判断，减少往下执行的性能消耗
    if (route.meta?.title && !isFunction(route.meta.title)) return route.meta.title + "";
    const { title, titleIsFunction } = handleFunctionTitle(route);
    if (titleIsFunction) return handleI18nTitle(route.name as string | undefined, title, true, route.meta?.useI18n);
    return title;
  };

  /**
   * @description 完整获取页面标题、侧边菜单、面包屑、tabsNav 展示的 title
   * @param route 当前路由
   * @returns 路由的 title
   */
  const getLayoutTitle = (route: RouteLocationNormalizedLoaded | RouterConfigRaw) => {
    const name = route.name as string | undefined;
    if (!route.meta?.title && !route.meta?.useI18n) return name || "no-name";
    const { title, titleIsFunction } = handleFunctionTitle(route);
    const t = title || name || "no-name";
    return handleI18nTitle(name, t, titleIsFunction, route.meta?.useI18n);
  };

  /**
   * @description 获取 i18n 转换后的文字
   * @param name 路由的 name
   * @param title 需要展示的 title
   * @param titleIsFunction 路由 meta 里的 title 是否是函数
   * @returns i18n 转换后的文字
   */
  const handleI18nTitle = (name: string | undefined, title: string, titleIsFunction = false, useI18n = false) => {
    const { routeUseI18n: useI18nSetting } = settings;
    if (!useI18nSetting || !useI18n) return title;
    // 处理 {{ }}，如 title 为 "{{ _route.Home }}"，则说明 _route.Home 需要 i18n 转化
    if (isString(title) && title.includes("{{") && title.includes("}}") && useI18nSetting) {
      return title.replace(/({{[\s\S]+?}})/, (m: any, str: string) =>
        str.replace(/{{([\s\S]*)}}/, (m: any, _: string) => t(_.trim()))
      );
    }
    // 转换多语言后，如果还是 _route.${route.name}，代表没有配置多语言，则直接返回 name
    if (!titleIsFunction && name) return t(`_route.${name}`) === `_route.${name}` ? name : t(`_route.${name}`);
    return title;
  };

  /**
   * @description 处理路由的 title，因为 title 支持函数格式，所以这里解析出函数的返回值
   * @param route 当前路由
   * @returns
   */
  function handleFunctionTitle(route: RouteLocationNormalizedLoaded | RouterConfigRaw) {
    const meta = { ...(route.meta as Meta) }; // 取消 meta 响应式
    const title = meta?.title || "";
    if (title && isFunction(title)) {
      return { title: title({ ...route } as RouteLocationNormalizedLoaded), titleIsFunction: true };
    }
    return { title: title + "", titleIsFunction: false };
  }

  /**
   * @description 通过路由表获取菜单列表
   * @param loadRolesRoutes 权限路由
   * @returns 菜单列表
   */
  const getMenuListByRouter = (loadRolesRoutes: RouterConfig[]) => {
    const menusList: RouterConfig[] = [];
    loadRolesRoutes.forEach(route => {
      // 如果配置了 hideInMenu: true，则跳过该路由
      if (route.meta?.hideInMenu) return;
      // 如果只有一个子路由且 alwaysShowRoot 为 false | undefined，则子路由成为一级菜单
      if (route.children?.length === 1 && !route.meta?.alwaysShowRoot) {
        const children = getMenuListByRouter(route.children);
        children.length && menusList.push(children[0]);
      } else {
        // 否则，生成子菜单列表
        const children = getMenuListByRouter(route.children || []);
        if (children.length) route.children = children;
        menusList.push(route);
      }
    });
    return menusList;
  };
  return {
    isMobile,
    getTitle,
    getLayoutTitle,
    getMenuListByRouter,
  };
};

/**
 * 非 setup 使用
 */
export const useLayoutNoSetup = () => {
  /**
   * @description 获取页面标题、侧边菜单、面包屑、tabsNav 展示的 title，不处理为函数的 title
   * @param route 当前路由
   * @returns 路由的 title
   */
  const getLayoutTitle = (route: RouteLocationNormalizedLoaded | RouterConfigRaw) => {
    // 不处理为函数的 title
    if (isFunction(route.meta?.title)) return route.meta.title;
    const name = route.name as string | undefined;
    if (!route.meta?.title && !route.meta?.useI18n) return name || "no-name";
    const title = route.meta?.title || name || "no-name";
    return handleI18nTitle(name, title + "", route.meta?.useI18n);
  };

  /**
   * @description 获取 i18n 转换后的文字
   * @param name 路由的 name
   * @param title 需要展示的 title
   * @param titleIsFunction 路由 meta 里的 title 是否是函数
   * @returns i18n 转换后的文字
   */
  const handleI18nTitle = (name: string | undefined, title: string, useI18n = false) => {
    const { routeUseI18n: useI18nSetting } = settings;
    if (!useI18nSetting || !useI18n) return title;
    // 处理 {{ }}，如 title 为 "{{ _route.Home }}"，则说明 _route.Home 需要 i18n 转化
    if (isString(title) && title.includes("{{") && title.includes("}}") && useI18nSetting) {
      return title.replace(/({{[\s\S]+?}})/, (m: any, str: string) =>
        str.replace(/{{([\s\S]*)}}/, (m: any, _: string) => transformI18n(_.trim()))
      );
    }
    // 转换多语言后，如果还是 _route.${route.name}，代表没有配置多语言，则直接返回 name
    if (name) {
      return transformI18n(`_route.${name}`) === `_route.${name}` ? name : transformI18n(`_route.${name}`);
    }
    return title;
  };

  return {
    getLayoutTitle,
    handleI18nTitle,
  };
};
