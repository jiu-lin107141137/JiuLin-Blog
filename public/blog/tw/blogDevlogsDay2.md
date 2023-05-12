# 部落格開發日誌 - 第二天
繼續撰寫我的部落格 - 第二天

## 完成事項
以下為今日所完成之事項
* 在navbar上新增顯示tag與category的區塊。
* 利用intersection observer監控home body並給予其淡入效果。
* 使navbar具有響應性。
* 以Particle.js作為背景動畫並使其具有響應性。
* 重新設計文章預覽區塊。
<br>

## 新知
在此章節，我將介紹今日所學到的知識
### Intersection observer API
[**Intersection observer API**](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)在2017被推出,[**MDN**](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)對其描述如下:
> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

大意:
> Intersection Observer API提供一種***非同步***的方式去監控元件與視窗或祖先元件之間的交集變化。

在過去，對於開發者而言，偵測一個元件是否正在顯示是一件艱難的事情，必須透過將eventListener附加至元件上並監聽事件，才能得知目前網站目前哪一部份正在被顯示，這種持續性的查詢會使得網站效能變差。而隨著網站技術的成熟，這類的訊息需求也越來越多，因此Intersection observer也隨之而被開發出來。
* 需求
    Js
* 使用方式
    ```js
    const options = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.05
    }; // 呼叫callback的條件

    onMounted(( ) => {
        const tar = document.querySelector('#main-body'); // 需要監聽的元件

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return; // return, 如果該元件尚未達成先前設定的條件
                
                entry.target.classList.add('fade-in'); // 加入淡入動畫
                observer.unobserve(entry.target); // 取消訂閱observer
            });
        } // 定義callback方法

        let observer = new IntersectionObserver(callback, options); // 創建intersection observer

        observer.observe(tar); // 將observer附加至元件上，開始監聽
    });
    ```

### Particle.js
[**Particle.js**](https://github.com/VincentGarreau/particles.js/) 是一種輕量型的js函式庫，用於創造具有粒子的背景動畫。
* 示範網站
    https://vincentgarreau.com/particles.js/

由於我的部落格是以Vue3進行開法，因此使用[**vue3-particles**](https://github.com/matteobruni/tsparticles)套件。
* 需求
    Vue3.0.0+
* 安裝方法
    ```sh
    yarn add vue3-particles
    # or
    npm i vue3-particles
    ```
* 使用方法
    1. 在main.js中
        main.js
        ```js
        import { createApp } from 'vue';
        import { createPinia } from 'pinia';

        import Particles from 'vue3-particles';

        const app = createApp(App);

        app.use(Particles);
        app.mount('#app');
        ```
    2. 在元件內
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