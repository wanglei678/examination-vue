<script setup lang="ts">
  import { ElScrollbar } from 'element-plus';
  import { ref, provide } from 'vue';
  const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

  const initScroll = (value?: number) => {
    if (value === 0) {
      scrollbarRef?.value!.setScrollTop(0);
    }
  };

  provide('scrollSendGrandson', initScroll);
</script>
<template>
  <div class="detail-page">
    <el-scrollbar class="scrollbar" ref="scrollbarRef">
      <div class="inner">
        <slot></slot>
      </div>
    </el-scrollbar>
  </div>
</template>
<style scoped lang="less">
  .scrollbar {
    height: 100vh;
  }
  .inner {
    padding: 20px 10px;
    min-width: 1200px;
    box-sizing: border-box;
  }
</style>
