<script setup>
import { useI18n } from 'vue-i18n';
import { useLangStore } from '../stores/lang';
import { useQueryStore } from '../stores/query';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { computed, watch, ref } from 'vue';

const route = useRoute();
const router = useRouter();

const langStore = useLangStore();
const { lang } = storeToRefs(langStore);
const queryStore = useQueryStore();

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

const getTags = computed(() => {
  if(loadding.value || !blogConfig)
    return [];

  let tags = [];
  blogConfig.items.tags.forEach(tagName => {
    tags.push({
      'tagName': tagName,
      'tagCount': 0,
    });
  });

  blogConfig.articles.forEach(article => {
    article.tags.forEach(tagId => tags[tagId].tagCount++)
  });

  return tags;
});

const getCategories = computed(() => {
  if(loadding.value || !blogConfig)
    return [];

  let categories = [];
  blogConfig.items.categories.forEach(categoryName => {
    categories.push({
      'categoryName': categoryName,
      'categoryCount': 0,
    });
  });

  blogConfig.articles.forEach(article => categories[article.category].categoryCount++);

  return categories;
});

const getArticlesCount = computed(() => loadding.value || !blogConfig ? 0 : blogConfig.articles.length);

const toTagQuery = async id => {
  queryStore.initTag(id);
  if(route.name != 'tagQuery')
    router.push({
      name: 'tagQuery',
      // state: {
      //   tagId: id
      // }
    });
}

const toCategoryQuery = async id => {
  queryStore.initCategory(id);
  if(route.name != 'categoryQuery')
    router.push({
      name: 'categoryQuery',
      // state: {
      //   tagId: id
      // }
    });
}

</script>

<template>
  <div id="profiles">
    <div id="avatar">
      <img src="@/assets/image/skadiAvatar.jpg" alt="avatar">
    </div>
    <h3 id="owner-name">JiuLin</h3>
    <h4 id="quote">
      私たちには何も守れないわ。あの平和な未来に、ただ望みを託すことしかできないの。
    </h4>
    <div id="articles-friends">
      <div>
        <span> {{ $t('home.profile.title.articles') }} </span>
        <span>{{ getArticlesCount }}</span>
      </div>
      <div></div>
      <div>
        <span> {{ $t('home.profile.title.friends') }} </span>
        <span>3</span>
      </div>
    </div>
    <div class="statistics-container">
      <div class="head">
        <span class="material-symbols-outlined">
          topic
        </span>
        <span>
          {{ $t('home.profile.title.categories') }} 
        </span>
      </div>
      <div class="statistics-body">
        <div class="category" 
            v-for="(category, index) in getCategories" 
            :key="category.categoryName" 
            @click.stop="toCategoryQuery(index)">
          <span>{{ category.categoryName }}</span>
          <span>{{ category.categoryCount }}</span>
        </div>
      </div>
    </div>
    <div class="statistics-container">
      <div class="head">
        <span class="material-symbols-outlined">
          sell
        </span>
        <span>
          {{ $t('home.profile.title.tags') }} 
        </span>
      </div>
      <div id="tags-body" class="statistics-body">
        <div class="tag" v-for="(tag, ind) in getTags" :key="tag.tagName" @click.stop="toTagQuery(ind)">
          <span>{{ tag.tagName }}</span>
          <span>{{ tag.tagCount }}</span>
        </div>
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

#profiles {
  width: 25%;
  min-width: 250px;
  max-width: 414px;
  height: fit-content;
  // position: sticky;
  // top: calc(-1000px + 100vh);
  // left: 0;
  // background: var(--gray-900);
  background: var(--black-thin);
  border-radius: .5rem;
  box-shadow: 0 0 .125rem .125rem var(--black);
  color: var(--gray-100);
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  @include smallerScreen {
    position: relative;
    top: 0;
    width: 100% !important;
    max-width: none !important;
  }

  #avatar {
    aspect-ratio: 1 / 1;
    width: clamp(100px, 100%, 300px);
    height: min-content;
    border-radius: 50%;
    border: 5px solid var(--purple-300);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: center;
      object-position: center;
    }
  }

  #owner-name {
    margin-top: 1rem;
    color: var(--gray-100);
    width: 100%;
    text-align: center;
  }

  #quote {
    background: var(--black-thin);
    border-radius: .5rem;
    border: 3px solid var(--gray-900);
    text-align: center;
    margin-top: 1rem;
    padding: .5rem;
    color: var(--gray-400);
    font-size: 1rem;
  }

  #articles-friends {
    width: 100%;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    gap: 10px;

    div:nth-child(2n+1) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      span {
        width: 100%;
        text-align: center;
      }

      span:first-child {
        text-transform: uppercase;
      }

      span:last-child {
        font-size: 1.5rem;
      }
    }

    div:nth-child(2) {
      width: 1px;
      height: 100%;
      background: var(--gray-700);
    }
  }

  .statistics-container {
    width: 100%;
    margin-top: 2.5rem;

    .head {
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: .5rem; 
      color: var(--gray-400);
      text-transform: capitalize;

      :first-child {
        font-size: 1.5rem;
      }
    }

    #tags-body {
      display: flex;
      flex-wrap: wrap;
      gap: .325rem;
    }

    .statistics-body {
      margin-top: 1rem;

      .category {
        margin-top: .5rem;
        margin-left: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        transition: transform .25s ease-in-out 0s;
        cursor: pointer;
        font-size: .8rem;

        @include smallerScreen {
          margin-left: 2rem;
          width: 50%;
        }

        @include phoneScreen {
          width: 90%;
        }

        span:first-child {
          text-transform: capitalize;
          transition: color .25s ease-in-out 0s;
        }

        span:last-child {
          width: 4ch;
          border-radius: 5px;
          background: var(--purple-300);
          padding: .2rem .5rem;
          text-align: center;
        }
      }

      .category:hover {
        transform: scale(1.15);

        span:first-child {
          color: var(--purple-700);
        }
      }

      .tag {
        display: inline-flex;
        border-radius: 3px;
        border: 1px solid var(--gray-500);
        cursor: pointer;
        overflow: hidden;
        margin-top: .375rem;

        span {
          padding: .2rem .5rem;
          font-size: .8rem;
        }

        span:first-child {
          border-right: 1px solid var(--gray-500);
          transition: all .25s ease-in-out 0s;
        }
      }

      .tag:hover  span:first-child{
        background: var(--purple-300);
      }
    }
  }
}

#profiles::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0 0 2.5px 2.5px var(--purple-700);
  opacity: 0;
  transition: opacity .25s ease-in-out 0s;
}

#profiles:hover::before {
  opacity: 1;
}
</style>
