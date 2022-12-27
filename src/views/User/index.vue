<script setup lang="ts">
  import { showError, showSuccess } from '@/utils/message';
  import { onMounted, ref } from 'vue';
  import { queryUserLists } from '@api/userList';
  import { deleteUser } from '@api/deleteUser';
  import { addUsers } from '@api/addUser';
  import Dialog from '@components/Dialog/index.vue';
  import getFormOptions from './getUserFormOptions';
  import Form from '@components/Form/index.vue';
  import {
    ElInput,
    ElButton,
    ElRow,
    ElPagination,
    ElTableColumn,
    ElPopconfirm,
    ElTable
  } from 'element-plus';
  const loading = ref(false);
  const userList: any = ref([]);
  const userName = ref();
  const total = ref(0);
  const pageSize = ref(20);
  const currentPage = ref(1);
  const dialogVisible = ref(false);
  const dialogLoading = ref(false);
  const userFormOptions: any = ref([]);
  const formEl = ref();
  onMounted(() => {
    window.document.title = '用户管理';
    getTableData();
  });
  const formatDate = (times: any) => {
    let time: any =Date.parse(times)
    let date: any = new Date(time);
    let YY: any = date.getFullYear() + '-';
    let MM: any = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let DD: any = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    let hh: any = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let mm: any = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let ss: any = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
  }
  const getTableData = () => {
    loading.value = true;
    let params: any = {
      userName: userName.value,
      pageIndex: currentPage.value - 1,
      pageSize: pageSize.value
    }
    queryUserLists(params).then(res => {
      userList.value = res.data[0] || [];
      userList.value.map((item: any) => {
        item.create_time = formatDate(item.create_time);
      })
      total.value = res.data[1][0].total || res.data[1][0]['count(*)'] || 0;
      loading.value = false;
    }).catch(error => {
      loading.value = false;
      showError(error)
    })
  };
  const confirm = async () => {
    formEl.value.validate(async (valid: boolean, values: any) => {
      if (valid) {
        try {
          dialogLoading.value = true;
          let params: any = {
            username: values.username,
            password: values.password
          }
          let res = await addUsers(params);
          showSuccess('添加用户成功');
          selectTableData();
          dialogLoading.value = false;
          dialogVisible.value = false;
        } catch (e) {
          dialogLoading.value = false;
          showError(e);
        }
      }
    })
  };
  const selectTableData = () => {
    currentPage.value = 1;
    getTableData();
  };
  const add = () => {
    userFormOptions.value = getFormOptions();
    dialogVisible.value = true;
  };
  const deleteUserClick = (row: any) => {
    let params: any = {
      id: row.id
    }
    deleteUser(params).then(res => {
      showSuccess('删除成功');
      getTableData();
      loading.value = false;
    }).catch(error => {
      loading.value = false;
      showError(error);
    })
  };
</script>
<template>
  <div v-loading="loading">
    <el-row>
      <div class="select-flex">
        <div>
          <el-input
            class="pile-num"
            placeholder="请输入用户名"
            v-model.trim="userName"
            clearable
          ></el-input>
          <el-button @click="selectTableData()" type="primary">查询</el-button>
        </div>
        <div>
          <el-button @click="add()" type="primary">新增</el-button>
        </div>
      </div>
    </el-row>
    <el-table :data="userList" stripe border align="center">
      <el-table-column prop="id" label="用户id" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <div>
            <el-popconfirm title="确认删除该用户?" @confirm="() => deleteUserClick(scope.row)">
              <template #reference>
                <el-button size="mini" type="primary">删除</el-button>
              </template>
            </el-popconfirm>
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
      title="新增用户"
      v-model:dialogVisible="dialogVisible"
      :loading="dialogLoading"
      @confirm="confirm">
      <Form :options="userFormOptions" ref="formEl" />
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
<style lang="less" src="./index.less" scoped></style>
