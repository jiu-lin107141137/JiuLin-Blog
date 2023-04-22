<script setup>

</script>

<template>
  <div class="article">
    <div class="article_title">
      <span>Lorem ipsum dolor sit.</span>
    </div>
    <div class="article_time">
      <small><i class="fas fa-clock"></i> 08/04/23 11:09:42</small>
    </div>
    <hr>
    <div class="article_content">
      <div class="article_text_box">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum delectus dolores fugit. Atque provident expedita maxime libero? Labore quidem consequatur similique, qui, id natus, aspernatur voluptatum nihil laborum itaque atque.
      </div>
    </div>
    <hr>
    <div class="article_tags">
      <div class="article_tag">
        <span class="material-symbols-outlined">
          sell
        </span>
        <span>
          Motion
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
  // background: var(--gray-900);
  border-radius: 5px;
  border: 3px solid var(--gray-900);
  position: relative;

  hr {
    margin: .5rem 0;
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
      height: 2px;
      top: 100%;
      left: 50%;
      background: var(--purple-700);
      transition: left .25s ease-in-out 0s,
                  width .25s ease-in-out 0s;
    }
  }

  .article_time {
    margin-top: 0.5rem;
    font-size: .9rem;
    color: var(--gray-400);
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

      span {
        padding: .2rem .3rem;
        font-size: .8rem;
        transition: color .25s ease-in-out 0s;
      }

      span:nth-child(1) {
        background: var(--gray-900);
        color: var(--gray-100);
        font-size: 1.25rem;
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
  .article_title {
    color: var(--purple-700);

    span::before {
      width: 100%;
      left: 0;
    }
  }
}
</style>
