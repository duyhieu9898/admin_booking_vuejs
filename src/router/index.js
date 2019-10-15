import Vue from 'vue'
import Router from 'vue-router'
import TheListRoom from '@/components/TheListRoom'
import TheRoomEdit from '@/components/TheRoomEdit'
import TheRoomCreate from '@/components/TheRoomCreate'
import TheListUser from '@/components/TheListUser'
import TheDashBoard from '@/components/TheDashBoard'
import TheListBooking from '@/components/TheListBooking'
import TheBookingDetail from '@/components/TheBookingDetail'
import TheListCategory from '@/components/TheListCategory'
import TheListConvenient from '@/components/TheListConvenient'
import TheLogin from '@/components/TheLogin'
import NotFound from '@/components/TheNotFound'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'dash-board',
          component: TheDashBoard
        },
        {
          path: '/admin/login',
          name: 'login',
          component: TheLogin
        },
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
            path: '/admin/conveniences',
            name: 'list-convenient',
            component: TheListConvenient
        },
        {
          name: '404',
          path: '/404',
          component: NotFound
        },
        {
          path: '*',
          redirect: '404'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
