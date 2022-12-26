<script lang="ts" setup>
  import { PropType, reactive } from 'vue';
  import { ElSelect, ElOption, ElInput, ElDatePicker, ElButton } from 'element-plus';
  import { Layout } from '../layout';
  import ChannelSelect from '../UI/ChannelSelect/index.vue';
  import VehicleTypeSelect from '../UI/VehicleTypeSelect/index.vue';
  import ChangeLogOperTypeSelect from '../UI/ChangeLogOperType/index.vue';
  import ChangeLogChannelTypeSelect from '../UI/ChangeLogChannelType/index.vue';
  import ErrorCodeCategoryTypeSelect from '../UI/ErrorCodeCategoryType/index.vue';

  const props = defineProps({
    options: {
      type: Object as PropType<Layout.SearchOptions>,
      required: true
    },
    loading: Boolean
  });

  const params = reactive<Record<string, any>>({});

  props.options.params?.forEach((item) => {
    params[item.name] = item.defaultValue ?? '';
  });

  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
  };

  const emit = defineEmits<{
    (e: 'search', params: any): void;
    (e: 'add'): void;
  }>();

  const onSearch = () => {
    emit('search', params);
  };

  const onAdd = () => {
    emit('add');
  };
</script>
<template>
  <div class="search">
    <el-button type="primary" plain v-if="options.hasAdd" @click="onAdd">{{
      options.addText || '新增'
    }}</el-button>
    <template v-if="options.params">
      <div
        class="params-item"
        v-for="searchItem in options.params"
        :key="searchItem.name"
        :style="{ width: searchItem.width + 'px' || 'auto' }"
      >
        <channel-select
          v-if="searchItem.type === 'channelSelect'"
          :placeholder="searchItem.placeholder"
          :default-value="searchItem.defaultValue"
          clearable
          v-model="params[searchItem.name]"
        />
        <change-log-oper-type-select
          v-if="searchItem.type === 'changeLogOperTypeSelect'"
          :placeholder="searchItem.placeholder"
          :default-value="searchItem.defaultValue"
          clearable
          v-model="params[searchItem.name]"
        />
        <change-log-channel-type-select
          v-if="searchItem.type === 'changeLogChannelTypeSelect'"
          :placeholder="searchItem.placeholder"
          :default-value="searchItem.defaultValue"
          clearable
          v-model="params[searchItem.name]"
        />
        <error-code-category-type-select
          v-if="searchItem.type === 'ErrorCodeCategoryTypeSelect'"
          :placeholder="searchItem.placeholder"
          :default-value="searchItem.defaultValue"
          clearable
          v-model="params[searchItem.name]"
        />
        <vehicle-type-select
          v-if="searchItem.type === 'vehicleTypeSelect'"
          :placeholder="searchItem.placeholder"
          :default-value="searchItem.defaultValue"
          clearable
          v-model="params[searchItem.name]"
        />

        <el-select
          v-if="searchItem.type === 'enum'"
          :placeholder="searchItem.placeholder"
          :default-value="searchItem.defaultValue"
          :clearable="searchItem.clearable !== undefined ? searchItem.clearable : true"
          v-model="params[searchItem.name]"
        >
          <el-option
            v-for="item in searchItem.selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-input
          v-if="searchItem.type === 'text' || searchItem.type === 'number'"
          :type="searchItem.type"
          :maxlength="searchItem.maxLength"
          :placeholder="searchItem.placeholder"
          :default-value="searchItem.defaultValue"
          clearable
          v-model="params[searchItem.name]"
        />

        <el-date-picker
          v-if="searchItem.type === 'date'"
          v-model="params[searchItem.name]"
          type="date"
          :placeholder="searchItem.placeholder"
          :disabledDate="disabledDate"
          :default-value="searchItem.defaultValue"
          value-format="YYYY-MM-DD"
          :clearable="false"
        />

        <el-date-picker
          v-if="searchItem.type === 'daterange'"
          v-model="params[searchItem.name]"
          :default-value="searchItem.defaultValue"
          unlink-panels
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          :disabledDate="disabledDate"
          :clearable="false"
        />
      </div>
      <el-button type="primary" plain @click="onSearch" :loading="loading">{{
        options.searchBtnText || '查询'
      }}</el-button>
      <slot name="extension" v-bind="params"></slot>
    </template>
  </div>
</template>

<style lang="less" scoped src="./index.less"></style>
