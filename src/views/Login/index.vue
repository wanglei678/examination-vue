<script setup lang="ts">
  import { ref } from 'vue';
  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { login } from '@api/login';
  import { showError, showSuccess } from '@/utils/message';
  import { onMounted } from 'vue';
  onMounted(() => {
    window.document.title = '登陆界面';
  });
  const router = useRouter();
  const ruleForm: { [k: string]: any } = ref({
    mobile: '',
    code: ''
  });
  const ruleForms = ref();
  const rules = {
    mobile: [{ required: true, message: '请输入账号' }],
    code: [{ required: true, message: '请输入密码' }]
  };
  const logins = () => {
    ruleForms.value.validate((valid: boolean) => {
      if (valid) {
        let params: any = {
          username: ruleForm.value.mobile,
          password: ruleForm.value.code
        }
        login(params).then(res => {
          if (res.message == '登录成功！'){
            showSuccess('登录成功！');
            localStorage.setItem('token', res.token);
            localStorage.setItem('expire', res.expiresIn);
            router.push('/user');
          } else {
            showError('登陆失败，请检查账号或密码后重试');
          }
        }).catch(error => {
          showError(error)
        })
      }
    });
  };
</script>

<template>
  <div class="login">
    <div class="login-container">
      <span class="login-logo-title">后台管理系统</span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForms">
        <el-form-item prop="mobile" name="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="code" name="code">
          <el-input v-model="ruleForm.code" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button style="width: 100%;" type="primary" @click="logins"> 登录 </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped src="./index.less"></style>
