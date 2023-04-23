<script setup>
import NavBar from '@/components/Navbar.vue';
import BgComp from '@/components/BackgroungComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const windowWidth = ref(0);
const onWindowSizeChanged = () => windowWidth.value = window.innerWidth;

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener('resize', onWindowSizeChanged);
});

onUnmounted(() => {
  window.removeEventListener('resize', onWindowSizeChanged);
})

const isPhoneScreen = computed(() => windowWidth.value < 576);

</script>

<template>
  <NavBar />
  <router-view />
  <FooterComp />
  <BgComp v-if="!isPhoneScreen"/>
</template>

<style lang="scss" scoped>
</style>
