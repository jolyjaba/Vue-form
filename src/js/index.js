import Vue from 'vue/dist/vue';
import Vuelidate from 'vuelidate';

import App from '../pages/App';

import '../styles/style';
import '../index';

Vue.config.devtools = false;

Vue.use(Vuelidate);
new Vue({
	render: (h) => h(App),
}).$mount('#app');
