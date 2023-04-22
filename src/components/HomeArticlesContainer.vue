<script setup>
import ArticlePreview from '@/components/ArticlePreview.vue';
</script>

<template>
  <div id="articles-conatiner">
    <ArticlePreview />
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

#articles-conatiner {
  width: 75%;
  min-width: 506px;
  height: fit-content;
  background: var(--black-thin);
  border-radius: .5rem;
  box-shadow: 0 0 .125rem .125rem var(--black);
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: left;
  padding: 0 1rem;

  @include smallerScreen {
    width: 100% !important;
    min-width: 372px !important;
    margin-top: 2rem;
  }
}
</style>