<script setup>
import CategoryQueryComp from '../components/CategoryQueryComp.vue';
</script>

<template>
  <div id="constraint">
    <CategoryQueryComp />
  </div>
</template>

<style lang="scss" scoped>
#constraint {
  min-height: calc(100vh - 50px);
  min-height: calc(100svh - 50px);
}
</style>