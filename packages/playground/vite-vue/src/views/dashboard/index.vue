<template>
  <div class="container">
    {{ log }}
  </div>
</template>

<script setup lang="ts">
import yLimit from "yuguaa-limit";
import { ref } from "vue";
const log = ref();
const asyncFun = (value: any, delay: any) =>
  new Promise((resolve) => {
    log.value = value;
    console.log('🛑yuguaa: ~ newPromise ~ value', value)
    setTimeout(() => resolve(value), delay);
  });

const limit = yLimit(2);
const arr = [
  limit(() => asyncFun("aaaa", 1000)),
  limit(() => asyncFun("bbbb", 5000)),
  limit(() => asyncFun("cccc", 5000)),
  limit(() => asyncFun("dddd", 5000)),
  limit(() => asyncFun("eeee", 1000)),
  limit(() => asyncFun("ffff", 5000)),
];
const getData = async () => {
  const res = await Promise.all(arr);
  console.log("🛑yuguaa: ~ getData ~ res", res);
};
getData();
</script>
<style scoped>
.container {
  height: 100%;
}
</style>
