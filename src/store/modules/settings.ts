import defaultSettings from "@/settings";
import { ThemeEnum } from "@/enums/ThemeEnum";
import { generateThemeColors, applyTheme, toggleDarkMode } from "@/utils/theme";

export const useSettingsStore = defineStore("setting", () => {
  // 基本设置
  const settingsVisible = ref(false);
  // 主题
  const themeColor = useStorage<string>(
    "themeColor",
    defaultSettings.themeColor
  );
  const theme = useStorage<string>("theme", defaultSettings.theme);
  const tabs = useStorage<boolean>("tabs", defaultSettings.tabs);
  const breadcrumbVisible = useStorage<boolean>("breadcrumbVisible", defaultSettings.breadcrumbVisible);
  const storeTabs = useStorage<boolean>("storeTabs", defaultSettings.storeTabs);
  const menuWidth = useStorage<number>("menuWidth", defaultSettings.menuWidth);

  // 监听主题变化
  watch(
    [theme, themeColor],
    ([newTheme, newThemeColor]) => {
      toggleDarkMode(newTheme === ThemeEnum.DARK);
      const colors = generateThemeColors(newThemeColor);
      applyTheme(colors);
    },
    { immediate: true }
  );

  function changeTheme(val: string) {
    theme.value = val;
  }

  function changeThemeColor(color: string) {
    themeColor.value = color;
  }

  return {
    settingsVisible,
    themeColor,
    theme,
    tabs,
    breadcrumbVisible,
    storeTabs,
    menuWidth,
    changeTheme,
    changeThemeColor,
  };
});
