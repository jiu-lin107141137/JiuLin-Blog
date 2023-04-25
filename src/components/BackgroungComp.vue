<script setup>
import { loadFull } from 'tsparticles';

async function particlesInit(engine) {
  await loadFull(engine);
}

async function particlesLoaded(container) {
  // console.log('Particles container loaded', container)
}
</script>

<template>
  <div id="bg-container">
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="{
        background: {
          color: {
            value: '#161618'
          }
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push'
            },
            onHover: {
              enable: true,
              mode: 'grab'
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40
            },
            push: {
              quantity: 4
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            grab: {
              distance: 200
            }
          }
        },
        particles: {
          color: {
            value: '#dfe3e7'
          },
          links: {
            color: '#dfe3e7',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
          },
          collisions: {
            enable: true
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'out',
            random: false,
            speed: 3,
            straight: false
          },
          number: {
            density: {
              enable: true,
              area: 800
            },
            value: 20
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'circle'
          },
          size: {
            random: true,
            value: 5
          }
        },
        detectRetina: true
      }"
    />
  </div>
</template>

<style lang="scss" scoped>
#bg-container {
  z-index: -1;
  width: 100vw;
  width: 100svw;
  height: 100vw;
  height: 100svw;
  position: fixed;
  background: var(--black-thin);
}
</style>
