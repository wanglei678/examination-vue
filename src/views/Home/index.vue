<script setup lang="ts">
  import { ref, provide } from 'vue';
  import Layout from '@components/Layout/index.vue';
  import { ThemeEnum } from '@utils/enum';
  const width = document.documentElement.clientWidth;
  const menuVisible = ref(width <= 500 ? false : true);
  provide('menuVisible', menuVisible);

  // 主题色
  const theme = ref(ThemeEnum.default);
  provide('theme', theme);
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>
