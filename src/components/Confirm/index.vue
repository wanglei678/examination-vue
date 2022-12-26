<script setup lang="ts">
  import { ElPopconfirm } from 'element-plus';
</script>
<template>
  <el-popconfirm class="confirm" v-bind="$attrs" confirmButtonText="确认" cancelButtonText="取消">
    <template #reference>
      <div class="inner">
        <slot></slot>
      </div>
    </template>
  </el-popconfirm>
</template>

<style lang="less" scoped>
  .confirm {
    :global(.el-popconfirm__main) {
      margin: 1rem 0;
      line-height: 1.7;
    }
    .inner {
      display: inline-block;
    }
  }
</style>
