<script setup>
import { useRoute } from 'vue-router';
import { useLangStore } from '../stores/lang';
import { storeToRefs } from 'pinia';
import { ref, watch, computed, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const langStore = useLangStore();
const { lang } = storeToRefs(langStore);
var blogConfig, articleContent = ref('');
const loading = ref(true);

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
})

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
  console.log(res_content);
}

onMounted(async() => {
  loading.value = true;
  // await getMdFile();
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
      <div id="article-content">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, aut voluptatibus. Facilis ipsa vero perspiciatis dicta, iusto, maxime eligendi dolorem inventore consequatur laborum laudantium sit! Sit optio blanditiis error et.
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
    color: var(--gray-100);
    text-align: left;
    margin: 2rem 0;
    padding: .5rem 1rem;

    div {
      width: 100%;
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
      color: var(--gray-300);
      background: var(--black-thin);

      .pair {
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
      height: 10rem;
      border-radius: .375rem;
      border: 1px solid var(--gray-900);
      background: var(--black-thin);
      color: var(--gray-300);
      padding: .5rem 1rem;
      line-height: 2rem;
    }
  }
}
</style>