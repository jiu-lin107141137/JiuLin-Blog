<script setup>
import NavBar from '@/components/Navbar.vue';
import BgComp from '@/components/BackgroungComp.vue';
import FooterComp from '@/components/FooterComp.vue';
</script>

<template>
  <NavBar />
  <router-view />
  <FooterComp />
  <BgComp />
</template>

<style lang="scss" scoped></style>
