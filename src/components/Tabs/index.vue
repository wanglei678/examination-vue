<script setup lang="ts">
  import { ElTabs, ElTabPane } from 'element-plus';
  import { ref } from 'vue';

  type Tab = {
    label: string;
    slot: string;
  };
  const props = defineProps<{ tabs: Tab[]; modelValue?: string }>();

  const emit = defineEmits<{
    (e: 'tab-click', tab: any, event: any): void;
  }>();

  const handleClick: (tab: any, event: any) => void = (tab, event) => {
    emit('tab-click', tab, event);
  };

  const isControlled = ref(props.modelValue ? true : false); // 是否受控
</script>
<template>
  <el-tabs type="border-card" @tab-click="handleClick" :model-value="modelValue" v-bind="$attrs">
    <template v-if="isControlled">
      <el-tab-pane v-for="item in tabs" :key="item.slot" :label="item.label" lazy :name="item.slot">
        <slot :name="item.slot"></slot>
      </el-tab-pane>
    </template>
    <template v-else>
      <el-tab-pane v-for="item in tabs" :key="item.slot" :label="item.label" lazy>
        <slot :name="item.slot"></slot>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>
