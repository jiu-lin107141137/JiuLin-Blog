# Blog development log - Day 2
Developing my own blog - day 2.

## Tasks completed
Here are what I had done today:
* Add tags and categories on navbar.
* Use intersection observer API to watch home body and give fade-in effect.
* Make navbar responsive
* Add Particle.js as background animation and make it responsive
* Redesign the article preview section
<br>

## New things I learned
In this section, I will share things I learned today.
### Intersection observer API
[**Intersection observer API**](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is first publihed at 2017, as [**MDN**](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) described:
> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

In the past, detecting the visibility of an element had been a hard job for us developers, we need to attach an eventListener to an element to know which parts of websites are currently displayed, the continuous polling could lead to a bad performance. The need for this kind of information has grown since web has matured, and this is why intersection observer was developed.
* Requirment
    Js enabled.
* Usage
    ```js
    const options = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.05
    }; // the conditions for callback

    onMounted(( ) => {
        const tar = document.querySelector('#main-body'); // target for listening

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return; // return if the target is not displayed.
                
                entry.target.classList.add('fade-in'); // add fade-in effect
                observer.unobserve(entry.target); // undescribe observer
            });
        } // define callback function - what to do if the requirments meeted.

        let observer = new IntersectionObserver(callback, options); // create intersection observer

        observer.observe(tar); // attach observer to the target
    });
    ```

### Particle.js
[**Particle.js**](https://github.com/VincentGarreau/particles.js/) is a lightweight Js library to create background animation with particles.
* Demo website
    https://vincentgarreau.com/particles.js/

Since my blog is based on Vue3, I used [**vue3-particles**](https://github.com/matteobruni/tsparticles) package.
* Requirement
    Vue3.0.0+
* Installation
    ```sh
    yarn add vue3-particles
    # or
    npm i vue3-particles
    ```
* Usage
    1. In main.js
        main.js
        ```js
        import { createApp } from 'vue';
        import { createPinia } from 'pinia';

        import Particles from 'vue3-particles';

        const app = createApp(App);

        app.use(Particles);
        app.mount('#app');
        ```
    2. In components
        BackbroundComp.vue
        ```js
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
                            value: 10
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

        ```