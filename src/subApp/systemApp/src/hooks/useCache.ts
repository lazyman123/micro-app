import { useStorage } from "@/hooks/useStorage";
import { useGlobalStore } from "@/store/modules/global";

export const useCache = () => {
  const { getStorage, setStorage, removeStorage } = useStorage("localStorage");

  // 标签页的 tabsNav 缓存
  const tabsNavKey = useGlobalStore().tabsNavCacheKey;
  const getCacheTabNavList = () => getStorage(tabsNavKey);
  const setCacheTabNavList = (tabsNavList: TagView[]) => setStorage(tabsNavKey, tabsNavList);
  const removeCacheTabNavList = () => removeStorage(tabsNavKey);

  // 标签页的 tabsNav 缓存
  const dynamicRoutesKey = useGlobalStore().cacheDynamicRoutesKey;
  const getCacheDynamicRoutesKey = () => getStorage(dynamicRoutesKey);
  const setCacheDynamicRoutesKey = (dynamicRoutes: RouterConfigRaw[]) => setStorage(dynamicRoutesKey, dynamicRoutes);
  const removeCacheDynamicRoutesKey = () => removeStorage(dynamicRoutesKey);


  return {
    getCacheTabNavList,
    setCacheTabNavList,
    removeCacheTabNavList,
    getCacheDynamicRoutesKey,
    setCacheDynamicRoutesKey,
    removeCacheDynamicRoutesKey,
  };
};
