import i18n from "@/languages/index";
const { t } = i18n.global;
/**
 * 购买类型
 */
export const PurchaseTypeEnum = [
  {
    label: t("AdConfig.Campaign.Auction"),
    value: "AUCTION",
  },
  {
    label: t("AdConfig.Campaign.Reserve"),
    value: 2,
  },
];

/**
 * 广告创建类型
 */
export const AdvertisingCreateEnum = [
  {
    label: t("AdConfig.Advancemental"),
    value: 1,
  },
  {
    label: t("AdConfig.Manual"),
    value: 2,
  },
];

/**
 * 执行策略
 */
export const StrategyEnum = [
  {
    label: t("AdConfig.ExecuteImmediately"),
    value: 1,
  },
  {
    label: t("AdConfig.ExecuteLater"),
    value: 2,
  },
  {
    label: t("AdConfig.ExecuteReservation"),
    value: 3,
  },
];

/**
 * 任务状态
 */
export const TaskEnum = [
  {
    label: t("AdConfig.NotExecuted"),
    value: 0,
  },
  {
    label: t("AdConfig.Executing"),
    value: 1,
  },
  {
    label: t("AdConfig.Executed"),
    value: 2,
  },
];

/**
 * 目标
 */
export const TargetEnum = [
  {
    label: t("AdConfig.Campaign.Sales"),
    value: "OUTCOME_SALES",
  },
  {
    label: t("AdConfig.Campaign.Popularity"),
    value: 2,
  },
];

/**
 * 成效目标
 */
export const PerformanceObjectiveEnum = [
  {
    label: t("AdConfig.AdGroup.Optimization"),
    value: "MAX_COUNT",
  },
  {
    label: t("AdConfig.AdGroup.OptimizationValue"),
    value: "jiazhi",
  },
];
/**
 * 转化发生位置
 */
export const LocationOccursEnum = [
  {
    label: t("AdConfig.AdGroup.Website"),
    value: "WEBSITE",
  },
];

/**
 * 转化事件
 */
export const ConvertEventEnum = [
  {
    label: t("AdConfig.AdGroup.Shopping"),
    value: "PURCHASE",
  },
];

/**
 * Pixel像素代码
 */
export const PixelCodeEnum = [
  {
    label: "lace-01",
    value: 1,
  },
  {
    label: "lace-02",
    value: 2,
  },
];

/**
 * 预算
 */
export const BudgetEnum = [
  {
    label: t("AdConfig.Campaign.DailyBudget"),
    value: 1,
  },
  {
    label: t("AdConfig.Campaign.TotalBudget"),
    value: 2,
  },
];

/**
 * 行动号召
 */
export const ActionEnum = [
  {
    label: t("AdConfig.Ad.GoToShop"),
    value: "SHOP_NOW",
  },
];

/**
 * Facebook公共主页
 */
export const CommonPageEnum = [
  {
    label: "lacemylife",
    value: "105172722510116",
  },
];

/**
 * 任务状态
 */
export const TaskStatusEnum = {
  'TODO': 0,
  'DOING': 1,
  'DONE': 2,
};
