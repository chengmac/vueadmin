/*
 * @Author: chengmac 
 * @Date: 2018-10-17 21:03:36 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-11-10 15:01:51
 */

import axios from '../../api/interceptor'
import * as TYPES from '../types'

const auth = {
    state: {
        loginLoading: false,
        menuList: [],
    },
    mutations: {
        [TYPES.LOGIN_REQUEST](state) {
            state.loginLoading = !state.loginLoading;
        },
        [TYPES.LOGIN_REQUEST_SUCCESS](state) {
            state.loginLoading = !state.loginLoading;
        },
        [TYPES.LOGIN_REQUEST_FAILURE](state) {
            state.loginLoading = !state.loginLoading;
        }
    },
    actions: {
        [TYPES.LOGIN_REQUEST]({commit}, userInfo) {
            commit(TYPES.LOGIN_REQUEST);
            return new Promise((resolve, reject) => {
                axios.post('/auth', userInfo).then(res => {
                    resolve(res);
                    commit(TYPES.LOGIN_REQUEST_SUCCESS);
                })
                .catch(err => {
                    reject(err);
                    commit(TYPES.LOGIN_REQUEST_FAILURE);
                })
            })
        }
    }
}

export default auth

