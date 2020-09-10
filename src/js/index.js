import '../styles/style.scss';
import '../index.html';

import Vue from 'vue/dist/vue';

Vue.config.productionTip = false;

import App from '../pages/App.vue';

new Vue({
	render: (h) => h(App),
}).$mount('#app');
