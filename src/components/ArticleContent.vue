<script setup>
import { useRoute } from 'vue-router';
import { useLangStore } from '../stores/lang';
import { storeToRefs } from 'pinia';
import { ref, watch, computed } from 'vue';
import axios from 'axios';

const route = useRoute();
const langStore = useLangStore();
const { lang } = storeToRefs(langStore);
var blogConfig, articleContent = ref('');
const loading = ref(true);

(async () => {
  loading.value = true;
  if (lang.value === 'en') {
    blogConfig = import('../assets/blog/en/config.json');
  }
  else {
    blogConfig = import('../assets/blog/tw/config.json');
  }
  loading.value = false;
})();

watch(lang, async(newV, oldV) => {
  loading.value = true;
  if (newV === 'en') {
    blogConfig = import('../assets/blog/en/config.json');
  }
  else {
    blogConfig = import('../assets/blog/tw/config.json');
  }
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
    console.log(res);
    res_content = res.data;
  }).catch(e => {
    console.log(e);
  });
  console.log(res_content);
}

getMdFile()

</script>