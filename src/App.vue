<script setup lang="ts">
  import { showLoading } from '@/utils/loading';
  import { ElConfigProvider } from 'element-plus';
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>

<style lang="less"></style>
