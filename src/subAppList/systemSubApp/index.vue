<template>
  <div class="user-subapp">
    <WujieVue
      width="100%"
      height="100%"
      name="SystemSubApp"
      :url="serverUrl"
      :alive="false"
      :sync="true"
    />
  </div>
</template>

<script setup lang="ts">
const serverUrl = 'http://127.0.0.1:3000/'

</script>

<style></style>
