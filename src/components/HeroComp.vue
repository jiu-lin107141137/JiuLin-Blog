<script setup>
// import { useI18n } from 'vue-i18n';


</script>

<template>
  <div id="hero-container">
    <div id="hero-box">
      <div id="hero-img">
        <img src="@/assets/image/skadiAvatar.jpg" alt="avatar" draggable="false" />
      </div>
      <div id="hero-text">
        <h1>JiuLin</h1>
        <h3>{{ $t('hero.quote') }}</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#hero-container {
  height: 100vh;
  height: 100svh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('@/assets/image/skadiBackground.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  #hero-box {
    color: var(--gray-100);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    #hero-img {
      aspect-ratio: 1 / 1;
      height: clamp(200px, min(30vh, 30vw), 400px);
      width: min-content;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 10px solid var(--purple-300);
      }
    }

    #hero-text {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin: 0.5rem 0.5rem 0;

      h3 {
        color: var(--gray-400);
        opacity: 0.8;
      }
    }
  }
}
</style>
