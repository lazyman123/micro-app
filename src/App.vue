<template>
  <el-config-provider :locale="locale" size="default">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
const { locale } = useAppStore();
</script>

<style scoped></style>
