# 部落格開發日誌 - 第一天
開始撰寫我的個人部落格

## 背景
Vue開發團隊在2022年7月1日[公告](https://v2.vuejs.org/lts/) 
> Vue 2.7 is the current, and final minor release of Vue 2.x. Vue 2.7 receives 18 months of LTS (long-term support) starting from its release date on July 1st, 2022. During this period, Vue 2 will receive necessary bug and security fixes, but will no longer receive new features.
Vue 2 will reach End of Life (EOL) on December 31st, 2023. After that date, Vue 2 will continue to be available in all existing distribution channels (CDNs and package managers), but will no longer receive updates, including security and browser compatibility fixes.

大意:
> Vue2.7為Vue2.x版本最後一個小型版本號，將不會新增任何新的功能，僅提供必要的錯誤與安全性更新，並且會在2023年12月31日結束生命週期，在此之後將不再有任何的安全性與瀏覽器相容性之更新。

由於我前一個部落格是以Vue2為基礎進行開發的，所以會受到影響，正好我的網頁程式設計課程在期末時須製作一個期末報告，因此我決定重新製作一個新的個人部落格。
<br>

## 目標
我將開發一個新部落格，提供新增文章、標籤與分類、關鍵字搜尋、多國語系等功能。
此外，我未來會以此發展我的個人學習檔案，且我在日後可藉由查看文章來複習我曾經使用過的技術。
<br>

## 開始
* 開發工具
    * Vue.js
    * Vite
<br>

## 完成事項
以下為我今日完成的事項
* 在Github上新增一個新的repo，並將部落格部署上Github-page。
* 開發首頁 (包含導覽列、主頁橫幅、個人檔案區塊、文章預覽區塊與頁尾)。
* 導入Vue-i18n插件。
<br>

## 新知
在此章節，我將介紹今天所學到的新知。
### Pinia
[**Pinia**](https://pinia.vuejs.org/) 為VueX的繼承者，是一個可在不同元件之間進行狀態管理的工具。 [**查看更多訊息**](https://pinia.vuejs.org/introduction.html).
* 需求
    Vue.js 2/3
* 安裝
    ```sh
    yarn add pinia
    # or
    npm install pinia
    ```
* 使用方法
    1. 在main.js裡
        main.js
        ```js
        import { createApp } from 'vue';
        import { createPinia } from 'pinia';

        const app = createApp(App);
        app.use(createPinia());

        app.mount('#app');
        ```
    2. 在src/stores/之下, 新增新的store。 (在此我以lang.js作為範例，與vue i18n相關知識將於下個章節進行介紹。).
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
    3. 在元件內進行使用。
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
[**Vue i18n**](https://vue-i18n.intlify.dev/) 是一個為Vue.js添加多國語系的插件。
* 需求
    Vue.js 3.0.0+
* 安裝
    ```sh
    npm install vue-i18n@9
    # or
    yarn add vue-i18n@9
    ```
* 使用方法
    1. 在src下新增一個新的檔案(plugins)，接著新增新的檔案(i18n.js)。
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
    2. 新增新的檔案用於儲存不同的語言內容。 (我自己是將檔案創建在src/lang/之下)
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
    3. 在main.js內新增i18n插件。
        main.js
        ```js
        import { createApp } from 'vue';
        import i18n from './plugins/i18n';

        const app = createApp(App);
        app.mount('#app');
        app.use(i18n);
        ```
    4. 在元件內做使用。
        ```html
        <h3>{{ $t('hero.quote') }}</h3>
        ```
* 切換語系
    1. 在src/store下新增一個store(lang.js)。
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
    2. 在元件內使用。
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
