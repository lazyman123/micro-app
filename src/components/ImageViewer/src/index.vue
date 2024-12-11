<template>
  <ElConfigProvider :size="layoutSize">
    <ElImageViewer v-if="visible" v-bind="bindValue" @close="close" />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElImageViewer, ElConfigProvider } from "element-plus";
import { useDesign } from "@/hooks/useDesign";
import { useLayoutStore } from "@/store/modules/layout";

defineOptions({ name: "ImageViewer" });

const { variables } = useDesign();
// :namespace="variables.elNamespace"
export interface ImageViewerProps {
  urlList?: string[];
  zIndex?: number;
  initialIndex?: number;
  infinite?: boolean;
  hideOnClickModal?: boolean;
  teleported?: boolean;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<ImageViewerProps>(), {
  urlList: (): string[] => [],
  zIndex: 2000,
  initialIndex: 0,
  infinite: true,
  hideOnClickModal: false,
  teleported: false,
  modelValue: false,
});

const bindValue = computed(() => {
  const propsData: Record<string, any> = { ...props };
  delete propsData.visible;
  delete propsData.modelValue;
  delete propsData.modelModifiers;
  return propsData;
});

const layoutSize = computed(() => useLayoutStore().layoutSize);

const visible = defineModel({ default: false });

const close = () => {
  visible.value = false;
};
</script>
