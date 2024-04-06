import { createApp } from 'vue'
import App from './App.vue'
import MToastList from './components/toast-list/MToastList.vue'
import clickOutside from './store/clickOutside';
import router from './router';
import store from './store';

const app = createApp(App);
app.directive('click-outside', clickOutside);
app.use(router);
app.config.globalProperties.$state = store.state;
app.component("MToastList",MToastList);

app.mount('#app')
