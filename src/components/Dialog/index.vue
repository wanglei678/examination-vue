<script setup lang="ts">
  import { ElDialog, ElButton } from 'element-plus';

  withDefaults(
    defineProps<{
      dialogVisible: boolean;
      title: string;
      loading?: boolean;
      destroy?: boolean; // 是否在关闭时销毁
      hasFooter?: boolean;
      width?: number;
    }>(),
    {
      hasFooter: true,
      width: 480,
      destroy: true,
      loading: false
    }
  );

  const emit = defineEmits<{
    (e: 'update:dialogVisible', dialogVisible: boolean): void;
    (e: 'confirm'): void;
  }>();

  const close = () => {
    emit('update:dialogVisible', false);
  };

  const confirm = () => {
    emit('confirm');
  };
</script>
<template>
  <el-dialog
    :model-value="dialogVisible"
    :append-to-body="true"
    :title="title"
    :destroy-on-close="destroy"
    :width="`${width}px`"
    @closed="close"
  >
    <slot></slot>
    <template #footer v-if="hasFooter">
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm" :loading="loading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
