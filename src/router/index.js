import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import App from '../App'
import Home from '../views/Home'
import Login from '../views/Login'
const router = new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: App,
    children: [{
      path: '', // 地址为空时跳转 home页面
      redirect: '/home'
    },
    // 首页城市列表项
    {
      path: '/home',
      component: Home
    },
    // 选择城市页
    {
      path: '/city/:cityid',
      component: () => import('../views/City')
    },
    // 所有商铺列表页
    {
      path: '/msite',
      component: () => import('../views/Msite')
    },
    // 搜索页
    {
      path: '/search/:geohash',
      component: () => import('../views/Search')
    },
    // 商铺详情页
    {
      path: '/shop',
      component: () => import('../views/shop/Shop'),
      children: [{
        path: 'foodDetail', // 食品详情页
        component: () => import('../views/shop/FoodDetail')
      }]
    },
    // 确认订单页
    {
      path: 'components',
      redirect: "components/confirmOrder",
      component: () => import('../views/confirmOrder/Index.vue'),
      children: [{
        path: 'payment', // 付款页面
          
        component: () => import('../views/confirmOrder/Payment')
      },
      {
        path: 'confirmOrder',//下单页
        component: () => import('../views/confirmOrder/ConfirmOrder')
      },
      {
        path: '/confirmOrder',
        component: () => import('../views/confirmOrder/ConfirmOrder'),
        meta: {
          auth: true
        },
        children: [
          {
            path: 'payment', // 付款页面
            component: () => import('../views/confirmOrder/Payment')
          }, {
            path: 'userValidation', // 用户验证
            component: () => import('../views/confirmOrder/UserValidation.vue')
          }, {
            path: '/chooseAddress', // 选择地址
            component: () => import('../views/confirmOrder/ChooesAddress.vue'),
            children: [{
              path: '/addAddress', //添加地址
              component: () => import('../views/confirmOrder/AddAddress.vue')
            }]
          }
        ]
      },
      // 登录注册
      {
        path: '/login',
        component: () => import('../views/Login.vue')
      },
      //重置密码
      {
        path: '/reset',
        component: () => import('../views/Reset.vue')
      },
      // 个人信息
      {
        path: '/profile',
        component: () => import('../views/profile/Profile'),
        meta: {
          auth: true
        },
        children: [{
          path: 'info', // 个人信息详情页
          component: () => import('../views/profile/Info')
        }]
      }
      ]
    }
    ]
  }]
})

router.beforeEach((to,from,next) => {
  const login = localStorage.getItem('status');
  if(to.matched.some(route => route.meta.auth)){
    if(login == '1'){
      next();
    }else{
      next('/login?returnURL='+to.path);
    }
  }else{
    next();
  }
})

export default router
