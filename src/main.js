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
import store from './store';
import constants from './constants/config'
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
const token = '97c3654d6ed26a5b18285ba174022fbb00b5e83f52145cd789574bd1cd6cd1e1'
axios.defaults.baseURL = constants.SERVER_ADDRESS
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//
Vue.config.productionTip = false
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

//create new instance app
const vm = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
