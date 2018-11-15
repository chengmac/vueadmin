/*
 * @Author: chengmac 
 * @Date: 2018-10-17 21:04:02 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-11-05 21:07:59
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { auth, article, other } from './modules'

const store = new Vuex.Store({
    modules: {
        auth,
        article,
        other
    }
});

export default store