<template>
  <div id="footer">
    <div id="declaration" >
      ©2023 JiuLin Blog. All rights reserved.
    </div>
    <!-- <div id="functions">

    </div> -->
  </div>
</template>

<style lang="scss" scoped>
#footer {
  width: 100%;
  padding: 1rem 3rem;
  background: var(--black-thin);
  color: var(--gray-300);
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // box-shadow: 0 0 1rem 0 var(--black);

  #declaration {
    font-size: .75rem;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

</style>