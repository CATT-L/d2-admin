import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import custom from './modules/custom'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    custom,
    d2admin,
  }
})
