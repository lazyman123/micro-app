<template>
  <div class="logo-container">
    <transition enter-active-class="animate__animated animate__fadeInLeft">
      <router-link :key="+collapse" class="wh-full flex-center" to="/">
        <img :src="logo" class="logo-image" />
        <span v-if="!collapse" class="logo-title"> 运营管理平台 </span>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import logo from "@/assets/logo.png";

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.logo-container {
  width: 100%;
  height: $navbar-height;
  background-color: $sidebar-logo-background;

  .logo-image {
    width: 60px;
    height: 60px;
    position: absolute;
    left: -5px;
    top: 1px;
  }

  .logo-title {
    flex-shrink: 0;
    /* 防止容器在空间不足时缩小 */
    font-size: 14px;
    font-weight: bold;
    color: white;
  }
}

.layout-top,
.layout-mix {
  .logo-container {
    width: $sidebar-width;
  }

  &.hideSidebar {
    .logo-container {
      width: $sidebar-width-collapsed;
    }
  }
}
</style>
