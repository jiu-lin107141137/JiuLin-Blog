<script setup>
import HomeProfile from '@/components/HomeProfile.vue';
import HomeArticlesContainer from '@/components/HomeArticlesContainer.vue';
import { onMounted } from 'vue';

const options = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0.05
};

onMounted(() => {
  const tar = document.querySelector('#main-body');

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    })
  }

  let observer = new IntersectionObserver(callback, options);

  observer.observe(tar);
});
</script>

<template>
  <div id="main-body">
    <HomeProfile />
    <HomeArticlesContainer />
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
  position: relative;
  top: 100px;
  display: flex;
  padding: 2rem 12.5rem;
  justify-content: center;
  gap: 1.5rem;
  position: relative;
  opacity: 0;
  transition: opacity .5s ease-in-out 0s,
              top .5s ease-in-out 0s;

  @include smallerScreen {
    flex-wrap: wrap;
    padding: 2rem;
    gap: 0;
  };
}

.fade-in {
  opacity: 1 !important;
  top: 0 !important;
}
</style>
