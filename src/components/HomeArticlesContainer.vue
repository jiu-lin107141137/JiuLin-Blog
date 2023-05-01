<script setup>
import ArticlePreview from '@/components/ArticlePreview.vue';
import { useLangStore } from '../stores/lang';
import { storeToRefs } from 'pinia';
import { computed, watch, ref } from 'vue';

const langStore = useLangStore();
const { lang } = storeToRefs(langStore);

var blogConfig;
const loadding = ref(true);

const pageLimit = ref(5);
const currentPage = ref(1);

const loadBlogConfig = async () => {
  loadding.value = true;
  if (lang.value == 'en')
    blogConfig = await import('@/assets/blog/en/config.json');
  else
    blogConfig = await import('@/assets/blog/tw/config.json');
  loadding.value = false;
}

loadBlogConfig();

watch(lang, async ( newValue, oldValue ) => {
  loadding.value = true;
  if (newValue == 'en')
    blogConfig = await import('@/assets/blog/en/config.json');
  else
    blogConfig = await import('@/assets/blog/tw/config.json');
  loadding.value = false;
});

const toDatetimeFormat = dtStr => {
  if (!dtStr) return null
  let dateParts = dtStr.split("/");
  let timeParts = dateParts[2].split(" ")[1].split(":");
  dateParts[2] = dateParts[2].split(" ")[0];
  // month is 0-based, that's why we need dataParts[1] - 1
  return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0], +timeParts[0], +timeParts[1]);
}

const getArticles = computed(() => {
  if(loadding.value || !blogConfig)
    return [];

  let res = blogConfig.articles;
  res.sort((a, b) => toDatetimeFormat(b.created_at).getTime() - toDatetimeFormat(a.created_at).getTime());

  return res;
})

const getArticlesCount = computed(() => {
  if(loadding.value || !blogConfig)
    return 0;
  return blogConfig.articles.length;
})

</script>

<template>
  <div id="articles-conatiner">
    <ArticlePreview v-for="article in getArticles" :key="article.title" :article="article"></ArticlePreview>/>
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
  min-width: 250px;
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
    margin-top: 2rem;
  }
}
</style>