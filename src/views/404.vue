<script lang="ts" setup>
  import { useStore } from '@/store';
  import { computed } from 'vue';
  const { state } = useStore();
  const code = computed(() => state.menuIndexCode);
</script>
<template>
  <div class="wrap">
    <div>
      <div class="title">页面不存在</div>
      <router-link class="link" :to="`/${code}`">返回首页</router-link>
    </div>
  </div>
</template>
<style scoped lang="less">
  .wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .title {
    font-size: 48px;
    text-align: center;
    color: #000;
  }
  .link {
    margin-top: 20px;
    display: block;
  }
</style>
