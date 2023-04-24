<script setup>
import { useLangStore } from '../stores/lang';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { computed, watch, ref, onMounted, onUnmounted } from 'vue';

const router = useRouter();
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

const changeEvent = () => {
  if(window.scrollY >= vh){
    nav.classList.add('bg-const');
  }
  else if(nav.classList.contains('bg-const')){
    nav.classList.remove('bg-const');
  }
}

onMounted(() => {
  nav = document.getElementById('nav');

  if(route.name != 'home'){
    nav.classList.add('bg-const');
    return;
  }
  
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * .7;
  if(window.scrollY >= vh){
    nav.classList.add('bg-const');
  }
  else if(nav.classList.contains('bg-const')){
    nav.classList.remove('bg-const');
  }

  window.addEventListener('scroll', changeEvent);
})

onUnmounted(() => {
  window.removeEventListener('scroll', changeEvent)
})

watch(() => route.name, () => {
  if(route.name != 'home'){
    window.removeEventListener('scroll', changeEvent)
    nav.classList.add('bg-const');
    return;
  }
  else {  
    vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * .7;
    if(window.scrollY >= vh){
      nav.classList.add('bg-const');
    }
    else if(nav.classList.contains('bg-const')){
      nav.classList.remove('bg-const');
    }
    window.addEventListener('scroll', changeEvent);
  }
})

</script>

<template>
  <div id="nav">
    <div id="site-name">
      <div @click="router.push('/')">
        <span class="material-symbols-outlined"> texture </span>
        JiuLin's Blog
      </div>
    </div>
    <input type="checkbox" id="menu-show" />
    <label for="menu-show"><span></span></label>
    <div id="functions">

      <div class="data-dropdown">
        {{ $t('home.profile.title.categories') }}
        <div class="data-dropdown-items">
          <div v-for="(category, index) in getCategories" :key="category" :style="{ '--i' : index-1 }">
            <span>
              {{ category }}
            </span>
          </div>
        </div>
      </div>

      <div class="data-dropdown">
        {{ $t('home.profile.title.tags') }}
        <div class="data-dropdown-items">
          <div v-for="(tag, index) in getTags" :key="tag" :style="{ '--i' : index-1 }">
            <span>
              {{ tag }}
            </span>
          </div>
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
@mixin smallerScreen {
  @media screen and (max-width: 972px) {
    @content;
  }
}

#nav {
  // width: 100vw;
  // width: 100svw;
  width: 100%;
  min-height: 4rem;
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
  @include smallerScreen {
    flex-wrap: wrap;
    padding: 0 2.5rem 0 1rem;
    // transition: max-height;

    #site-name, #functions {
      width: 100%;
    }

    #site-name {
      height: 4rem;
      display: flex;
      align-items: center;
    }

    label {
      display: inline !important;
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2rem;
      height: 2rem;

      span {
        display: block;
        width: 100%;
        height: 100%;
        z-index: 2;
        position: relative;
      }

      ::before, ::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        left: 0;
        background: var(--gray-100);
        transition: transform .25s ease-out 0s,
                    top .25s ease-in-out .25s;
      }

      ::before {
        top: 25%;
      }

      ::after {
        top: 75%;
      }
    }

    #menu-show:checked ~ label {
      ::before, ::after {
        transition: transform .25s ease-in-out .25s,
                    top .25s ease-in-out 0s;
      }

      ::before {
        transform: rotate(45deg);
        top: 50%;
      }

      ::after {
        transform: rotate(-45deg);
        top: 50%;
      }
    }

    #menu-show:checked ~ #functions {
      height: fit-content;
      margin: .5rem;
    }

    #functions {
      flex-wrap: wrap;
      gap: 1rem !important;
      padding: 0;
      height: 0;
      overflow: hidden;
      display: none;

      .data-dropdown, #lang-selector {
        width: 100%;
        height: 100%;
        height: max-content;
      }

      .data-dropdown .data-dropdown-items {
        position: static !important;
        height: 0;
        overflow: hidden;
        transition: height 0.5s ease-in-out 0s;

        div span {
          left: 50%;
        }
      }
    }
  }

  #site-name {
    font-size: 1.75rem;
    transition: color .25s ease-in-out 0s;

    div {
      cursor: pointer;
    }
  }

  #site-name:hover {
    color: var(--purple-700);
  }

  #menu-show, label {
    display: none;
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
      word-break: keep-all;
      text-transform: capitalize;

      .data-dropdown-items {
        position: absolute;
        top: 100%;
        display: flex;
        // flex-direction: column;
        flex-wrap: wrap;
        border-radius: 5px;
        background: var(--black-thin);
        z-index: 1;
        color: var(--gray-100);
        height: 0;
        overflow: hidden;
        
        div {
          width: 100%;
          min-width: max-content;
          padding: .25rem .5rem;

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
        }

        div:hover {
          span {
            color: var(--purple-700);
          }

          span::after {
            width: 100%;
          }
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
