<script setup lang="ts">
  import { showError, showSuccess } from '@/utils/message';
  import { onMounted, ref } from 'vue';
  // 测试随机真题模拟及密卷
  // import { queryUserLists, getTrueTopicsRandomly, getSimulationRandomly, getDenseVolumeRandomly, addExamRecord, queryExamRecord } from '@api/userList';
  import { queryUserLists } from '@api/userList';
  import { deleteUser } from '@api/deleteUser';
  import { addUsers } from '@api/addUser';
  import { changePwd } from '@api/changePwd';
  import Dialog from '@components/Dialog/index.vue';
  import getFormOptions from './getUserFormOptions';
  import getManagerFormOptions from './getManagerFormOptions';
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
  const editPwdRowData = ref();
  const total = ref(0);
  const pageSize = ref(20);
  const currentPage = ref(1);
  const editPwdDialogVisible = ref(false);
  const dialogVisible = ref(false);
  const addManagerdialogVisible = ref(false);
  const dialogLoading = ref(false);
  const userFormOptions: any = ref([]);
  const managerFormOptions: any = ref([]);
  const editPwdFormOptions: any = ref([]);
  const formEl = ref();
  const phoneNum = ref();
  const editPwdFormEl = ref();
  const formElManager = ref();
  onMounted(() => {
    window.document.title = '用户管理';
    getTableData();
    // 测试随机真题模拟及密卷
    // getTrueTopicsRandomly({grade: '1'})
    // getSimulationRandomly({grade: '1'})
    // getDenseVolumeRandomly({grade: '1'})
    // addExamRecord({
    //   userId: 1,
    //   grade: 1,
    //   examType: 1,
    //   score: 99
    // })
    // queryExamRecord({
    //   userId: 1,
    //   grade: 1,
    //   examType: 1
    // })
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
      phone: phoneNum.value,
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
          let passStr: any = values.idNo.substring((values.idNo.length - 6), values.idNo.length);
          let params: any = {
            username: values.username,
            phone: values.phone,
            password: passStr,
            idNo: values.idNo,
            grade: values.grade,
            role: 'student'
          }
          dialogVisible.value = false;
          await addUsers(params);
          showSuccess('添加成功');
          selectTableData();
          dialogLoading.value = false;
        } catch (e) {
          dialogLoading.value = false;
          showError(e);
        }
      }
    })
  };
  const confirmManager = async () => {
    formElManager.value.validate(async (valid: boolean, values: any) => {
      if (valid) {
        try {
          dialogLoading.value = true;
          let params: any = {
            username: values.username,
            phone: values.phone,
            password: values.password,
            role: 'manager'
          }
          addManagerdialogVisible.value = false;
          await addUsers(params);
          showSuccess('添加成功');
          selectTableData();
          dialogLoading.value = false;
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
  const addManager = () => {
    managerFormOptions.value = getManagerFormOptions();
    addManagerdialogVisible.value = true;
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
  const editBtnClick = (row: any) => {
    editPwdRowData.value = row;
    editPwdFormOptions.value = [
      {
        label: '新密码',
        prop: 'password',
        rules: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        placeholder: '请输入新密码'
      },
    ];
    editPwdDialogVisible.value = true;
  }
  const confirmEditPwd = () => {
    editPwdFormEl.value.validate(async (valid: boolean, values: any) => {
      if (valid) {
        try {
          dialogLoading.value = true;
          let params: any = {
            password: values.password,
            id: editPwdRowData.value.id
          }
          editPwdDialogVisible.value = false;
          await changePwd(params);
          showSuccess('修改密码成功');
          dialogLoading.value = false;
        } catch (e) {
          editPwdDialogVisible.value = false;
          dialogLoading.value = false;
          showError(e);
        }
      }
    })
  }
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
          <el-input
            class="pile-num"
            placeholder="请输入手机号"
            v-model.trim="phoneNum"
            clearable
          ></el-input>
          <el-button @click="selectTableData()" type="primary">查询</el-button>
        </div>
        <div>
          <el-button @click="add()" type="primary">新增用户</el-button>
          <el-button @click="addManager()" type="primary">新增管理员</el-button>
        </div>
      </div>
    </el-row>
    <el-table :data="userList" stripe border align="center">
      <el-table-column prop="id" label="用户id" align="center" width="80"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="role" label="角色" align="center"></el-table-column>
      <el-table-column prop="idNo" label="身份证" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.idNo == 'null' ? '--' : scope.row.idNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报考等级" align="center">
        <template v-slot="scope">
          <span v-if="scope.row.grade == 1">初级监控</span>
          <span v-else-if="scope.row.grade == 2">中级监控</span>
          <span v-else-if="scope.row.grade == 3">中级维保</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <div>
            <el-popconfirm title="确认删除该用户?" @confirm="() => deleteUserClick(scope.row)">
              <template #reference>
                <el-button size="mini" type="primary">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button size="mini" @click="editBtnClick(scope.row)" type="primary">修改密码</el-button>
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
    <Dialog
      title="新增管理员"
      v-model:dialogVisible="addManagerdialogVisible"
      :loading="dialogLoading"
      @confirm="confirmManager">
      <Form :options="managerFormOptions" ref="formElManager" />
    </Dialog>
    <Dialog
      title="修改密码"
      v-model:dialogVisible="editPwdDialogVisible"
      :loading="dialogLoading"
      @confirm="confirmEditPwd">
      <Form :options="editPwdFormOptions" ref="editPwdFormEl" />
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