<template>
  <el-drawer v-model="settingsVisible" size="300" title="项目配置">
    <el-divider
      ><el-icon class="mr-1 config-icon"><ColdDrink /></el-icon
      >主题设置</el-divider
    >

    <div class="flex-center">
      <el-switch
        v-model="isDark"
        active-icon="Moon"
        inactive-icon="Sunny"
        @change="changeTheme"
      />
    </div>

    <el-divider
      ><el-icon class="mr-1 config-icon"><Setting /></el-icon
      >界面设置</el-divider
    >

    <div class="setting-item">
      <span class="text-sm">主题颜色</span>
      <ThemeColorPicker
        v-model="settingsStore.themeColor"
        @update:model-value="changeThemeColor"
      />
    </div>
    <div class="setting-item">
      <span class="text-sm">显示标签栏</span>
      <el-switch v-model="settingsStore.tabs" />
    </div>
    <div class="setting-item">
      <span class="text-sm">显示面包屑</span>
      <el-switch v-model="settingsStore.breadcrumbVisible" />
    </div>
    <div class="setting-item">
      <span class="text-sm">持久化标签页</span>
      <el-switch v-model="settingsStore.storeTabs" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store";
import { ThemeEnum } from "@/enums/ThemeEnum";

const settingsStore = useSettingsStore();

const settingsVisible = computed({
  get() {
    return settingsStore.settingsVisible;
  },
  set() {
    settingsStore.settingsVisible = false;
  },
});

/** 切换主题颜色 */
function changeThemeColor(color: string) {
  settingsStore.changeThemeColor(color);
}

/** 切换主题 */
const isDark = ref<boolean>(settingsStore.theme === ThemeEnum.DARK);
const changeTheme = (val: any) => {
  isDark.value = val;
  settingsStore.changeTheme(isDark.value ? ThemeEnum.DARK : ThemeEnum.LIGHT);
};
</script>

<style lang="scss" scoped>
.setting-item {
  @apply py-1 flex-x-between;
}
</style>
