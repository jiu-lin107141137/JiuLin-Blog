<script setup>
import { useLangStore } from '../stores/lang';
import { useQueryStore } from '../stores/query';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref, reactive, watch, computed, onMounted, onUnmounted } from 'vue';
import HomeArticlesContainer from '@/components/HomeArticlesContainer.vue';

const langStore = useLangStore();
const { lang } = storeToRefs(langStore);
const queryStore = useQueryStore();
const { state } = storeToRefs(queryStore);
const route = useRoute();
const loadding = ref(true);
var blogConfig;

watch(lang, async newV => {
  loadding.value = true;
  if (newV == 'en')
    blogConfig = await import('@/assets/blog/en/config.json');
  else
    blogConfig = await import('@/assets/blog/tw/config.json');
  loadding.value = false;
});

const getTags = computed(() => {
  if(loadding.value || !blogConfig)
    return [];
  
  let count = [...Array(blogConfig.items.tags.length)].fill(0);
  let rt = [];
  blogConfig.articles.forEach(article => article.tags.forEach(id => count[id]++));

  blogConfig.items.tags.forEach((tag, ind) => rt.push({
    tagName: tag,
    tagId: ind,
    usedTime: count[ind],
  }));

  return rt;
});

const changeQuery = tagId => {
  queryStore.changeTag(tagId);
}

const propTags = computed(() => {
  let rt = [];
  state.value.tags.forEach((b, i) => {
    if(b)
      rt.push(i);
  });
  return rt;
});

// const initCurrentTag = (tagId) => {
//   state.queryTags = [];
//   getTags.value.forEach((e, i) => state.queryTags.push(i == tagId ? true : false));
// }

(async() => {
  loadding.value = true;
  if (lang.value == 'en')
    blogConfig = await import('@/assets/blog/en/config.json');
  else
    blogConfig = await import('@/assets/blog/tw/config.json');
  loadding.value = false;
  // initCurrentTag(history.state.tagId);
})();

</script>

<template>
  <div id="queryContainer">
    <div id="tagSelector">
      <div class="tag" 
          :class="{'selected': state.tags[tag.tagId]}"
          v-for="tag in getTags.sort((a, b) => b.usedTime - a.usedTime)" 
          :key="tag.tagId" 
          @click="changeQuery(tag.tagId)">
        <span>{{ tag.tagName }}</span>
        <span>{{ tag.usedTime }}</span>
      </div>
    </div>
    <HomeArticlesContainer :constraints="[true, false]" />
  </div>
</template>

<style lang="scss">
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

#queryContainer {
  width: 100%;
  height: 100%;
  padding: 5rem 25% 1rem;

  #tagSelector {
    width: 100%;
    background: var(--black-thin);
    // background: var(--gray-900);
    // margin: 0 1rem 0 1rem;
    padding: 1rem 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    border: 1px solid var(--gray-800);
    border-radius: .25rem;
    // border: 1px solid var(--gray-700);

    .tag {
      width: fit-content;
      height: fit-content;
      padding: .2rem .5rem;
      background: var(--gray-900);
      color: var(--gray-200);
      border: 1px solid var(--gray-700);
      cursor: pointer;
      transition: background .25s ease-in-out 0s;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      span:nth-child(1) {
        margin-right: .5rem;
        padding-right: 0.5rem;
        border-right: 1px solid var(--gray-700);
      }
    }

    .tag.selected {
      background: var(--purple-200);
    }
  }

  #articles-conatiner {
    width: 100%;
    margin-top: 1.5rem;
    box-shadow: none;
    border: 1px solid var(--gray-800);
  }

  @include smallerScreen {
    padding: 5rem 12.5% 1rem;
  }

  @include phoneScreen {
    padding: 5rem 5% 1rem;
  }
}

</style>