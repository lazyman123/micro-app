<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="140px"
    >
      <el-form-item label="任务名称" prop="name">
        <el-input v-model="ruleForm.name" class="config-input" />
      </el-form-item>
      <el-form-item label="广告创建类型" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio
            v-for="item in AdvertisingCreateEnum"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告账户">
        <el-select v-model="ruleForm.zhanghu" class="config-input">
          <el-option label="广告账户1" value="shanghai" />
          <el-option label="广告账户2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="执行策略">
        <el-radio-group v-model="ruleForm.strategy">
          <el-radio
            v-for="item in StrategyEnum"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="dynamicForm">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import {
  AdvertisingCreateEnum,
  StrategyEnum,
} from "@/enums/AdvertisingConfigEnum";

import { ElMessage } from "element-plus";

const router = useRouter();

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  zhanghu: "",
  resource: "",
  strategy: "",
});

const rules = reactive<FormRules>({});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  router.push("/system/manager/advertisementConfig");

  // await formEl.validate((valid, fields) => {
  //   if (valid) {
  //     ElMessage.success("提交的数据为 : " + JSON.stringify(ruleForm));
  //   } else {
  //     console.log("error submit!", fields);
  //   }
  // });
};

const cancel = () => {
  router.push("/system/manager");
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
