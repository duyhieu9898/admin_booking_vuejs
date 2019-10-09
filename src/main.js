// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue';
import BootstrapVue from 'bootstrap-vue';
import money from 'v-money'
import ToggleButton from 'vue-js-toggle-button';
import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
import axios from "axios";
import VueAxios from "vue-axios";
import VueApexCharts from 'vue-apexcharts';
//! NOTE: if switch method real time then configured path environment laravel for redis or pusher to laravel use broadcast
// TODO: CURRENT not use real time laravel server side, But only real time between client and client
// TODO: create model laravel side for save information to DB
//*real time with redis and socket
//import io from 'socket.io-client';
//const socket = io('http://localhost:3303');
//Vue.prototype.$socket = socket;
//*real time with pusher and laravel echo
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
//config for app
const token = 'cdcc4de55400db8bd806035d431b1dad389c49b416f92dd358d1a139e78303a5'
axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//
Vue.config.productionTip = false
    //
Vue.prototype.$host_name_server = 'http://localhost:8000/';
Vue.prototype.$token = token
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
//register directive
Vue.use(money, { precision: 3 })
Vue.use(BootstrapVue);
Vue.use(CKEditor);
Vue.use(ToggleButton)
Vue.use(VeeValidate, {
    validity: true,
    mode: 'eager'
});
Vue.use(VueAxios, axios);
//Register component
Vue.component('room-photo-component', require('./components/commons/RoomPhoto.vue').default);
Vue.component('room-address-component', require('./components/commons/RoomAddress.vue').default);
Vue.component('user-address-component', require('./components/commons/UserAddress.vue').default);
Vue.component('room-convenients-component', require('./components/commons/RoomConvenients.vue').default);
Vue.component('todo-list-component', require('./components/commons/TodoList.vue').default);
Vue.component('info-user-component', require('./components/commons/InfoUser.vue').default);
Vue.component('chart-booking', require('./components/commons/ChartBooking.vue').default);
Vue.component('state-overview', require('./components/commons/StateOverview.vue').default);
Vue.component('sent-notification', require('./components/commons/SentNotification.vue').default);
Vue.component('apex-chart', VueApexCharts);
Vue.component('search-user', require('./components/commons/SearchUser.vue').default);
Vue.component('header-component', require('./components/commons/Header.vue').default);
Vue.component('container-component', require('./components/commons/Container.vue').default);
Vue.component('footer-component', require('./components/commons/Footer.vue').default);
Vue.component('notification-component', require('./components/commons/Notification.vue').default);
Vue.component('chat-component', require('./components/commons/ChatSideBar.vue').default);
Vue.component('sidebar-container-component', require('./components/commons/SidebarContainer.vue').default);
//create new instance app
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
