import Vue from 'vue';
import Router from 'vue-router';
import TheListRoom from '../components/TheListRoom.vue';
import TheRoomEdit from '../components/TheRoomEdit.vue';
import TheRoomCreate from '../components/TheRoomCreate.vue';
import TheListUser from '../components/TheListUser.vue';
import TheDashBoard from '../components/TheDashBoard.vue';
import TheListBooking from '../components/TheListBooking.vue';
import TheBookingDetail from '../components/TheBookingDetail.vue';
import TheListCategory from '../components/TheListCategory.vue';
import TheListConvenient from '../components/TheListConvenient.vue';
import TheLogin from '../components/TheLogin.vue'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/admin/rooms',
            name: 'list-room',
            component: TheListRoom
        },
        {
            path: '/admin/rooms/:id/edit',
            name: 'room-edit',
            component: TheRoomEdit
        },
        {
            path: '/admin/rooms/create',
            name: 'room-create',
            component: TheRoomCreate
        },
        {
            path: '/admin/users',
            name: 'list-user',
            component: TheListUser
        },
        {
            path: '/admin/bookings',
            name: 'list-booking',
            component: TheListBooking
        },
        {
            path: '/admin/bookings/:id',
            name: 'booking',
            component: TheBookingDetail
        },
        {
            path: '/admin/categories',
            name: 'list-category',
            component: TheListCategory
        },
        {
            path: '/admin/convenients',
            name: 'list-convenient',
            component: TheListConvenient
        },
        {
            path: '/admin/login',
            name: 'login',
            component: TheLogin
        },
        {
            path: '*',
            name: 'dash-board',
            component: TheDashBoard
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
