<script setup lang="ts">
  import { ref, provide, onMounted } from 'vue';
  import Layout from '@components/Layout/index.vue';
  import { ThemeEnum } from '@utils/enum';
  import { showError } from '@/utils/message';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const width = document.documentElement.clientWidth;
  const menuVisible = ref(width <= 500 ? false : true);
  provide('menuVisible', menuVisible);

  
  onMounted(() => {
    // const expire = localStorage.getItem('expire') || '';
    // const timestamp = Math.round(new Date().valueOf() / 1000);
    // // 不在有效期内移除token
    // if (Number(expire) <= timestamp) {
    //   localStorage.removeItem('expire');
    //   localStorage.removeItem('token');
    //   console.log('token超时');
    //   showError('token超时');
    // } else {
    //   router.push('/user');
    // }
  });
  // 主题色
  const theme = ref(ThemeEnum.default);
  provide('theme', theme);
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>
