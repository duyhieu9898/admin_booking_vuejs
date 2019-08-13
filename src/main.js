// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';
import BootstrapVue from 'bootstrap-vue';
import money from 'v-money'
import ToggleButton from 'vue-js-toggle-button';
import VueApexCharts from 'vue-apexcharts';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import axios from "axios";
import VueAxios from "vue-axios";
import io from 'socket.io-client';
const socket = io('http://localhost:3303');
//
// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js'
// let echo = new Echo({
//     authEndpoint: 'http://localhost:8000/broadcasting/auth',
//     namespace: 'App.Events',
//     broadcaster: 'pusher',
//     key: 'e9e863659964b9b23e29',
//     cluster: 'ap1',
//     encrypted: true,
//     auth: {
//         headers: {
//             authorization: 'Bearer 8bbd88ccd51fd163bf59c84c820d98246f258fbefecf41073160b183d2fe86e6',
//         }
//     }
// });
// echo.private('booking')
//     .listen('bookingEvent', (e) => {
//         console.log("ok:", e)
//     });
//config
const token = '8bbd88ccd51fd163bf59c84c820d98246f258fbefecf41073160b183d2fe86e6'
axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//
Vue.prototype.$host_name_server = 'http://localhost:8000/';
Vue.prototype.$token = token
Vue.prototype.$socket = socket;
    //Overwriting messages errors
const dictionary = {
    en: {
        attributes: {
            email_create: 'Email Address',
            username_create: 'User name',
            phone_create: 'Phone Number',
            email: 'Email Address',
            username: 'User name',
            phone: 'Phone Number',
            name_convenient_create: 'name convenient',
            name_convenient: 'name convenient'
        }
    },
};
Validator.localize(dictionary);
// register directive v-money and component <money>
Vue.use(money, { precision: 3 })
Vue.use(BootstrapVue);
Vue.use(CKEditor);
Vue.use(ToggleButton)
Vue.use(VeeValidate, {
    validity: true,
    mode: 'eager'
});
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
    //Register component in app
Vue.component('room-photo-component', require('./components/RoomPhoto.vue').default);
Vue.component('room-address-component', require('./components/RoomAddress.vue').default);
Vue.component('user-address-component', require('./components/UserAddress.vue').default);
Vue.component('room-convenients-component', require('./components/RoomConvenients.vue').default);
Vue.component('todo-list-component', require('./components/TodoList.vue').default);
Vue.component('info-user-component', require('./components/InfoUser.vue').default);
Vue.component('chart-booking', require('./components/ChartBooking.vue').default);
Vue.component('state-overview', require('./components/StateOverview.vue').default);
Vue.component('apexchart', VueApexCharts);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
