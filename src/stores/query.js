import { reactive } from 'vue';
import { defineStore } from 'pinia';
import blogConfig from '../assets/blog/en/config.json'

export const useQueryStore = defineStore('query', () => {
  const state = reactive({
    tags: [...Array(blogConfig.items.tags.length)].fill(false),
    categories: [...Array(blogConfig.items.categories.length)].fill(false),
  })
  
  function initTag(tagId) {
    state.tags.fill(false);
    state.tags[tagId] = true;
  }

  function changeTag(tagId) {
    state.tags[tagId] = !state.tags[tagId];
  }

  function initCategory(categoryId) {
    state.categories.fill(false);
    state.categories[categoryId] = true;
  }

  function changeCategory(categoryId) {
    state.categories[categoryId] = !state.categories[categoryId];
  }

  return { state, initTag, changeTag, initCategory, changeCategory };
})
