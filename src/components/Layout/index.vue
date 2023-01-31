<script lang="ts" setup>
  import { inject, Ref, ref, provide } from 'vue';
  import { ElScrollbar } from 'element-plus';
  import Menu from '../Menu/index.vue';
  import Header from '../Header/index.vue';

  const menuVisible = inject<Ref<boolean>>('menuVisible');
  const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

  const initScroll = (value?: number) => {
    if (value === 0) {
      scrollbarRef?.value!.setScrollTop(0);
    }
  };

  const beianClick = () => {
    window.open('https://beian.miit.gov.cn/', '_blank');
  };

  provide('scrollSendGrandson', initScroll);
</script>
<template>
  <div class="layout">
    <aside class="aside" :class="{ visible: menuVisible }">
      <Menu />
    </aside>
    <main class="main">
      <Header />
      <el-scrollbar class="scrollbar" ref="scrollbarRef">
        <div class="container">
          <slot></slot>
        </div>
      </el-scrollbar>
      <div class="footer">
        <span>备案号：</span>
        <span class="curser" @click="beianClick">皖ICP备2023001194号</span>
      </div>
    </main>
  </div>
</template>

<style scoped lang="less">
  .layout {
    width: 100%;
    overflow: hidden;
    display: flex;
    height: 100vh;
  }
  .aside {
    flex-shrink: 0;
    transition: width ease 0.2s;
    width: 0;
    overflow: hidden;
    &.visible {
      width: @nav-width;
    }
  }
  .main {
    width: 100%;
    overflow: hidden;
  }
  .scrollbar {
    height: @container-height;
  }
  .container {
    padding: 10px;
    min-width: 1200px;
  }

  .footer {
    width: 100%;
    height: 30px;
    background: #3962d6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
  }

  .curser {
    cursor: pointer;
  }
</style>
