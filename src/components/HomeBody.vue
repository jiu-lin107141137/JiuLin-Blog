<template>
  <div id="hero-container">
    <div id="hero-box">
      <div id="hero-img">
        <img src="@/assets/image/skadiAvatar.jpg" alt="avatar" draggable="false" />
      </div>
      <div id="hero-text">
        <h1>JiuLin</h1>
        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, tempore.</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#hero-container {
  height: 200vh;
  height: 200svh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #hero-box {
    // margin-bottom: 15vh;
    // margin-bottom: 15svh;
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
