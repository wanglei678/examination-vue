<script lang="ts" setup>
  import {
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElDatePicker,
    ElSwitch,
    ElCheckboxGroup,
    ElCheckbox,
    ElRadioGroup,
    ElRadio
  } from 'element-plus';
  import { reactive, PropType, ref, watch } from 'vue';
  import { Layout } from '../layout';

  const props = defineProps({
    checkBoxLoad: {
      type: Boolean,
      default() {
        return false
      }
    },
    options: {
      type: Array as PropType<Layout.FormOptionsItem[]>,
      required: true
    }
  });

  const formValue: { [k: string]: any } = reactive({});

  props.options.forEach((item) => {
    if (item.type === 'checkbox') {
      formValue[item.prop] = item.defaultValue || [];
    } else {
      formValue[item.prop] = item.defaultValue;
    }
  });

  const formEl = ref();

  const validate = (callback: (valid: boolean, formValue: { [k: string]: any }) => void) => {
    formEl.value.validate((valid: boolean) => {
      const values: { [k: string]: any } = {};
      Object.keys(formValue).forEach((k) => {
        values[k] = formValue[k];
      });
      callback(valid, values);
    });
  };

  const emit = defineEmits<{
    (e: 'update', value: any): void;
  }>();

  watch(formValue, () => {
    emit('update', formValue);
  });

  defineExpose({
    validate
  });
</script>
<template>
  <el-form label-position="top" ref="formEl" :model="formValue" status-icon class="form">
    <template v-for="item in options" :key="item.prop">
      <el-form-item v-bind="item" v-if="!item.hide">
        <el-input
          v-if="item.type === 'number'"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          v-model.number="formValue[item.prop]"
          autocomplete="off"
        ></el-input>

        <el-input
          v-if="item.type === 'textarea'"
          type="textarea"
          :rows="2"
          autosize
          :maxlength="item.maxLength"
          :placeholder="item.placeholder"
          show-word-limit
          v-model="formValue[item.prop]"
          autocomplete="off">
        </el-input>

        <el-select
          v-else-if="item.type === 'enum'"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :filterable ="item.filterable"
          clearable
          v-model="formValue[item.prop]">
          <el-option
            v-for="d in item.selectOptions"
            :key="d.value"
            :label="d.label"
            :value="d.value"
          />
        </el-select>

        <el-switch
          v-else-if="item.type === 'switch'"
          :disabled="item.disabled"
          v-model="formValue[item.prop]"/>

        <el-checkbox-group
          v-else-if="item.type === 'checkbox' && item.checkList && item.checkList.length > 0"
          v-model="formValue[item.prop]"
          v-loading="checkBoxLoad">
          <el-checkbox
            v-for="checkboxEl in item.checkList"
            :key="checkboxEl.label"
            :label="checkboxEl.label"
            :disabled="checkboxEl.disabled"
            >{{ checkboxEl.text || checkboxEl.label }}
          </el-checkbox>
        </el-checkbox-group>

        <el-radio-group
          v-else-if="item.type === 'radioGroup' && item.checkList && item.checkList.length > 0"
          :disabled="item.disabled"
          v-model="formValue[item.prop]">
          <el-radio  v-for="checkboxEl in item.checkList"
            :key="checkboxEl.label"
            :label="checkboxEl.label"
            >{{ checkboxEl.text || checkboxEl.label }}</el-radio>
        </el-radio-group>

        <el-date-picker
          v-else-if="item.type === 'date'"
          :disabled="item.disabled"
          v-model="formValue[item.prop]"
          value-format="YYYY-MM-DD"
          type="date"
          :placeholder="item.placeholder"
          clearable
          :disabledDate="item.disabledDate"/>

        <el-date-picker
          v-else-if="item.type === 'daterange'"
          v-model="formValue[item.prop]"
          :default-value="item.defaultValue"
          unlink-panels
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          :disabled="item.disabled"
          :disabledDate="item.disabledDate"/>

        <el-input
          v-else-if="item.type === 'email'"
          v-model="formValue[item.prop]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          clearable>
          <template #append>@xxx.com</template>
        </el-input>

        <el-input
          v-else-if="!item.type"
          :maxlength="item.maxLength"
          v-model="formValue[item.prop]"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </template>
  </el-form>
</template>
