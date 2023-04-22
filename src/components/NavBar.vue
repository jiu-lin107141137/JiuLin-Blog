<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
let nav = null, vh = 0;

window.onload = () => {
  if(route.name != 'home')
    return;
  
  nav = document.getElementById('nav');
  vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  if(window.scrollY >= vh){
    nav.classList.add('bg-const');
    console.log(1)
  }
  else if(nav.classList.contains('bg-const')){
    nav.classList.remove('bg-const');
    console.log(2)
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
}

.bg-const {
  background: var(--black-thin) !important;
}
</style>
