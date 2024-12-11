<template>
  <el-drawer v-model="settingsVisible" size="300" :title="t('Settings.Project')">
    <el-divider
      ><el-icon class="mr-1 config-icon"><ColdDrink /></el-icon
      >{{ t("Settings.Theme") }}</el-divider
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
      >{{ t("Settings.Interface") }}</el-divider
    >

    <div class="setting-item">
      <span class="text-sm">{{ t("Settings.ThemeColor") }}</span>
      <ThemeColorPicker
        v-model="settingsStore.themeColor"
        @update:model-value="changeThemeColor"
      />
    </div>
    <div class="setting-item">
      <span class="text-sm">{{ t("Settings.ShowBradcrumb") }}</span>
      <el-switch v-model="settingsStore.breadcrumbVisible" />
    </div>
    <div class="setting-item">
      <span class="text-sm">{{ t("Settings.ShowTabsView") }}</span>
      <el-switch v-model="settingsStore.tabs" />
    </div>
    <div class="setting-item">
      <span class="text-sm">{{ t("Settings.PersistTabs") }}</span>
      <el-switch v-model="settingsStore.storeTabs" />
    </div>
    <div>
      <span style="font-size: 14px">{{ $t("Settings.menuWidth") }}</span>
      <el-slider v-model="settingsStore.menuWidth" :min="100" :max="400" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store";
import { ThemeEnum } from "@/enums/ThemeEnum";
import { useI18n } from "vue-i18n";
import { getPx, setStyleVar } from "@/utils/theme";

const { t } = useI18n();

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

watchEffect(() => setStyleVar("--aside-width", getPx(settingsStore.menuWidth)));

</script>

<style lang="scss" scoped>
.setting-item {
  @apply py-1 flex-x-between;
}
</style>
