<template>
  <main class="app-container">
    <RouterView />
  </main>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<style scoped>
.app-container{
  height: 100%;
}
</style>
