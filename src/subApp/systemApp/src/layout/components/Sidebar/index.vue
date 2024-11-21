<template>
  <div :class="{ 'has-logo': true }">
    <!-- 左侧和顶部布局的Sidebar -->
    <SidebarLogo :collapse="!appStore.sidebar.opened" />
    <el-scrollbar>
      <SidebarMenu :menu-list="permissionStore.routes" base-path="" />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, usePermissionStore } from "@/store";

const appStore = useAppStore();
const permissionStore = usePermissionStore();
</script>

<style lang="scss" scoped>
.has-logo {
  .el-scrollbar {
    height: calc(100vh - $navbar-height);
  }
}
</style>
