import request from "@/utils/request/request";

const USER_BASE_URL = "/api/shopify/admin";

const ProductAPI = {
  /**
   * 获取商品列表
   *
   * @returns
   */
  getShopList() {
    return request<any, any>({
      url: `${USER_BASE_URL}/shops`,
      method: "get",
    });
  },
  /**
   * 获取商品列表
   *
   * @returns
   */
  getProductList(queryParams: any) {
    return request<any, any>({
      url: `${USER_BASE_URL}/${queryParams.shop}/products`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取商品投放状态
   *
   * @returns
   */
  getProductStatus(queryParams: any) {
    return request<any, any>({
      url: `/api/ad/records`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取任务列表
   *
   * @returns
   */
  getTaskList(queryParams: any) {
    return request<any, any>({
      url: `/api/ad/tasks`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取像素代码列表
   *
   * @returns
   */
  getPixelList(queryParams: any) {
    return request<any, any>({
      url: `/api/facebook/ads/act/${queryParams.adAccountId}/adpixels`,
      method: "get",
    });
  },

  /**
   * 获取公共主页列表
   *
   * @returns
   */
  getPageList(queryParams: any) {
    return request<any, any>({
      url: `/api/facebook/ads/act/${queryParams.adAccountId}/promote_pages`,
      method: "get",
    });
  },

  /**
   * 开始执行任务
   *
   * @returns
   */
  setExcute(params: any) {
    const { taskId } = params;
    return request<any, any>({
      url: `/api/ad/tasks/${taskId}/execute`,
      method: "post",
      data: params,
    });
  },

  /**
   * 设置广告配置
   *
   * @returns
   */
  setAdConfig(params: any) {
    return request<any, any>({
      url: `/api/ad/tasks`,
      method: "post",
      data: params,
    });
  },
};

export default ProductAPI;
