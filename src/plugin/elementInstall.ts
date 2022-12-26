// 需要全局注册element-plus组件、指令

import { App } from 'vue';

import { ElLoading } from 'element-plus';

export default function (app: App) {
  app.use(ElLoading);
}
