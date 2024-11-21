<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      :data="TaskData.data.list"
      :columns="columns"
      :init-param="initParam"
      :data-callback="dataCallback"
      @drag-sort="sortTable"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button v-auth="'add'" type="primary" :icon="CirclePlus" @click="add"
          >新建</el-button
        >
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        <el-button
          type="primary"
          link
          @click="ElMessage.success('我是通过作用域插槽渲染的内容')"
        >
          {{ scope.row.createTime }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link>立即执行</el-button>
      </template>
    </ProTable>
  </div>

  <el-dialog
    v-model="centerDialogVisible"
    title="任务配置"
    align-center
    width="35%"
  >
    <taskDialog />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="toDetail"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import ProTable from "@/layout/components/ProTable/index.vue";
import taskDialog from "@/views/system/taskConfig.vue";
import {
  ProTableInstance,
  ColumnProps,
} from "@/layout/components/ProTable/interface";
import { CirclePlus } from "@element-plus/icons-vue";

import { AdvertisingCreateEnum, TaskEnum } from "@/enums/AdvertisingConfigEnum";

import { TaskData } from "@/json";

const router = useRouter();

const centerDialogVisible = ref(false); // 对话框显示状态

// 新建
const add = () => {
  centerDialogVisible.value = true;
};

// 跳转配置页
const toDetail = () => {
  //   centerDialogVisible.value = false;
  router.push("/system/goodsList");
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  // return getUserList(newParams);
};

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
  {
    prop: "taskname",
    label: "任务名称",
  },
  {
    prop: "createTime",
    label: "创建时间",
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
    },
  },
  {
    prop: "doneTime",
    label: "执行时间",
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
    },
  },
  {
    prop: "createType",
    label: "广告创建类型",
    enum: AdvertisingCreateEnum,
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "label", value: "value" },
  },
  {
    prop: "zhanghu",
    label: "广告账户",
  },
  {
    prop: "gender",
    label: "任务状态",
    enum: TaskEnum,
    search: { el: "select", props: { filterable: true } },
  },
  { prop: "operation", label: "操作", fixed: "right", width: 130 },
]);

// 表格拖拽排序
const sortTable = ({
  newIndex,
  oldIndex,
}: {
  newIndex?: number;
  oldIndex?: number;
}) => {
  console.log(newIndex, oldIndex);
  console.log(proTable.value?.tableData);
  ElMessage.success("修改列表排序成功");
};
</script>
