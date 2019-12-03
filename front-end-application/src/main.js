import Vue from 'vue';
import App from './pages/App';
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify';
// import { mdiLinkedinBox } from '@mdi/js';

Vue.config.productionTip = false;
Vue.router = router;
Vue.use(Vuetify);
Vue.use(router)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
