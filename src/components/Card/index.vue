<script setup lang="ts">
  defineProps({
    title: String,
    top: Number
  });
</script>

<template>
  <div class="card" :style="{ marginTop: top + 'px' }">
    <div class="header" v-if="$slots.header || title">
      <slot name="header">
        <div class="title">
          {{ title }}
        </div>
        <div class="header-right">
          <slot name="headerRight"></slot>
        </div>
      </slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped src="./index.less"></style>
