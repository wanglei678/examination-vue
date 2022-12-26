<script lang="ts" setup>
  import { PropType, ref, onMounted, reactive, inject } from 'vue';

  import { showError } from '@utils/message';
  import Search from '../Search/index.vue';
  import Table from '../Table/index.vue';
  import Pagination from '../Pagination/index.vue';
  import { Layout } from '../layout';

  const scrollSendGrandson:any = inject('scrollSendGrandson');

  const { options } = defineProps({
    options: {
      type: Object as PropType<Layout.ProTableOptions>,
      required: true
    }
  });

  // 初始化搜索参数
  const queryParams: Record<string, any> = { ...options.query };

  options.searchOptions?.params?.forEach((item) => {
    queryParams[item.name] = item.defaultValue || '';
  });

  const fetchParams = ref(queryParams);

  const tableOptions = reactive({
    data: [],
    columns: options.columns,
    loading: true
  });

  const total = ref(0);

  const findData = (data: any) => {
    if (data instanceof Array) {
      return data;
    }
    const keyList = ['content']; // 维护一个可能是tableData的key列表
    for (let i = 0; i < keyList.length; i++) {
      const key = keyList[i];
      if (data[key] instanceof Array) {
        return data[key];
      }
    }
  };

  const search = async (searchParams: Record<string, any>) => {
    try {
      tableOptions.loading = true;
      const _params: { [k: string]: any } = { page: 0, pageSize: 20, ...fetchParams.value, ...searchParams };
      if (options.hasPagination === false) {
        delete _params.page;
        delete _params.pageSize;
      }
      if (_params.daterange) {
        const [startTime, endTime] = _params.daterange;
        const [startTimeKey, endTimeKey] = options.daterangeKey || [];
        _params[startTimeKey || 'startTime'] = startTime;
        _params[endTimeKey || 'endTime'] = endTime;
        delete _params.daterange;
      }
      const res = await options.request(_params);
      const data = findData(res.data);
      tableOptions.data = data;
      total.value = res.totalElements || res.data.totalElements || data.length;
      tableOptions.loading = false;
    } catch (e) {
      tableOptions.loading = false;
      showError(e);
    }
  };

  onMounted(async () => {
    search({ page: 0 });
  });

  const onSearch = (searchParams: Record<string, any>) => {
    // 解构proxy
    Object.keys(searchParams).forEach((k) => (fetchParams.value[k] = searchParams[k]));
    fetchParams.value.page = 0;
    search({ ...fetchParams.value });
  };

  const onPageChange = (page: number) => {
    fetchParams.value.page = page - 1;
    search({ page: page - 1 });
    scrollSendGrandson(0);
  };

  const onReload = () => {
    search(fetchParams.value);
  };

  const emit = defineEmits<{
    (e: 'add'): void;
  }>();

  const onAdd = () => {
    emit('add');
  };

  const style = {
    marginTop: options.searchOptions ? '20px' : '0',
    marginBottom: options.hasPagination !== false ? '20px' : '0'
  };

  defineExpose({
    reload: onReload
  });
</script>
<template>
  <Search class="search" v-if="options.searchOptions" :options="options.searchOptions" :loading="tableOptions.loading" @search="onSearch" @add="onAdd">
    <template #extension="params">
      <slot name="searchExtension" v-bind="params"></slot>
    </template>
  </Search>
  <Table class="table" :options="tableOptions">
    <template v-for="(item, name) in $slots" :key="name" v-slot:[name]="scope">
      <slot :name="name" v-bind="scope" :reload="onReload" />
    </template>
  </Table>
  <Pagination v-if="options.hasPagination !== false" class="pagination" layout="prev, pager, next" :total="total" :page-size="20" :current-page="fetchParams.page ? fetchParams.page + 1 : 1" @current-change="onPageChange" />
</template>
<style scoped lang="less">
  .table {
    margin-top: v-bind('style.marginTop');
    margin-bottom: v-bind('style.marginBottom');
  }
</style>
