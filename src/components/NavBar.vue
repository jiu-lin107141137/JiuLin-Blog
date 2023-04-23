<script setup>
import { useLangStore } from '../stores/lang';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed, watch, ref } from 'vue';

const langStore = useLangStore();
const { lang } = storeToRefs(langStore);

const currentLang = computed({
  get() {
    return lang.value;
  },
  set(val) {
    if (val != lang.value)
      langStore.switchLang();
  }
})

var blogConfig;
const loadding = ref(true);
(async() => {
  loadding.value = true;
  if (lang.value == 'en')
    blogConfig = await import('@/assets/blog/en/config.json');
  else
    blogConfig = await import('@/assets/blog/tw/config.json');
  loadding.value = false;
})();

watch(lang, async (newV, oldV) => {
  loadding.value = true;
  if (newV == 'en')
    blogConfig = await import('@/assets/blog/en/config.json');
  else
    blogConfig = await import('@/assets/blog/tw/config.json');
  loadding.value = false;
})

const getTags = computed(() => {
  if(loadding.value || !blogConfig)
    return [];
  
  return blogConfig.items.tags;
})

const getCategories = computed(() => {
  if(loadding.value || !blogConfig)
    return [];
  
  return blogConfig.items.categories;
})

const route = useRoute();
let nav = null, vh = 0;

window.onload = () => {
  if(route.name != 'home')
    return;
  
  nav = document.getElementById('nav');
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  if(window.scrollY >= vh){
    nav.classList.add('bg-const');
  }
  else if(nav.classList.contains('bg-const')){
    nav.classList.remove('bg-const');
  }

  const changeEvent = () => {
    if(window.scrollY >= vh){
      nav.classList.add('bg-const');
    }
    else if(nav.classList.contains('bg-const')){
      nav.classList.remove('bg-const');
    }
  }

  window.addEventListener('scroll', () => {
    // var doit;
    // clearTimeout(doit);
    // doit = setTimeout(changeEvent, 300);
    changeEvent();
  });
}
</script>

<template>
  <div id="nav" class="">
    <div id="site-name">
      <span class="material-symbols-outlined"> texture </span>
      JiuLin's Blog
    </div>
    <div id="functions">

      <div class="data-dropdown">
        Categories
        <div class="data-dropdown-items">
          <span v-for="(category, index) in getCategories" :key="category" :style="{ '--i' : index-1 }">
            {{ category }}
          </span>
        </div>
      </div>

      <div class="data-dropdown">
        Tags
        <div class="data-dropdown-items">
          <span v-for="(tag, index) in getTags" :key="tag" :style="{ '--i' : index-1 }">
            {{ tag }}
          </span>
        </div>
      </div>

      <select id="lang-selector" class="form-control form-control-sm" v-model="currentLang">
        <option value="en">En-us</option>
        <option value="tw">Zh-tw</option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#nav {
  // width: 100vw;
  // width: 100svw;
  width: 100%;
  height: 4rem;
  background: transparent;
  backdrop-filter: blur(10px);
  position: fixed;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
  box-shadow: 0 0 1rem 0 var(--black);
  z-index: 1;

  #site-name {
    font-size: 1.75rem;
    cursor: pointer;
  }

  #functions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;

    .data-dropdown {
      position: relative;
      transition: color .25s ease-in-out 0s;
      cursor: pointer;

      .data-dropdown-items {
        position: absolute;
        top: 100%;
        // left: -25%;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        background: var(--black-thin);
        z-index: 1;
        color: var(--gray-100);
        height: 0;
        overflow: hidden;
        
        span {
          position: relative;
          margin: .5rem;
          width: max-content;
          opacity: 0;
          left: 200%;
          transition: color .25s ease-in-out 0s,
                      left .25s ease-in-out calc(var(--i) * .1s),
                      opacity .25s ease-in-out calc(var(--i) * .1s);
        }

        span::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          top: 90%;
          left: 0;
          background: var(--purple-700);
          transition: width .25s ease-in-out 0s;
        }

        span:hover {
          color: var(--purple-700);
        }

        span:hover::after {
          width: 100%;
        }
      }
    }

    .data-dropdown:hover {
      color: var(--purple-700);

      .data-dropdown-items {
        height: fit-content;
        border: 1px solid var(--gray-700);

        span {
          opacity: 1;
          left: 0;
        }
      }
    }

    #lang-selector {
      background: transparent;
      color: var(--gray-100);
      transition: color .25s ease-in-out 0s,
                  border-color .25s ease-in-out 0s;

      option {
        position: absolute;
        background: var(--black-thin) !important;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
        color: var(--gray-100);
      }
    }

    #lang-selector:hover,
    #lang-selector:focus {
      border-color: var(--purple-700);
      color: var(--purple-700);
    }
  }
}

.bg-const {
  background: var(--black-thin) !important;
}
</style>
