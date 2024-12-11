<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :request-api="getTableList"
      :columns="columns"
      :init-param="initParam"
      :type="'default'"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="add"
          >{{ t("AdConfig.Add") }}</el-button
        >
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        {{ convertTime(scope.row.createTime) }}
      </template>
      <!-- 执行时间 -->
      <template #donetime="scope">
        <span v-if="scope.row.startTime">{{
          scope.row.startTime &&
          convertTime(scope.row.startTime) + " ~ " + scope.row.endTime &&
          convertTime(scope.row.endTime)
        }}</span>
        <span v-else>--</span>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          v-if="scope.row.status === TaskStatusEnum.TODO"
          type="primary"
          link
          @click="execute(scope.row)"
          >{{ t("AdConfig.ExecuteImmediately") }}</el-button
        >
        <span v-else>NA</span>
      </template>
    </ProTable>
  </div>

  <el-dialog
    v-model="centerDialogVisible"
    :title="t('AdConfig.TaskConfig')"
    align-center
    width="35%"
  >
    <taskDialog />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">{{ t("Common.Cancel") }}</el-button>
        <el-button type="primary" @click="toDetail"> {{ t("Common.Confirm") }} </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="tsx" name="useProTable">
import ProductAPI from "@/api/product";
import ProTable from "@/layout/components/ProTable/index.vue";
import taskDialog from "@/views/advertise/taskConfig.vue";
import {
  ProTableInstance,
  ColumnProps,
} from "@/layout/components/ProTable/interface";
import { CirclePlus } from "@element-plus/icons-vue";
import { convertTime } from "@/utils";
import {
  AdvertisingCreateEnum,
  TaskEnum,
  TaskStatusEnum,
} from "@/enums/AdvertisingConfigEnum";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/store";

const appStore = useAppStore();
const { t } = useI18n();
const router = useRouter();
const centerDialogVisible = ref(false); // 对话框显示状态

// 新建
const add = () => {
  centerDialogVisible.value = true;
};

// 跳转配置页
const toDetail = () => {
  centerDialogVisible.value = false;
  router.push({name: "GoodsList", params: { adAccountId: "3466064363639753" }});
};

// 立即执行
const execute = (row: any) => {
  console.log(row, "row");
  let data = {
    taskId: row.id,
    immediate: true,
    executeTime: null,
    status: 0,
    options: {},
    taskCreateTime: row.createTime,
    operatorName: row.id,
  }
  ProductAPI.setExcute(data)
    .then((res) => {
      ElMessage({
        type: "success",
        message: t("AdConfig.ExecutionSuccess"),
      });
      proTable.value?.search();
    })
    .catch(() => {});
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({});

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any = initParam) => {
  return ProductAPI.getTaskList(params);
};

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
  {
    prop: "name",
    label: t("AdConfig.TaskName"),
  },
  {
    prop: "creator",
    label: t("AdConfig.Creator"),
  },
  {
    prop: "createTime",
    label: t("AdConfig.CreateTime"),
  },
  {
    prop: "donetime",
    label: t("AdConfig.DoneTime"),
  },
  {
    prop: "createType",
    label: t("AdConfig.AdType"),
    enum: AdvertisingCreateEnum,
    isShow: false,
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "label", value: "value" },
  },
  {
    prop: "zhanghu",
    label: t("AdConfig.AdAccount"),
    isShow: false,
  },
  {
    prop: "status",
    label: t("AdConfig.TaskStatus"),
    enum: TaskEnum,
    search: { el: "select", props: { filterable: true } },
  },
  { prop: "operation", label: t("AdConfig.Operation"), fixed: "right", width: appStore.language === "zh-cn" ? 130 : 200 },
]);

onMounted(() => {});
</script>
