<script setup lang="ts">
  import { showError, showSuccess } from '@/utils/message';
  import { onMounted, ref } from 'vue';
  import { operateList, addOperate, editOperate, deleteOperate } from '@api/operation';
  import Dialog from '@components/Dialog/index.vue';
  import Form from '@components/Form/index.vue';
  import {
    ElButton,
    ElPagination,
    ElTableColumn,
    ElPopconfirm,
    ElTable
  } from 'element-plus';
  const loading = ref(false);
  const operationList: any = ref([]);
  const editPwdRowData = ref();
  const total = ref(0);
  const pageSize = ref(20);
  const currentPage = ref(1);
  const editDialogVisible = ref(false);
  const dialogVisible = ref(false);
  const dialogLoading = ref(false);
  const editFormOptions: any = ref([]);
  const formOptions: any = ref([]);
  const editFormEl = ref();
  const formEl = ref();
  const getFormOptions = (data: any) => {
    return [
      {
        label: '操作类型',
        prop: 'operateType',
        rules: [{ required: true, message: '请输入操作类型', trigger: 'blur' }],
        defaultValue: data?.operateType,
        placeholder: '请输入操作类型'
      },
      {
        label: '视频名称',
        prop: 'videoName',
        rules: [{ required: true, message: '请输入视频名称', trigger: 'blur' }],
        defaultValue: data?.videoName,
        placeholder: '请输入视频名称'
      }
    ]
  }
  onMounted(() => {
    window.document.title = '实操管理-->中级维保实操';
    getTableData();
  });
  const formatDate = (times: any) => {
    let time: any = Date.parse(times);
    let date: any = new Date(time);
    let YY: any = date.getFullYear() + '-';
    let MM: any =
      (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let DD: any = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hh: any = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm: any = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let ss: any = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return YY + MM + DD + ' ' + hh + mm + ss;
  };
  const getTableData = () => {
    loading.value = true;
    let params: any = {
      type: '3',
      pageIndex: currentPage.value - 1,
      pageSize: pageSize.value
    };
    operateList(params)
      .then((res) => {
        operationList.value = res.data[0] || [];
        operationList.value.map((item: any) => {
          item.create_time = formatDate(item.create_time);
        });
        total.value = res.data[1][0].total || res.data[1][0]['count(*)'] || 0;
        loading.value = false;
      })
      .catch((error) => {
        loading.value = false;
        showError(error);
      });
  };
  const confirmEdit = async () => {
    editFormEl.value.validate(async (valid: boolean, values: any) => {
      if (valid) {
        try {
          dialogLoading.value = true;
          let params: any = {
            videoName: values.videoName,
            operateType: values.operateType,
            id: editPwdRowData.value.id
          };
          editDialogVisible.value = false;
          await editOperate(params);
          showSuccess('添加成功');
          selectTableData();
          dialogLoading.value = false;
        } catch (e) {
          dialogLoading.value = false;
          showError(e);
        }
      }
    });
  };
  const confirm = async () => {
    formEl.value.validate(async (valid: boolean, values: any) => {
      if (valid) {
        try {
          dialogLoading.value = true;
          let params: any = {
            videoName: values.videoName,
            operateType: values.operateType,
            type: '3'
          };
          dialogVisible.value = false;
          await addOperate(params);
          showSuccess('添加成功');
          selectTableData();
          dialogLoading.value = false;
        } catch (e) {
          dialogLoading.value = false;
          showError(e);
        }
      }
    });
  };
  const selectTableData = () => {
    currentPage.value = 1;
    getTableData();
  };
  const add = () => {
    formOptions.value = getFormOptions({});
    dialogVisible.value = true;
  };
  const deleteUserClick = (row: any) => {
    let params: any = {
      id: row.id
    };
    deleteOperate(params)
      .then((res) => {
        showSuccess('删除成功');
        getTableData();
        loading.value = false;
      })
      .catch((error) => {
        loading.value = false;
        showError(error);
      });
  };
  const editBtnClick = (row: any) => {
    editPwdRowData.value = row;
    editFormOptions.value = getFormOptions(row);
    editDialogVisible.value = true;
  };
</script>
<template>
  <div v-loading="loading">
    <div class="mb-10">
      <el-button @click="add()" type="primary">新增中级维保实操</el-button>
    </div>
    <el-table :data="operationList" stripe border align="center">
      <el-table-column prop="id" label="id" align="center" width="80"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="operateType" label="操作类型" align="center"></el-table-column>
      <el-table-column prop="videoName" label="视频名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <div>
            <el-popconfirm title="确认删除该数据?" @confirm="() => deleteUserClick(scope.row)">
              <template #reference>
                <el-button size="mini" type="primary">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button size="mini" @click="editBtnClick(scope.row)" type="primary">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="selectTableData"
      class="pagination-position"
      @current-change="getTableData"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <Dialog
      title="新增中级维保实操"
      v-model:dialogVisible="dialogVisible"
      :loading="dialogLoading"
      @confirm="confirm"
    >
      <Form :options="formOptions" ref="formEl" />
    </Dialog>
    <Dialog
      title="编辑中级维保实操"
      v-model:dialogVisible="editDialogVisible"
      :loading="dialogLoading"
      @confirm="confirmEdit"
    >
      <Form :options="editFormOptions" ref="editFormEl" />
    </Dialog>
  </div>
</template>
<style>
  .el-table th {
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: #3962d6 !important;
    color: #fff;
  }
</style>
<style lang="less" scoped>
  .mb-10 {
    margin-bottom: 15px;
  }
  .pagination-position {
    margin: 10px 0;
  }

  .task-list-container {
    width: 100%;
    display: flex;
    justify-content: center;
    min-height: 500px;
  }

  .el-container {
    padding: 0.2rem;
  }

  .pile-num {
    width: 180px;
    margin-right: 10px;
  }

  .select-flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
</style>
