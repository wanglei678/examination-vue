<script lang="ts" setup>
  import config from '/package.json';
</script>
<template>
  <footer class="footer"> 后台管理系统 </footer>
</template>

<style lang="less" scoped>
  .footer {
    height: @footer-height;
    border-top: 1px solid #d3d7cf;
    border-bottom: 1px solid #f6faf2;
    background: #f6faf2;
    padding-right: 10px;
    line-height: @footer-height;
    text-align: right;
  }
</style>
