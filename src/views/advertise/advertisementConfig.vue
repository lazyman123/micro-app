<template>
  <div class="card content-box">
    <el-card style="width: 100%" class="config-card">
      <div class="form-header">{{ t("AdConfig.Campaign.Configuration") }}</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item :label="t('AdConfig.Campaign.Name')" prop="name">
          <el-input v-model="ruleForm.campaign.name" class="config-input" />
        </el-form-item>
        <el-form-item :label="t('AdConfig.Campaign.BuyingType')" prop="resource">
          <el-select
            v-model="ruleForm.campaign.buying_type"
            class="config-input"
          >
            <el-option
              v-for="item in PurchaseTypeEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('AdConfig.Campaign.Objective')" prop="target">
          <el-select v-model="ruleForm.campaign.objective" class="config-input">
            <el-option
              v-for="item in TargetEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('AdConfig.Campaign.Budget')">
          <el-input
            v-model="ruleForm.campaign.daily_budget"
            :placeholder="t('Common.PleaseEnter')"
            style="width: 400px"
          >
            <template #prepend>
              <el-select v-model="ruleForm.budget" style="width: 180px">
                <el-option
                  v-for="item in BudgetEnum"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
            <template #append>
              <span>USD</span>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="width: 100%" class="config-card">
      <div class="form-header">{{ t("AdConfig.AdGroup.Configuration") }}</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item :label="t('AdConfig.AdGroup.Name')" prop="groupName">
          <el-input v-model="ruleForm.adSet.name" class="config-input" />
        </el-form-item>
        <el-form-item :label="t('AdConfig.AdGroup.OutcomeGoals')" prop="objective">
          <el-select
            v-model="ruleForm.adSet.performance_goal"
            class="config-input"
          >
            <el-option
              v-for="item in PerformanceObjectiveEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('AdConfig.AdGroup.LocationTransformation')" prop="location">
          <el-select
            v-model="ruleForm.adSet.conversion_location"
            class="config-input"
          >
            <el-option
              v-for="item in LocationOccursEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('AdConfig.AdGroup.ConversionEvent')" prop="event">
          <el-select
            v-model="ruleForm.adSet.conversion_event"
            class="config-input"
          >
            <el-option
              v-for="item in ConvertEventEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('AdConfig.AdGroup.PixelCode')" prop="pixel">
          <el-select
            v-model="ruleForm.adSet.pixel_id"
            class="config-input"
            @change="changePixel"
          >
            <el-option
              v-for="item in PixelCodeData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('AdConfig.AdGroup.StartTime')" prop="adSet.start_time">
          <el-date-picker
            v-model="ruleForm.adSet.start_time"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="MMM DD, YYYY"
            time-format="HH:mm"
            value-format="YYYY-MM-DDTHH:mm:ssZ"
            :disabled-date="disabledDate"
          />
          <el-checkbox v-model="endTimeVisible" class="left-12"
            >{{ t("AdConfig.AdGroup.SetEndDate") }}</el-checkbox
          >
        </el-form-item>
        <el-form-item
          :label="t('AdConfig.AdGroup.EndTime')"
          prop="adSet.end_time"
          v-if="endTimeVisible"
        >
          <el-date-picker
            v-model="ruleForm.adSet.end_time"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="MMM DD, YYYY"
            time-format="HH:mm"
            value-format="YYYY-MM-DDTHH:mm:ssZ"
            :disabled-date="disabledDate"
          />
        </el-form-item>
        <el-form-item :label="t('AdConfig.AdGroup.AudienceRegion')">
          <el-tree-select
            v-model="ruleForm.adSet.targeting.geo_locations.countries"
            :data="Area"
            multiple
            :render-after-expand="false"
            :props="{ label: 'label', children: 'children' }"
            :collapse-tags="true"
            show-checkbox
            class="config-input"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="width: 100%" class="config-card">
      <div class="form-header">{{ t("AdConfig.Ad.Configuration") }}</div>
      <el-form
        ref="ruleFormRefs"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item :label="t('AdConfig.Ad.Name')" prop="name">
          <el-input v-model="ruleForm.adTemplate.name" class="config-input" />
        </el-form-item>
        <el-form-item :label="t('AdConfig.Ad.Title')" prop="biaoti">
          <el-input v-model="ruleForm.adTemplate.title" class="config-input" />
        </el-form-item>
        <el-form-item :label="t('AdConfig.Ad.Text')" prop="zhengwen">
          <el-input
            v-model="ruleForm.adTemplate.body"
            type="textarea"
            class="config-input"
          />
        </el-form-item>
        <el-form-item :label="t('AdConfig.Ad.Description')">
          <el-input
            v-model="ruleForm.adTemplate.description"
            class="config-input"
          />
        </el-form-item>
        <el-form-item :label="t('AdConfig.Ad.CallToAction')" prop="active">
          <el-select
            v-model="ruleForm.adTemplate.call_to_action"
            class="config-input"
          >
            <el-option
              v-for="item in ActionEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('AdConfig.Ad.FacebookCommonPage')" prop="resource">
          <el-select
            v-model="ruleForm.adTemplate.page_id"
            class="config-input"
            @change="changePage"
          >
            <el-option
              v-for="item in pageData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('AdConfig.Ad.ProductSeries')" prop="name">
          <el-input v-model="ruleForm.collectionName" class="config-input" />
        </el-form-item>
        <el-form-item :label="t('AdConfig.Ad.MaterialList')" prop="sucai" class="sucai">
          <template v-for="value in ruleForm.product">
            <div class="sucai-box">
              <el-select v-model="value.sku" style="width: 140px">
                <el-option
                  v-for="(item, index) in value['variants']['nodes']"
                  :key="item.sku"
                  :label="item.sku"
                  :value="item.sku"
                  @click.native="changeSku(index, value)"
                />
              </el-select>
              <img
                class="config-img"
                :src="
                  filterTableEnum(value['variants']['nodes'], value.sku, 'sku')
                "
              />
            </div>
          </template>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="footer">
      <div class="footer-box">
        <el-button class="right-cancel" @click="cancel"> {{ t("Common.Cancel") }} </el-button>
        <el-button class="right-prev" type="primary" plain @click="previous">
          {{ t("Common.Previous") }}
        </el-button>
        <el-button type="primary" class="right-next" @click="submitForm">
          {{ t("Common.Submit") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dynamicForm">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import {
  PurchaseTypeEnum,
  TargetEnum,
  PerformanceObjectiveEnum,
  LocationOccursEnum,
  ConvertEventEnum,
  ActionEnum,
  BudgetEnum,
} from "@/enums/AdvertisingConfigEnum";
import { Area } from "@/json/area";
import { convertTime } from "@/utils/index";
import { useRouterParamsStore } from "@/store";
import ProductAPI from "@/api/product";
import { filterTableEnum } from "@/utils";
import { cloneDeep } from "lodash-es";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const route = useRoute();
const { routerParams } = useRouterParamsStore();

const ruleForm = reactive({
  adAccountId: route.params.adAccountId,
  collectionName: "",
  shopUrl: routerParams["shopData"]["shopUrl"],
  shopName: routerParams["shopData"]["shopName"],
  budget: 1,
  campaign: {
    name: `Campaigns-${convertTime(new Date(), "YYYYMMDD")}-xcsdsla`,
    objective: "OUTCOME_SALES",
    buying_type: "AUCTION",
    daily_budget: 1,
  },
  adSet: {
    name: `AdSet-${convertTime(new Date(), "YYYYMMDD")}-oidsodsve`,
    performance_goal: "MAX_COUNT",
    conversion_location: "WEBSITE",
    conversion_event: "PURCHASE",
    pixel_id: "713042737078427",
    start_time: "",
    end_time: null,
    targeting: {
      geo_locations: {
        countries: ["US"],
      },
    },
  },
  adTemplate: {
    name: `Ad-${convertTime(new Date(), "YYYYMMDD")}-$sku$`,
    title:
      "“I have the funny t-Shirt & Get so Many Compliments while wearing it!! ”☺️",
    body: "“I have the funny t-Shirt & Get so Many Compliments while wearing it!! ”☺️",
    description:
      "“I have the funny t-Shirt & Get so Many Compliments while wearing it!! ”☺️",
    call_to_action: "SHOP_NOW",
    page_id: "105172722510116",
  },
  product: routerParams?.list,
});

const rules = reactive<FormRules>({
  "adSet.start_time": [
    { required: true, message: t("AdConfig.AdGroup.PleaseSelectStartTime"), trigger: "blur" },
  ],
  "adSet.end_time": [
    { required: true, message: t("AdConfig.AdGroup.PleaseSelectEndTime"), trigger: "blur" },
  ],
});

// 商品配置参数
// 默认sku第一项
const options = ref({
  skuData: [],
  skuIndex: 0,
});

const disabledDate = (time: Date) => {
  return Date.now() - 3600 * 1000 * 24 > time.getTime();
}

const previous = () => {
  router.push({
    name: "GoodsList",
    params: { adAccountId: "3466064363639753" },
  });
};

const submitForm = async () => {
  if (!ruleFormRef) return;
  await ruleFormRef.value?.validate((valid: boolean, fields) => {
    if (!valid) {
      return false;
    } else {
      ElMessageBox.confirm(t("AdConfig.HintTip"), t("Common.Hint"), {
        type: "warning",
      })
        .then(() => {
          ruleForm.campaign.daily_budget = ruleForm.campaign.daily_budget * 100;
          let temp = cloneDeep(ruleForm);
          temp.products = [];
          for (let i = 0; i < ruleForm.product.length; i++) {
            temp["products"].push({
              id: ruleForm.product[i]["id"],
              handle: ruleForm.product[i]["handle"],
              previewImageUrl:
                ruleForm.product[i]["media"]["nodes"][0]["preview"]["image"][
                  "url"
                ],
              imageUrl:
                ruleForm.product[i]["media"]["nodes"][0]["image"]["url"],
              varId:
                ruleForm.product[i]["variants"]["nodes"][
                  options.value.skuIndex
                ]["id"],
              varSku:
                ruleForm.product[i]["variants"]["nodes"][
                  options.value.skuIndex
                ]["sku"],
              varPreviewImageUrl:
                ruleForm.product[i]["variants"]["nodes"][
                  options.value.skuIndex
                ]["media"]["nodes"][0]["preview"]["image"]["url"],
              varImageUrl:
                ruleForm.product[i]["variants"]["nodes"][
                  options.value.skuIndex
                ]["media"]["nodes"][0]["image"]["url"],
            });
          }
          delete temp.product;
          let data = {
            name: `test-task-${new Date().getTime()}`,
            creator: "zhouzhengang@zhuoda.work",
            status: 0,
            adDeliveries: [temp],
          };
          ProductAPI.setAdConfig(data)
            .then((res) => {
              ElMessage({
                type: "success",
                message: t("Common.SubmitSuccessfully"),
              });
              router.push("/system/taskList");
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  });
};

// 设置结束日期
const endTimeVisible = ref(false);

// change sku
const changeSku = (event, row) => {
  ruleForm.sku = row["variants"]["nodes"][event].sku;
  options.value.skuIndex = event;
};

// change pixel
const changePixel = (event) => {
  ruleForm.adSet.pixel_id = event;
};

// change page
const changePage = (event) => {
  ruleForm.adTemplate.page_id = event;
};

const cancel = () => {
  router.push("/system/taskList");
};

// facebook公共主页列表
const pageData = ref([]);
const PixelCodeData = ref([]);
const handlePageQuery = () => {
  ProductAPI.getPageList({ adAccountId: route.params.adAccountId }).then(
    (data) => {
      pageData.value = data.data;
    }
  );
};
const handlePixelQuery = () => {
  ProductAPI.getPixelList({ adAccountId: route.params.adAccountId }).then(
    (data) => {
      PixelCodeData.value = data.data;
    }
  );
};

onMounted(() => {
  // ruleForm.sku = ruleForm.products[0]['variants']['nodes'][0].sku;
  for (let i = 0; i < ruleForm.product.length; i++) {
    ruleForm.product[i]["sku"] =
      ruleForm.product[i]["variants"]["nodes"][0]["sku"];
  }
  handlePixelQuery();
  handlePageQuery();
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
