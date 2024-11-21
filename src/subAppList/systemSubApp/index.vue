<template>
  <div class="user-subapp">
    <WujieVue
      width="100%"
      height="100%"
      name="systemSubApp"
      :url="serverUrl"
      :alive="false"
      :sync="true"
    />
  </div>
</template>

<script setup lang="ts">
const serverUrl = 'http://127.0.0.1:3003/'

</script>

<style></style>
