<template>
  <div class="card content-box">
    <el-card style="width: 100%" class="config-card">
      <div class="form-header">广告系列配置</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" class="config-input" />
        </el-form-item>
        <el-form-item label="购买类型" prop="resource">
          <el-select v-model="ruleForm.resource" class="config-input">
            <el-option
              v-for="item in PurchaseTypeEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="目标" prop="target">
          <el-select v-model="ruleForm.target" class="config-input">
            <el-option
              v-for="item in TargetEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="width: 100%" class="config-card">
      <div class="form-header">广告组配置</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="名称" prop="groupName">
          <el-input v-model="ruleForm.groupName" class="config-input" />
        </el-form-item>
        <el-form-item label="成效目标" prop="objective">
          <el-select v-model="ruleForm.objective" class="config-input">
            <el-option
              v-for="item in PerformanceObjectiveEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="转化发生位置" prop="location">
          <el-select v-model="ruleForm.location" class="config-input">
            <el-option
              v-for="item in LocationOccursEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="转化事件" prop="event">
          <el-select v-model="ruleForm.event" class="config-input">
            <el-option
              v-for="item in ConvertEventEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Pixel像素代码" prop="pixel">
          <el-select v-model="ruleForm.pixel" class="config-input">
            <el-option
              v-for="item in PixelCodeEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="ruleForm.usd"
            placeholder="请输入"
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
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="ruleForm.date1"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="MMM DD, YYYY"
            time-format="HH:mm"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="ruleForm.date2"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            date-format="MMM DD, YYYY"
            time-format="HH:mm"
          />
        </el-form-item>
        <el-form-item label="受众地区">
          <el-tree-select
            v-model="ruleForm.area"
            :data="AreaData"
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
      <div class="form-header">广告配置</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
      >
        <el-form-item label="名称模版" prop="name">
          <el-input v-model="ruleForm.name" class="config-input" />
        </el-form-item>
        <el-form-item label="标题" prop="biaoti">
          <el-input v-model="ruleForm.biaoti" class="config-input" />
        </el-form-item>
        <el-form-item label="正文" prop="zhengwen">
          <el-input
            v-model="ruleForm.zhengwen"
            type="textarea"
            class="config-input"
          />
        </el-form-item>
        <el-form-item label="行动号召" prop="active">
          <el-select v-model="ruleForm.active" class="config-input">
            <el-option
              v-for="item in ActionEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Facebook公共主页" prop="resource">
          <el-select v-model="ruleForm.commonpage" class="config-input">
            <el-option
              v-for="item in CommonPageEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="广告素材列表" prop="sucai" class="sucai">
          <template v-for="(value, id) in ruleForm.sucaiData" :key="id">
            <div class="sucai-box">
              <el-select v-model="ruleForm[id]" style="width: 140px">
                <el-option
                  v-for="item in value.sucai"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <img class="config-img" :src="logo" />
            </div>
          </template>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="footer">
      <div class="footer-box">
        <el-button class="right-cancel" @click="cancel"> 取消 </el-button>
        <el-button class="right-prev" type="primary" plain @click="previous">
          上一步
        </el-button>
        <el-button
          type="primary"
          class="right-next"
          @click="submitForm(ruleFormRef)"
        >
          提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dynamicForm">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
const logo = ref(
  "https://files.axshare.com/gsc/XHQVDA/a6/94/70/a694703488194e8eb862e7ae176c5aae/images/创建流程/u82.jpg?pageId=ac80beb9-43ac-4060-9fae-93aab6b8c38f"
);

import {
  PurchaseTypeEnum,
  TargetEnum,
  PerformanceObjectiveEnum,
  LocationOccursEnum,
  ConvertEventEnum,
  PixelCodeEnum,
  ActionEnum,
  CommonPageEnum,
  BudgetEnum,
} from "@/enums/AdvertisingConfigEnum";
import { AreaData } from "@/json";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const ruleForm = reactive({
  name: "",
  region: 1,
  date1: "",
  date2: "",
  budget: 1,
  usd: "",
  delivery: false,
  resource: 1,
  target: 1,
  groupName: "",
  objective: 1,
  location: 1,
  event: 1,
  pixel: 1,
  biaoti: "",
  zhengwen: "",
  active: 1,
  commonpage: 1,
  area: ["1"],
  sucaiData: [
    {
      id: 1,
      sucai: [
        {
          img: logo,
          label: 1,
          value: 1,
        },
        {
          img: logo,
          label: 12222255555,
          value: 8,
        },
      ],
    },
    {
      id: 2,
      sucai: [
        {
          img: logo,
          label: 122222222,
          value: 2,
        },
      ],
    },
    {
      id: 3,
      sucai: [
        {
          img: logo,
          label: 133,
          value: 3,
        },
      ],
    },
    {
      id: 4,
      sucai: [
        {
          img: logo,
          label: 221,
          value: 4,
        },
      ],
    },
    {
      id: 5,
      sucai: [
        {
          img: logo,
          label: 12333,
          value: 5,
        },
      ],
    },
  ],
});

const rules = reactive<FormRules>({});

const previous = () => {
  router.push("/system/goodsList");
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  ElMessageBox.confirm("确定提交广告配置?", "提交", {
    type: "warning",
  })
    .then(() => {
      console.log(ruleForm);
      ElMessage({
        type: "success",
        message: "提交成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "error",
        message: "提交失败",
      });
    });
  // await formEl.validate((valid, fields) => {
  //   if (valid) {
  //     ElMessage.success("提交的数据为 : " + JSON.stringify(ruleForm));
  //   } else {
  //     console.log("error submit!", fields);
  //   }
  // });
};

const cancel = () => {
  router.push("/system/taskList");
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
