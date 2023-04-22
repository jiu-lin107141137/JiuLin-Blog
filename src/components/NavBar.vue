<script setup>
import { useLangStore } from '../stores/lang';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

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

    #lang-selector {
      background: transparent;
      color: var(--gray-100);

      option,
      option:hover,
      option:checked {
        position: absolute;
        background: var(--black-thin) !important;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
      }
    }
  }
}

.bg-const {
  background: var(--black-thin) !important;
}
</style>
