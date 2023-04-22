<template>
  <div id="nav">
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
</style>
