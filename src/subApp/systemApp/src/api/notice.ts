import request from "@/utils/request/request";

const NOTICE_BASE_URL = "/api/v1/notices";

const NoticeAPI = {
  /** 获取我的通知分页列表 */
  getMyNoticePage(queryParams?: NoticePageQuery) {
    return request<any, PageResult<NoticePageVO[]>>({
      url: `${NOTICE_BASE_URL}/my-page`,
      method: "get",
      params: queryParams,
    });
  },
};

export default NoticeAPI;

/** 通知公告分页查询参数 */
export interface NoticePageQuery extends PageQuery {
  /** 标题 */
  title?: string;
  /** 发布状态(0：未发布，1：已发布，-1：已撤回) */
  publishStatus?: number;

  isRead?: number;
}

/** 通知公告分页对象 */
export interface NoticePageVO {
  id: string;
  /** 通知标题 */
  title?: string;
  /** 通知内容 */
  content?: string;
  /** 通知类型 */
  type?: number;
  /** 发布人 */
  publisherId?: bigint;
  /** 优先级(0-低 1-中 2-高) */
  priority?: number;
  /** 目标类型(0-全体 1-指定) */
  targetType?: number;
  /** 发布状态(0-未发布 1已发布 2已撤回) */
  publishStatus?: number;
  /** 发布时间 */
  publishTime?: Date;
  /** 撤回时间 */
  revokeTime?: Date;
}
