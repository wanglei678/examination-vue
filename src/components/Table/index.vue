<script lang="ts" setup>
  import { ref, PropType, VNode } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus';
  import { Layout } from '../layout';

  defineProps({
    options: {
      type: Object as PropType<Layout.TableOptions<any>>,
      required: true
    }
  });

  const formatter = (
    row: any,
    column: any,
    cellValue: any,
    index: number,
    item: Layout.columnsItem
  ) => {
    if (item.formatter) {
      return item.formatter(row, column, cellValue, index);
    }
    if (cellValue === '' || cellValue === undefined || cellValue === null) {
      return '-';
    }
    return cellValue;
  };
</script>
<template>
  <div class="table">
    <el-table
      class="table-inner"
      stripe
      :border="true"
      :data="options.data"
      style="width: 100%"
      v-loading="options.loading"
      v-bind="$attrs"
    >
      <template v-for="item in options.columns" :key="item.key">
        <el-table-column v-bind="item" v-if="item.slot">
          <template #default="scope">
            <slot :name="item.slot" v-bind="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-bind="item"
          v-else
          :formatter="
            (row, column, cellValue, index) => formatter(row, column, cellValue, index, item)
          "
        />
      </template>
    </el-table>
  </div>
</template>
<style scoped lang="less" src="./index.less"></style>
