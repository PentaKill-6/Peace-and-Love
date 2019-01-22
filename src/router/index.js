import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import App from '../App'
import Home from '../views/Home'
export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: App,
  }, {
    path: 'confirmOrder',
    component: () => import('../views/confirmOrder/ConfirmOrder'),
    children: [{
      path: 'payment', // 付款页面
      component: () => import('../views/confirmOrder/Payment')
    }, {
      path: '/confirmOrder/userValidation', // 用户验证
      component: () => import('../views/confirmOrder/UserValidation.vue')
    }, {
      path: '/confirmOrder/chooseAddress', // 选择地址
      component: () => import('../views/confirmOrder/ChooesAddress.vue'),
      children: [{
        path: '/confirmOrder/chooseAddress/addAddress', //添加地址
        component: () => import('../views/confirmOrder/AddAddress.vue')
      }]
    }]
  }]
})