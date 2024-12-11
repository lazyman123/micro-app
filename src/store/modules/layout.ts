import { defineStore } from "pinia";
import { type LayoutSizeType } from "../interface";
import defaultSettings from "@/settings";

export const useLayoutStore = defineStore(
  "layoutStore",
  () => {
    const layoutSize = ref<LayoutSizeType>(defaultSettings.layoutSize);
    
    const setLayoutSize = (layoutSizeParam: LayoutSizeType) => {
      layoutSize.value = layoutSizeParam;
    };

    return {
      layoutSize,
      setLayoutSize,
    };
  },
  {
    persist: {
      paths: ["layoutSize"],
    },
  }
);
