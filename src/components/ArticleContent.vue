<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useLangStore } from '../stores/lang';
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';
import { marked } from 'marked';
import hljs from 'highlight.js';
import axios from 'axios';
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/github-dark.css';

const route = useRoute();
const router = useRouter();
const langStore = useLangStore();
const { lang } = storeToRefs(langStore);
var blogConfig, articleContent = ref('');
const loading = ref(true);
var myMarkdownRenderer = new marked.Renderer();
var headingCount = [0, 0, 0];
var headings = [];
const headingOffset = ref(0);
var previousActive = null;
var timer = null;
var timer2 = null;
var anchors = [];

(async () => {
  loading.value = true;
  if (lang.value === 'en')
    blogConfig = import('../assets/blog/en/config.json');
  else
    blogConfig = import('../assets/blog/tw/config.json');
})();

watch(lang, async(newV, oldV) => {
  loading.value = true;
  if (newV === 'en')
    blogConfig = await import('../assets/blog/en/config.json');
  else
    blogConfig = await import('../assets/blog/tw/config.json');
  await getMdFile();
});

myMarkdownRenderer.heading = function(text, level) {
  if (level > 0 && level < 4) {
    headingCount[level-1] ++;
    headings.push({
      id: 'markdown-heading-' + level + '-' + headingCount[level-1],
      level: level,
      text: text
    });
    return  `
              <h${level} id="markdown-heading-${level}-${headingCount[level-1]}" class='markdown-anchor'>
                ${text}
              </h${level}>
            `;
  }
  else
    return  `
              <h${level}>
                ${text}
              </h${level}>
            `;
}

marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  headerPrefix: 'markdown-heading-',
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language: language }).value;
  },
  langPrefix: 'hljs language-',
  renderer: myMarkdownRenderer,
})

const translateMd = async (markdownStr) => {
  headingCount = [0, 0, 0];
  headings = [];
  headingOffset.value = 0;
  return await marked.parse(markdownStr);
};

const getMdFile = async () => {
  loading.value = true;

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
    res_content = 'load resource failed!'
  });

  await translateMd(res_content)
    .then(res => {
      articleContent.value = res;
    })
    .catch(e => {
      console.log(e);
      articleContent.value = 'load resource failed!'
    });

  // for anchors
  for(let i = 0; i < headingCount.length && headingCount[i] == 0; i++)
    headingOffset.value ++;
  anchors = [...document.getElementsByClassName('markdown-anchor')];
  previousActive = null;

  loading.value = false;
  
  if(anchors.length)
    await clickOnLink(anchors[0].id, true);
}

const updateCurrentAnchor = () => {
  let currentId = window.location.hash.substring(1);
  if(previousActive){
    if(previousActive.id == currentId)
      return;
    previousActive.classList.remove('current');
  }
  console.log('to-'+currentId)
  previousActive = document.getElementById('to-'+currentId);
  previousActive.classList.add('current');
}

onMounted(async() => {
  await getMdFile();
      document.addEventListener('scroll', scrollEvent);
})

onUnmounted(() => {
  document.removeEventListener('scroll', scrollEvent, true);
})

const clickOnLink = async (id, useCapture=false) => {
  document.removeEventListener('scroll', scrollEvent, useCapture);
  console.log('removed');
  if(previousActive){
    if(previousActive.id == 'to-'+id)
      return;
    previousActive.classList.remove('current');
  }
  window.scrollTo({
    top: document.getElementById(id).getBoundingClientRect().top + window.scrollY - 80,
    behavior: 'smooth'
  })
  previousActive = document.getElementById('to-'+id);
  previousActive.classList.add('current');
  // console.log(previousActive);
  var urlHash = '#'+id;
  await router.push(urlHash).then(() => {
    window.history.replaceState({ ...window.history.state, ...null}, '');
    if(timer2 !== null)
      clearTimeout(timer2);
    timer2 = setTimeout(() => {
      document.addEventListener('scroll', scrollEvent);
    }, 1000);
  });
}

// Source: http://stackoverflow.com/questions/30734552/change-url-while-scrolling
// stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
const scrollEvent = () => {
  if(timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(async () => {
    console.log("here");
    if(anchors.length && !isNotInTheViewport(anchors[0])){
      if (window.history.pushState) {
        var urlHash = "#" + anchors[0].id;
        await router.push(urlHash);
        window.history.replaceState({ ...window.history.state, ...null}, '');
        updateCurrentAnchor();
      }
    }
    else{
      anchors.forEach(async el => {
        if(isNotInTheViewport(el)) {
          // update the URL hash
          if (window.history.pushState) {
            var urlHash = "#" + el.id;
            await router.push(urlHash);
            window.history.replaceState({ ...window.history.state, ...null}, '');
            updateCurrentAnchor();
          }
        }
      });
    }
  }, 200);
}

const isNotInTheViewport = el => {
  var rect = el.getBoundingClientRect();
  return rect.top <= 81;
}

</script>

<template>
  <div id="article-container">
    <div id="category">

    </div>
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
      <div id="article-content-skeleton" v-if="loading">
        <div class="article-content-skeleton-line"></div>
        <div class="article-content-skeleton-line"></div>
        <div class="article-content-skeleton-line"></div>
        <div class="article-content-skeleton-line-finish" :style="{'--w': (Math.random() * 80)+'%'}"></div>
        <div class="article-content-skeleton-line"></div>
        <div class="article-content-skeleton-line"></div>
        <div class="article-content-skeleton-line-finish" :style="{'--w': (Math.random() * 80)+'%'}"></div>
        <div class="article-content-skeleton-line"></div>
        <div class="article-content-skeleton-line-finish" :style="{'--w': (Math.random() * 80)+'%'}"></div>
        <div class="article-content-skeleton-cover"></div>
      </div>
      <div id="article-content" class="markdown-body" v-html="articleContent" v-show="!loading">
      </div>
    </div>
    <div id="anchor">
      <div id="control">
        <input type="checkbox" id="archon-show"/>
        <label for="archon-show">&nbsp;</label>
      </div>
      <div id="navigation">
        <ul>
          <a v-for="heading in headings" :key="heading.text" 
            :style="{'--level': heading.level-headingOffset}" :id="'to-'+heading.id" @click="clickOnLink(heading.id)">
            <li>
                {{ heading.text }}
            </li>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin smallerScreen {
  @media screen and (max-width: 972px) {
    @content;
  }
}

@mixin phoneScreen {
  @media screen and (max-width: 576px) {
    @content;
  }
}


#article-container {
  width: 100%;
  min-height: calc(100vh - 50px);
  min-height: calc(100svh - 50px);
  padding: 4rem 0 0 0;
  display: flex;
  justify-content: space-between;
  // justify-content: center;
  gap: .5rem;
  position: relative;

  @include smallerScreen {
    padding: 4rem 0 0;

    #article {
      width: 85% !important;
    }
  }

  @include phoneScreen() {
    padding: 4rem 0 0;
    #category {
      width: 0 !important;
    }

    #article {
      width: 100% !important;
      margin: 0 !important;
      #article-info {
        flex-wrap: wrap;
      }
    }
  }

  #category {
    width: 15%;
  }

  #article {
    width: 70%;
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
      // width: 100%;
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

      :deep(h1),
      :deep(h2),
      :deep(h3) {
        color: var(--purple-800) !important;
        scroll-margin-top: 5rem;
        padding-left: .8rem;
        position: relative;
      }

      :deep(h1::before),
      :deep(h2::before),
      :deep(h3::before) {
        content: '';
        position: absolute;
        width: .25rem;
        height: 80%;
        top: 10%;
        left: 0;
        background: var(--purple-200);
      }
      
      :deep(pre:has(code.hljs)),
      :deep(tr) {
        background-color: var(--gray-900);
      }

      :deep(pre) {
        max-height: 300px;
      }

      :deep(tr):nth-child(2n) {
        background-color: var(--gray-800);
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

    #article-content-skeleton {
      position: relative;
      border-radius: .375rem;
      border: 1px solid var(--gray-900);
      background: var(--gray-800);
      padding: 1.5rem;
      line-height: 2rem;
      // height: 30rem;
      display: flex;
      flex-wrap: wrap;
      counter-reset: finish-count;
      overflow: hidden;

      .article-content-skeleton-line, .article-content-skeleton-line-finish {
        border-radius: 2.5rem;
        height: 2rem;
        background: var(--gray-700);
        margin: 0 0 1.5rem;
      }

      .article-content-skeleton-line {
        width: 100%;
      }

      .article-content-skeleton-line-finish {
        counter-increment: finish-count;
        width: var(--w);
      }

      .article-content-skeleton-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: var(--gray-100);
        opacity: .45;
        animation: skeleton-cover-animation 2s ease-in-out 0s infinite normal none;
      }

      @keyframes skeleton-cover-animation {
        0%, 100% {
          opacity: .4;
        }
        50% {
          opacity: .6;
        }
      }
    }

    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 1000px;
      width: 100%;
      // margin: 0 auto;
      padding: 45px;
    }
  }

  #anchor {
    width: 15%;
    min-width: fit-content;
    position: sticky;
    top: 5rem;
    right: 0;
    height: fit-content;
    padding: .5rem 0 .5rem .5rem;
    background: var(--black-thin);
    border-radius: .375rem;
    border-top-left-radius: 0;
    font-size: .8rem;

    #control {
      width: 0;
      height: 0;
      display: none;
      input {
        display: none;
      }

      label {
        position: relative;
        width: 2rem;
        height: 2.5rem;
        background: var(--gray-900);
      }

      label::before {
        content: '>';
        position: absolute;
        color: var(--gray-300);
        border: 1px solid var(--gray-700);
        border-right-color: var(--black-thin);
        border-top-left-radius: .375rem;
        border-bottom-left-radius: .375rem;
        height: 100%;
        width: 100%;
        text-align: center;
        font-size: 1.5rem;
      }

      input:checked ~ label::before {
        content: '<';
      }
    }
    
    #navigation {
      width: 200px;

      ul {
        list-style: none;
        margin: 0;
        padding: .5rem 1.5rem .5rem 0;
        // max-width: 13.5rem;
        width: 12.5rem;
        transition: width .5s ease-in-out 0s;

        a {
          display: flex;
          align-items: center;
          width: 100%;
          margin-left: 1rem;
          position: relative;
          color: var(--gray-300);
          height: 1rem;
          padding: 1rem 0 1rem calc((var(--level) - 1) * 20px);
          transition: color .25s ease-in-out 0s;
          cursor: pointer;

          li {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            // height: 100%;
          }
        }

        a:before {
          content: '';
          position: absolute;
          top: 0;
          left: -1rem;
          height: 100%;
          width: .25rem;
          background: var(--black);
          transition: background .25s ease-in-out 0s;
        }

        a:hover {
          text-decoration: none;
        }

        a:hover,
        a.current {
          color: var(--purple-700);
        }

        a.current::before {
          background: var(--purple-700);
        }
      }
    }

    @include smallerScreen {
      position: fixed;
      width: fit-content;
      border: 1px solid var(--gray-700);
      border-right: none;
      transform: translateX(0);
      transition: transform .25s ease-in-out 0s;
      background: var(--gray-900);

      #control {
        width: fit-content;
        height: fit-content;
        display: inline-block;
        position: absolute;
        top: -1px;
        left: -31px; // 2rem - 1px
      }
    }
  }

  @include smallerScreen {
    #anchor:has(div input:checked) {
      transform: translateX(210px);
    }
  }
}
</style>