export const useRouterParamsStore = defineStore("routerParams", () => {
  // 路由参数
  const routerParams = useStorage<object>(
    "routerParam",
    {}
  );

  function changeRouterParams(val: any) {
    routerParams.value = val;
  }


  return {
    routerParams,
    changeRouterParams
  };
});
