<script lang="ts" setup>
  import { inject, Ref, ref } from 'vue';
  import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';

  import { ThemeEnum, themeMap } from '@utils/enum';
  import Dialog from '@components/Dialog/index.vue';
  // import { logout } from '@/api/base';
  import { showError } from '@/utils/message';
  import { useRouter } from 'vue-router';

  const menuVisible = inject<Ref<boolean>>('menuVisible');
  const theme = inject<Ref<keyof typeof ThemeEnum>>('theme');

  const themeMapArray = Object.keys(themeMap) as Array<keyof typeof ThemeEnum>;

  const showMenu = () => {
    menuVisible!.value = !menuVisible!.value;
  };

  const changeTheme = (type: keyof typeof ThemeEnum) => {
    theme!.value = type;
    console.log('themeMapArray', themeMapArray); 
    console.log('theme!.value', theme!.value); 
  };

  const dialogVisible = ref(false);
  const logoutLoading = ref(false);

  const showDialog = () => {
    dialogVisible.value = true;
  };

  const router = useRouter();

  const onLogout = async () => {
    try {
      logoutLoading.value = true;
      localStorage.removeItem('token');
      localStorage.removeItem('expire');
      router.push('/login');
    } catch (e) {
      showError(e);
    }
  };
</script>
<template>
  <header class="header" :class="themeMap[theme || 'default'].className">
    <div class="nav-btn" @click="showMenu" />
    <div class="title">后台管理系统</div>
    <div class="btn-wrap">
      <el-dropdown>
        <div class="change-theme"></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="key in themeMapArray"
              :key="key"
              @click="() => changeTheme(key)">{{ themeMap[key].text }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="logout" @click="showDialog"></div>
    </div>
  </header>

  <Dialog
    v-model:dialogVisible="dialogVisible"
    title="退出登录"
    @confirm="onLogout"
    :loading="logoutLoading"
    >确认退出？</Dialog
  >
</template>

<style lang="less" scoped src="./index.less"></style>
