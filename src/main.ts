import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';
import './styles/index.less';

import elementInstall from './plugin/elementInstall';

const app = createApp(App);

app.use(router).use(elementInstall);
app.mount('#app');
