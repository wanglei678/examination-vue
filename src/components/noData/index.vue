<template slot="empty">
  <div class="nodata">
    <img :width="imgWidth" src="../../assets/noData.png" alt="">
    <span class="font-color">暂无数据</span>
  </div>
</template>

<script setup lang='ts'>
  import { ref  } from 'vue';
  withDefaults(
    defineProps<{
      width?: number;
    }>(),
    {
      width: 120
    }
  );
  const imgWidth = ref(120)
</script>

<style lang='less' scoped>
.nodata {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  img {
      margin-bottom: 10px;
  }
  span {
    margin-bottom: 20px;
    font-size: 12px;
  }
  .font-color {
    color: #97a1ad;
  }
}
</style>
