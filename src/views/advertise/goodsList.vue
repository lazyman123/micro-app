<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      class="pro-table"
      :request-api="getTableList"
      :columns="columns"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 商品 -->
      <template #product="scope">
        <div class="shop-box">
          <div class="shop-left">
            {{ scope.row.title }}
          </div>
          <img
            class="shop-right"
            :src="
              filterTableEnum(scope.row.variants?.nodes, scope.row.sku, 'sku')
            "
            alt=""
          />
        </div>
      </template>
      <!-- sku -->
      <template #sku="scope">
        <el-select
          ref="select"
          v-if="scope.row['variants']['nodes'][options.skuIndex]"
          v-model="scope.row.sku"
          :placeholder="t('Common.PleaseSelect')"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="(item, index) in cloneDeep(
              options.skuData[scope.$index]['variants']?.nodes
            )"
            :key="item?.sku"
            :label="item?.sku"
            :value="item?.sku"
            @click.native="changeSku(index, scope.row, scope.$index)"
          />
        </el-select>
      </template>
      <!-- createTime -->
      <template #createdAt="scope">
        {{ convertTime(scope.row.createdAt) }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="EditPen" @click="edit(scope.row)"
          >编辑</el-button
        >
      </template>
    </ProTable>
    <div class="footer">
      <div class="footer-box">
        <el-button class="right-cancel" @click="cancel"> {{ t("Common.Cancel") }} </el-button>
        <el-button
          type="primary"
          :disabled="!proTable?.isSelected"
          class="right-next"
          @click="next"
        >
          {{ t("Common.NextStep") }}
        </el-button>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="商品配置"
      align-center
      width="35%"
    >
      <ProTable class="pro-table" :data="tableData" :columns="columnsSku">
        <!-- Expand -->
        <template #expand="scope">
          {{ scope.row }}
        </template>
        <!-- 商品 -->
        <template #product="scope">
          {{ scope.row.title }}
        </template>
        <!-- 图片 -->
        <template #image="scope">
          <div class="shop-box">
            <img
              class="shop-right"
              :src="scope.row.media.nodes[0]?.image.url"
              alt=""
            />
          </div>
        </template>
        <!-- sku -->
        <template #sku="scope">
          {{ scope.row.sku }}
        </template>
      </ProTable>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="tsx" name="useProTable">
defineOptions({
  name: "GoodsList",
  inheritAttrs: false,
});
import ProductAPI from "@/api/product";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import ProTable from "@/layout/components/ProTable/index.vue";
import { GoodsEnum } from "@/enums/GoodsEnum";
import { convertTime, filterTableEnum } from "@/utils";
import {
  ProTableInstance,
  ColumnProps,
} from "@/layout/components/ProTable/interface";
import { EditPen } from "@element-plus/icons-vue";
import { useRouterParamsStore } from "@/store";
import { cloneDeep } from "lodash-es";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ limit: 10 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  options.value.skuData = cloneDeep(data.data);
  for (let i = 0; i < data.data.length!; i++) {
    options.value.skuData[i]["sku"] =
      data.data[i]["variants"]["nodes"][0]["sku"];
  }
  return {
    data: { data: [...options.value.skuData] },
    start: data.start,
    end: data.end,
    count: data.count,
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
const getTableList = (params: any = initParam) => {
  const { shop, from, to, limit, backward, cursor } = params;
  const newParams = { shop, from, to, limit, backward, cursor };
  return ProductAPI.getProductList(newParams);
};

// 店铺列表
const getShopList = () => {
  return ProductAPI.getShopList();
};

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  { type: "index", label: "#", width: 60 },
  {
    prop: "product",
    label: t("AdConfig.Commodity"),
  },
  {
    prop: "shop",
    label: t("AdConfig.ShopName"),
    enum: ProductAPI.getShopList,
    isShow: false,
    search: {
      el: "select",
      props: { filterable: true },
      defaultValue: "felix-doo",
    },
    fieldNames: { label: "shopName", value: "shopName" },
  },
  {
    prop: "sku",
    label: "SKU",
    fieldNames: { label: "genderLabel", value: "genderValue" },
  },
  {
    prop: "createdAt",
    label: t("AdConfig.ProductCreationTime"),
    search: {
      el: "date-picker",
      span: 1,
      props: {
        type: "datetimerange",
        valueFormat: "YYYY-MM-DDTHH:mm:ssZ",
        onChange: (e: any) => {
          initParam.from = e[0];
          initParam.to = e[1];
        },
      },
      defaultValue: [
        convertTime(
          new Date().getTime() -
            7 * 24 * 60 * 60 * 1000 +
            new Date().getTimezoneOffset() * 60 * 1000,
          "default",
          new Date().getTimezoneOffset()
        ),
        convertTime(
          new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000,
          "default",
          new Date().getTimezoneOffset()
        ),
      ],
    },
  },
  {
    prop: "recorded",
    label: t("AdConfig.DeliveryStatus"),
    // 字典请求不带参数
    enum: GoodsEnum,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "genderLabel", value: "genderValue" },
  },
  {
    prop: "search",
    label: t("Common.Search"),
    isShow: false,
    search: { el: "input", tooltip: "我是搜索提示" },
  },
  // { prop: "operation", label: "操作", fixed: "right", width: 330 },
]);

// 商品配置参数
// 默认sku第一项
const options = ref({
  skuData: [],
  skuIndex: 0,
});

// change sku
const changeSku = (event, row, index) => {
  row.sku = row["variants"]["nodes"][event].sku;
};

const cancel = () => {
  router.push("/system/taskList");
};

const next = () => {
  useRouterParamsStore().changeRouterParams({
    list: proTable.value?.selectedList,
    shopData: {
      shopName: "felix-doo",
      shopUrl: "https://felix-doo.myshopify.com",
    },
  });
  router.push({
    name: "AdvertisementConfig",
    params: { adAccountId: route.params.adAccountId },
  });
};

// 编辑
const dialogVisible = ref(false);
const tableData = ref([]);
// 表格配置项
const columnsSku = reactive<ColumnProps<any>[]>([
  { type: "radio", fixed: "left", width: 70 },
  {
    prop: "sku",
    label: "sku",
  },
  {
    prop: "product",
    label: "名称",
  },
  {
    prop: "image",
    label: "图片",
  },
]);

const edit = (row: any) => {
  dialogVisible.value = true;
  tableData.value = row.variants?.nodes;
};

const confirm = () => {
  dialogVisible.value = false;
};

onMounted(() => {
  // shopList.value = getShopList() as any;
});
</script>
<style scoped lang="scss">
@import "./index.scss";
.table-box,
:deep(.table-main) {
  height: calc(100% - 50px) !important;
}
.shop-box {
  .shop-left {
  }
  .shop-right {
    width: 100px;
    height: 120px;
  }
}
</style>
