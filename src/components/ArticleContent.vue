<script setup>
import { useRoute } from 'vue-router';
import { useLangStore } from '../stores/lang';
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
// import 'highlightjs-line-numbers.js';
import axios from 'axios';
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/github-dark.css';

window.hljs = hljs;
import('highlightjs-line-numbers.js');

const route = useRoute();
const langStore = useLangStore();
const { lang } = storeToRefs(langStore);
var blogConfig, articleContent = ref('');
const loading = ref(true);
var myMarkdownRenderer = new marked.Renderer();
var heading = [];

(async () => {
  loading.value = true;
  if (lang.value === 'en')
    blogConfig = import('../assets/blog/en/config.json');
  else
    blogConfig = import('../assets/blog/tw/config.json');
  loading.value = false;
})();

watch(lang, async(newV, oldV) => {
  console.log(lang.value);
  loading.value = true;
  if (newV === 'en')
    blogConfig = import('../assets/blog/en/config.json');
  else
    blogConfig = import('../assets/blog/tw/config.json');
  await getMdFile();
  loading.value = false;
});

// set up renderer
// myMarkdownRenderer.heading = (text, level) => {
//   heading.push({
//     text: text,
//     level: level
//   });
// }
// myMarkdownRenderer.codespan = (code) => {

// }

window.hljs.highlightAll();

marked.setOptions({
  // breaks: true,
  // gfm: true,
  headerIds: true,
  headerPrefix: 'markdown-heading-',
  highlight: (code, lang) => {
    const language = window.hljs.getLanguage(lang) ? lang : 'plaintext';
    return window.hljs.highlight(code, { language: language }).value;
  },
  langPrefix: 'hljs language-',
  renderer: myMarkdownRenderer,
})

const translateMd = async (markdownStr) => {
  heading = {};
  return marked.parse(markdownStr)
};

const getMdFile = async () => {
  let path = '/blog/' + lang.value + '/' + route.params.name + '.md';
  if (import.meta.url.startsWith('https://jiu-lin107141137.github.io/JiuLin-Blog/'))
    path = '/JiuLin-Blog' + path;
  let res_content = '';
  await axios({
    method: 'get',
    url: path
  }).then(res => {
    res_content = res.data;
  }).catch(e => {
    console.log(e);
  });
  // console.log(res_content);
  translateMd(res_content)
    .then(res => {
      articleContent.value = res;
      // console.log(res);
    })
}

onMounted(async() => {
  loading.value = true;
  await getMdFile();
  loading.value = false;
})

</script>

<template>
  <div id="article-container">
    <div id="article">
      <div id="article-title">
        <span>Blog Titlt 1</span>
      </div>
      <div id="article-info">
        <div class="pair">
          <span class="material-symbols-outlined">
            person
          </span>
          JiuLin
        </div>
        <div class="pair">
          <span class="material-symbols-outlined">
            schedule
          </span>
          24/04/2023 01:53
        </div>
        <div class="pair">
          <span class="material-symbols-outlined">
            topic
          </span>
          Blog
        </div>
        <div class="pair">
          <span class="material-symbols-outlined">
            sell
          </span>
          Vue, Web
        </div>
      </div>
      <div id="article-content" class="markdown-body" v-html="articleContent">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#article-container {
  width: 100%;
  min-height: calc(100vh - 50px);
  min-height: calc(100svh - 50px);
  padding: 4rem 30% 0 15%;
  display: flex;
  justify-content: center;
  gap: 2rem;

  #article {
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.25rem;
    // background: var(--gray-900);
    // color: var(--gray-100);
    text-align: left;
    margin: 2rem 0;
    padding: .5rem 1rem;

    div {
      width: 100%;
      color: var(--gray-300);
    }

    #article-title {
      font-size: 1.75rem;
      letter-spacing: .05rem;
      height: fit-content;
      padding-left: 1rem;

      span {
        background: var(--black-thin);
        text-transform: capitalize;
      }
    }

    #article-info {
      padding-left: 1rem;
      height: fit-content;
      display: flex;

      .pair {
      background: var(--black-thin);
        margin-right: 1rem;
        display: flex;
        gap: .5rem;
        width: fit-content;
        font-size: .8rem;

        span {
          font-size: 1rem;
        }
      }
    }

    #article-content {
      // height: 10rem;
      border-radius: .375rem;
      border: 1px solid var(--gray-900);
      background: var(--black-thin);
      padding: .5rem 1rem;
      line-height: 2rem;

      /*
      @media (max-width: 767px) {
        .markdown-body {
          padding: 15px;
        }
      }*/
      
      :deep(pre:has(code.hljs)) {
        background-color: var(--gray-900);
      }

      :deep(.hljs-ln-numbers) {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        text-align: center;
        color: #ccc;
        border-right: 1px solid #CCC;
        vertical-align: top;
        padding-right: 5px;

        /* your custom style here */
      }

      /* for block of code */
      :deep(.hljs-ln-code) {
        padding-left: 10px;
      }
    }

    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
    }
  }
}
</style>