import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import confirmOeder from "./confirmOeder/confirmOeder"

import home from './modules/home'
import login from '../store/modules/login'
import shop from '../store/modules/shop'
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{
    confirmOeder,
    home,
    login,
    shop
  }
})
