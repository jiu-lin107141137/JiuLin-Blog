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
