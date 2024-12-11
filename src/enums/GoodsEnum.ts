import i18n from "@/languages/index";
const { t } = i18n.global;
/**
 * 投放状态枚举
 */
export const GoodsEnum = [
  {
    genderLabel: t("AdConfig.Delivered"),
    genderValue: true,
  },
  {
    genderLabel: t("AdConfig.NotDelivery"),
    genderValue: false,
  },
];

/**
 * 所属店铺枚举
 */
export const ShopEnum = [
  {
    label: "lacemylife",
    value: 1,
  },
  {
    label: "felix",
    value: 2,
  },
];

/**
 * 所属店铺枚举
 */
export const SkuEnum = [
  {
    label: "12342342343423",
    value: 1,
  },
  {
    label: "23423434523455",
    value: 2,
  },
];
