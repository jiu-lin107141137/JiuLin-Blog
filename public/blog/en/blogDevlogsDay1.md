# Blog development log - Day 1
Start to develop my own blog - day 1.

## Background
As Vue developer team [announced](https://v2.vuejs.org/lts/) on July 1, 2022.
> Vue 2.7 is the current, and final minor release of Vue 2.x. Vue 2.7 receives 18 months of LTS (long-term support) starting from its release date on July 1st, 2022. During this period, Vue 2 will receive necessary bug and security fixes, but will no longer receive new features.
Vue 2 will reach End of Life (EOL) on December 31st, 2023. After that date, Vue 2 will continue to be available in all existing distribution channels (CDNs and package managers), but will no longer receive updates, including security and browser compatibility fixes.

My previous blog will be affected since it was made based on Vue2; furthermore, I need to develop a term project for my Web Programming class, so I decided to remake a new blog.
<br>

## Purpose
I will develop a new blog with features like adding new articles, classifying articles with different tags and categories, searching articles with keywords and viewing in various languages, etc. Moreover, I can build my learning portfolio with this, and I can do the review by looking up my blogs.
<br>

## Start up
* Tools
    * Vue.js
    * Vite
<br>

## Tasks completed
Here are what I had done today:
* Open a new repository on Github and deploy my blog using Github-page.
* Build home page (including navbar, hero section, profile secition, articles preview section and footer.)
* introduce Vue i18n plugin.
<br>

## New things I learned
In this section, I will share things I learned today.
### Pinia
[**Pinia**](https://pinia.vuejs.org/) is the successor of Vuex, a state management library across different components. You can find more information [**here**](https://pinia.vuejs.org/introduction.html).
* Requirment
    Vue.js 2/3
* Installation
    ```sh
    yarn add pinia
    # or
    npm install pinia
    ```
* Usage
    1. In main.js
        main.js
        ```js
        import { createApp } from 'vue';
        import { createPinia } from 'pinia';

        const app = createApp(App);
        app.use(createPinia());

        app.mount('#app');
        ```
    2. Under src/stores/, create a new store. (Here I take lang.js for example, you can learn more information about i18n in the next section).
        lang.js
        ```js
        import { ref } from 'vue';
        import { defineStore } from 'pinia';
        import i18n from '../plugins/i18n';

        export const useLangStore = defineStore('lang', () => {
            const lang = ref('en');
            
            function switchLang() {
                lang.value = lang.value === 'en' ? 'tw' : 'en';
                i18n.global.locale = lang.value;
            }

            return { lang, switchLang };
        })
        ```
    3. In components
        ```js
        <script setup>
        import { useLangStore } from '../stores/lang';
        import { storeToRefs } from 'pinia';
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
        });
        </script>

        <template>
            <select v-model="currentLang">
                <option value="en">En-us</option>
                <option value="tw">Zh-tw</option>
            </select>
        </template>
        ```

### Vue i18n
[**Vue i18n**](https://vue-i18n.intlify.dev/) is a plugin of Vue.js for integrating some localization features.
* Requirment
    Vue.js 3.0.0+
* Installation
    ```sh
    npm install vue-i18n@9
    # or
    yarn add vue-i18n@9
    ```
* Usage
    1. Create a new folder(plugins) under scr, then add a new file named i18n.js.
        i18n.js
        ```js
        import { createI18n } from 'vue-i18n';
        import tw from '@/lang/tw.json';
        import en from '@/lang/en.json';

        const i18n = createI18n({
            locale: 'en',
            fallbackLocale: 'en',
            messages: {
                tw,
                en,
            },
        });

        export default i18n;
        ```
    2. Create language files, for me, I put the files under src/lang.
        en.json
        ```json
        {
            "hero" : {
                "quote" : "Life is complex – it has both real and imaginary parts."
            }
        }
        ```
        tw.json
        ```json
        {
            "hero" : {
                "quote" : "生活有如複數——同時存在著真實與幻想。"
            }
        }
        ```
    3. In main.js, add i18n plugin.
        main.js
        ```js
        import { createApp } from 'vue';
        import i18n from './plugins/i18n';

        const app = createApp(App);
        app.mount('#app');
        app.use(i18n);
        ```
    4. Use it in components.
        ```html
        <h3>{{ $t('hero.quote') }}</h3>
        ```
* Change language
    1. Create a new store called lang.js under src/stores.
        lang.js
        ```js
        import { ref } from 'vue';
        import { defineStore } from 'pinia';
        import i18n from '../plugins/i18n';

        export const useLangStore = defineStore('lang', () => {
            const lang = ref('en');
            
            function switchLang() {
                lang.value = lang.value === 'en' ? 'tw' : 'en';
                i18n.global.locale = lang.value;
            }

            return { lang, switchLang };
        })
        ```
    2. In components
        ```js
        <script setup>
        import { useLangStore } from '../stores/lang';
        import { storeToRefs } from 'pinia';
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
        });
        </script>

        <template>
            <select v-model="currentLang">
                <option value="en">En-us</option>
                <option value="tw">Zh-tw</option>
            </select>
        </template>
        ```
