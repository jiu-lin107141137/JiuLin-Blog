<script setup>
import { useLangStore } from '../stores/lang';
import { storeToRefs } from 'pinia';
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  article: {
    type: Object,
    default: {
      "title" : "title",
      "summary" : "summary",
      "created_at" : "01/01/2023 00:00",
      "tags" : [
      ],
      "category" : 0
    },
    required: true,
  }
})

const langStore = useLangStore();
const { lang } = storeToRefs(langStore);

var blogConfig;
const loadding = ref(true);

const loadBlogConfig = async () => {
  loadding.value = true;
  if (lang.value == 'en')
    blogConfig = await import('@/assets/blog/en/config.json');
  else
    blogConfig = await import('@/assets/blog/tw/config.json');
  loadding.value = false;
}

loadBlogConfig();

watch(lang, async ( newValue, oldValue ) => {
  loadding.value = true;
  if (newValue == 'en')
    blogConfig = await import('@/assets/blog/en/config.json');
  else
    blogConfig = await import('@/assets/blog/tw/config.json');
  loadding.value = false;
});

const getTags = tagId => {
  if(loadding.value || !blogConfig)
    return [];
  return blogConfig.items.tags[tagId];
};

const getCategories = categoryId => {
  if(loadding.value || !blogConfig)
    return [];
  return blogConfig.items.categories[categoryId];
};

</script>

<template>
  <div class="article" @click.prevent="router.push('/article/'+article.url)">
    <div class="article_title">
      <span>{{ article.title }}</span>
    </div>
    <div class="article_time">
      <span class="material-symbols-outlined">
        person
      </span>
      JiuLin
      <span class="material-symbols-outlined">
        schedule
      </span>
      {{ article.created_at }}
      <span class="material-symbols-outlined">
        topic
      </span>
      {{ getCategories(article.category) }}
    </div>
    <hr>
    <div class="article_content">
      <div class="article_text_box">
        {{ article.summary }}
      </div>
    </div>
    <hr>
    <div class="article_tags">
      <div class="article_tag" v-for="tagId in article.tags" :key="tagId">
        <span class="material-symbols-outlined">
          sell
        </span>
        <span>
          {{ getTags(tagId) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  cursor: pointer;
  color: var(--gray-100);
  background: var(--gray-900);
  border-radius: 5px;
  border: 3px solid var(--gray-900);
  position: relative;

  hr {
    margin: .5rem 0;
    border: 1px solid var(--gray-700);
    transition: border-color .25s ease-in-out 0s;
  }

  .article_title {
    text-align: left;
    font-size: 1.3rem;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: color .25s ease-in-out 0s;
    position: relative;

    span {
      position: relative;
    }

    span::before {
      content: '';
      position: absolute;
      width: 0;
      height: 1.5px;
      top: 100%;
      left: 50%;
      background: var(--purple-700);
      transition: left .25s ease-in-out 0s,
                  width .25s ease-in-out 0s;
    }
  }

  .article_time {
    margin-top: 0.5rem;
    font-size: .8rem;
    color: var(--gray-400);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: .25rem;

    span:nth-child(n+2) {
      margin-left: .5rem;
    }
    
    span {
      font-size: .9rem;
    }
  }

  .article_content {
    overflow: hidden;
    color: var(--gray-400);

    .article_text_box {
      font-size: .8rem;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .article_images_box {
      aspect-ratio: 3 / 1;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      gap: 4%;
      margin: .5rem 0 0;

      .image_box {
        aspect-ratio: 1 / 1;
        /* width: clamp(100px, 30%, 200px); */
        width: 30%;
        border: 3px solid var(--gray-500);
      }

      .image_box:nth-child(n+4){
        display: none;
        width: 0;
        height: 0;
        opacity: 0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

  .article_content_imaged .article_text_box {
    -webkit-line-clamp: 2;
  }

  .article_tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 1rem;
    color: var(--gray-400);

    .article_tag {
      display: flex;
      flex-wrap: nowrap;
      border-radius: 3px;
      border: 1px solid var(--gray-500);
      overflow: hidden;
      align-items: center;

      span {
        padding: .2rem .3rem;
        font-size: .8rem;
        transition: color .25s ease-in-out 0s;
        color: var(--gray-300);
      }

      span:nth-child(1) {
        background: var(--gray-900);
        font-size: 1rem;
        border-right: 1px solid var(--gray-700);
      }
    }

    .article_tag:hover span {
      color: var(--purple-700);
    }
  }
}

.article::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  box-shadow: 0 0 2.5px 2.5px var(--purple-700);
  opacity: 0;
  transition: opacity .25s ease-in-out 0s;
}
.article:hover::before {
  opacity: 1;
}

.article:hover {

  hr {
    border-color: var(--purple-700);
  }

  .article_title {
    color: var(--purple-700);

    span::before {
      width: 100%;
      left: 0;
    }
  }
}
</style>
