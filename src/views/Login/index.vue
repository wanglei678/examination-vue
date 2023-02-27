<script setup lang="ts">
  import { ref } from 'vue';
  import { ElForm, ElFormItem, ElInput, ElButton, ElIcon } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { login, sendMail } from '@api/login';
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
  const loading = ref(false);
  const rules = {
    mobile: [{ required: true, message: '请输入账号' }],
    code: [{ required: true, message: '请输入密码' }]
  };
  const beianClick = () => {
    window.open('https://beian.miit.gov.cn/','_blank');
  }
  const sendMails = () => {
    sendMail().then(res => {
      showSuccess('邮件发送成功');
    }).catch(error =>{
      showError(error)
    })
  }
  const logins = () => {
    ruleForms.value.validate((valid: boolean) => {
      if (valid) {
        loading.value = true;
        let params: any = {
          username: ruleForm.value.mobile,
          password: ruleForm.value.code
        }
        login(params).then(res => {
          if (res.message == '登录成功！'){
            showSuccess('登录成功！');
            loading.value = false;
            localStorage.setItem('token', res.token);
            localStorage.setItem('expire', res.expiresIn);
            router.push('/user');
          } else {
            loading.value = false;
            showError('登陆失败，请检查账号或密码后重试');
          }
        }).catch(error => {
          loading.value = false;
          showError(error)
        })
      }
    });
  };
</script>

<template>
  <div class="login" v-loading="loading">
    <div>
      <el-icon @click="sendMails" class="is-loading el-icon-eleme"></el-icon>
    </div>
    <div class="login-container">
      <span class="login-logo-title">后台管理系统</span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForms">
        <el-form-item prop="mobile" name="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="code" name="code">
          <el-input v-model="ruleForm.code" @keyup.enter.native="logins" placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button style="width: 100%;" type="primary" @click="logins"> 登录 </el-button>
      </div>
    </div>
    <div class="footer">
      <span>备案号：</span>
      <span class="curser" @click="beianClick">皖ICP备2023001194号</span>
    </div>
  </div>
</template>

<style lang="less" scoped src="./index.less"></style>
