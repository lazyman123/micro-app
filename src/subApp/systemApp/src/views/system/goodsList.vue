<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      class="pro-table"
      :data="GoodsData.data.list"
      :columns="columns"
      :init-param="initParam"
      :data-callback="dataCallback"
      @drag-sort="sortTable"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button
          v-auth="'add'"
          type="primary"
          :icon="CirclePlus"
          @click="toDetail"
          >创建投放任务</el-button
        >
        <!-- <el-button v-auth="'batchAdd'" type="primary" :icon="Upload" plain
          >批量添加用户</el-button
        >
        <el-button v-auth="'export'" type="primary" :icon="Download" plain
          >导出用户数据</el-button
        >
        <el-button type="primary" plain @click="toDetail"
          >To 子集详情页面</el-button
        > -->
        <!-- <el-button
          type="danger"
          :icon="Delete"
          plain
          :disabled="!scope.isSelected"
        >
          批量删除用户
        </el-button> -->
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
      <!-- <template #operation="scope">
        <el-button type="primary" link :icon="View">查看</el-button>
        <el-button type="primary" link :icon="EditPen">编辑</el-button>
      </template> -->
    </ProTable>
    <div class="footer">
      <div class="footer-box">
        <el-button class="right-cancel" @click="cancel"> 取消 </el-button>
        <el-button type="primary" class="right-next" @click="next">
          下一步
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx" name="useProTable">
defineOptions({
  name: "GoodsList",
  inheritAttrs: false,
});
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import ProTable from "@/layout/components/ProTable/index.vue";
import { GoodsEnum, ShopEnum } from "@/enums/GoodsEnum";
import {
  ProTableInstance,
  ColumnProps,
  HeaderRenderScope,
} from "@/layout/components/ProTable/interface";
import {
  CirclePlus,
  Delete,
  EditPen,
  View,
  Refresh,
} from "@element-plus/icons-vue";

import { GoodsData } from "@/json";

const router = useRouter();

// 跳转配置页
const toDetail = () => {
  router.push({ name: "AdvertisementConfig" });
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

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
// const { BUTTONS } = useAuthButtons();

// 自定义渲染表头（使用tsx语法）
// const headerRender = (scope: HeaderRenderScope<any>) => {
//   return (
//     <el-button
//       type="primary"
//       onClick={() => ElMessage.success("我是通过 tsx 语法渲染的表头")}
//     >
//       {scope.column.label}
//     </el-button>
//   );
// };

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
  { type: "selection", fixed: "left", width: 70 },
  {
    prop: "username",
    label: "所属店铺",
    enum: ShopEnum,
    search: { el: "select" },
    fieldNames: { label: "label", value: "value" },
  },
  {
    prop: "createTime",
    label: "商品创建时间",
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
    },
  },
  {
    prop: "gender",
    label: "投放状态",
    // 字典数据（本地数据）
    // enum: genderType,
    // 字典请求不带参数
    enum: GoodsEnum,
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "genderLabel", value: "genderValue" },
  },
  // {
  //   // 多级 prop
  //   prop: "user.detail.age",
  //   label: "年龄",
  //   search: {
  //     // 自定义 search 显示内容
  //     render: ({ searchParam }) => {
  //       return (
  //         <div class="flx-center">
  //           <el-input vModel_trim={searchParam.minAge} placeholder="最小年龄" />
  //           <span class="mr10 ml10">-</span>
  //           <el-input vModel_trim={searchParam.maxAge} placeholder="最大年龄" />
  //         </div>
  //       );
  //     },
  //   },
  // },
  {
    prop: "search",
    label: "搜索",
    isShow: false,
    search: { el: "input", tooltip: "我是搜索提示" },
  },
  // { prop: "operation", label: "操作", fixed: "right", width: 330 },
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

const cancel = () => {
  router.push("/system/taskList");
};

const next = () => {
  router.push("/system/advertisementConfig");
};

// // 删除用户信息
// const deleteAccount = async (params: User.ResUserList) => {
//   await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
//   proTable.value?.getTableList();
// };

// // 批量删除用户信息
// const batchDelete = async (id: string[]) => {
//   await useHandleData(deleteUser, { id }, "删除所选用户信息");
//   proTable.value?.clearSelection();
//   proTable.value?.getTableList();
// };

// // 重置用户密码
// const resetPass = async (params: User.ResUserList) => {
//   await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
//   proTable.value?.getTableList();
// };

// // 切换用户状态
// const changeStatus = async (row: User.ResUserList) => {
//   await useHandleData(changeUserStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】用户状态`);
//   proTable.value?.getTableList();
// };

// // 导出用户列表
// const downloadFile = async () => {
//   ElMessageBox.confirm("确认导出用户数据?", "温馨提示", { type: "warning" }).then(() =>
//     useDownload(exportUserInfo, "用户列表", proTable.value?.searchParam)
//   );
// };

// // 批量添加用户
// const dialogRef = ref<InstanceType<typeof ImportExcel> | null>(null);
// const batchAdd = () => {
//   const params = {
//     title: "用户",
//     tempApi: exportUserInfo,
//     importApi: BatchAddUser,
//     getTableList: proTable.value?.getTableList
//   };
//   dialogRef.value?.acceptParams(params);
// };

// // 打开 drawer(新增、查看、编辑)
// const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
// const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
//   const params = {
//     title,
//     isView: title === "查看",
//     row: { ...row },
//     api: title === "新增" ? addUser : title === "编辑" ? editUser : undefined,
//     getTableList: proTable.value?.getTableList
//   };
//   drawerRef.value?.acceptParams(params);
// };
</script>
<style scoped lang="scss">
@import "./index.scss";
.table-box,
:deep(.table-main) {
  height: calc(100% - 50px) !important;
}
</style>
