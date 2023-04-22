<script setup>
import HomeProfile from '@/components/HomeProfile.vue';
// import { ref } from 'vue'
// const lastPos = ref(0);
// const disable = ref(false);

// const onScroll = () => {
//   var curPos = window.pageYOffset || document.documentElement.scrollTop;
//   var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
//   if (curPos > lastPos.value && curPos < vh) {
//     window.scrollTo({
//       top: vh, behavior: 'smooth'
//     });
//   }
//   else {
//     // up
//   }
//   lastPos.value = curPos <= 0 ? 0 : curPos;
//   disable.value = true;
//   setTimeout(function(){disable.value = false;}, 3000);
// }

// const scrollEvventLinster = () => {
//   if(disable.value)
//     return;

//   onScroll();

//   var doit;
//   clearTimeout(doit);
//   doit = setTimeout(onScroll, 300);
// };

// window.addEventListener('scroll', scrollEvventLinster);

// function onUnmounted() {
//   window.removeEventListener('scroll', scrollEvventLinster);
// };
</script>

<template>
  <div id="main-body">
    <HomeProfile />
    <div id="articles">

    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin smallerScreen {
  @media screen and (max-width: 972px) {
    @content;
  }
}
@mixin phoneScreen {
  @media screen and (max-width: 576px) {
    @content;
  }
}

#main-body {
  width: 100%;
  display: flex;
  padding: 2rem 12.5rem;
  justify-content: center;
  gap: 1.5rem;

  @include smallerScreen {
    flex-wrap: wrap;
    padding: 2rem;
    gap: 0;

    #articles {
      width: 100% !important;
      min-width: none !important;
      max-width: none !important;
    }
  };

  #articles {
    width: 75%;
    height: 3rem;
    // background: #0F0;
  }
}
</style>
