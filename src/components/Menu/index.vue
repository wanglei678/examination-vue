<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import { ElMenu, ElMenuItem, ElSubMenu, ElScrollbar } from 'element-plus';
  import { useRoute, useRouter } from 'vue-router';
  import { getMenus } from '@/api/base';

  const menuList = ref<API.MenusItem[]>([]);
  const route = useRoute();
  const router = useRouter();
  const activeIndex = computed(() => `/${route.name as string}`);

  const itemClick = (itemRoute: { index: string }) => {
    router.push(itemRoute.index);
  };

  const hasChildren = (item: API.MenusItem) => !item.children || item.children.length === 0;

  onMounted(() => {
    const list = getMenus();
    menuList.value = list as API.MenusItem[];
  });
</script>

<template>
  <nav class="nav">
    <!-- <div class="nav-top">
      <img src="@assets/close.png" class="close" />
    </div> -->
    <el-scrollbar class="scrollbar">
      <el-menu
        :uniqueOpened="true"
        :default-active="activeIndex"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="item in menuList" :key="item.id">
          <el-menu-item
            class="menu-item"
            :index="`/${item.code}`"
            @click="(e) => itemClick(e)"
            v-if="hasChildren(item)"
          >
            <template #title>{{ item.displayName }}</template>
          </el-menu-item>
          <el-sub-menu class="menu-item" v-else :index="`/${item.code}`">
            <template #title> {{ item.displayName }} </template>
            <template v-for="child in item.children" :key="child.id">
              <el-menu-item
                v-if="hasChildren(child)"
                class="menu-item"
                :index="`/${child.code}`"
                @click="(e) => itemClick(e)"
                >{{ child.displayName }}</el-menu-item
              >
              <el-sub-menu class="menu-item" v-else :index="`/${child.code}`">
                <template #title> {{ child.displayName }} </template>
                <el-menu-item
                  class="menu-item"
                  v-for="d in child.children"
                  :key="d.id"
                  :index="`/${d.code}`"
                  @click="(e) => itemClick(e)"
                  >{{ d.displayName }}</el-menu-item
                >
              </el-sub-menu>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </nav>
</template>

<style scoped lang="less" src="./index.less"></style>
