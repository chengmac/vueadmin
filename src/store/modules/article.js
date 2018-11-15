/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:43:00 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-11-15 22:16:49
 */

import axios from '../../api/interceptor'
import * as TYPES from '../types'
import moment from 'moment'

const article = {
    state: {
        loading: false,
        tableLoading: false,
        tableData: []
    },
    mutations: {
        [TYPES.ARTICLE_SAVE] (state) {
            state.loading = !state.loading;
        },
        [TYPES.ARTICLE_SAVE_SUCCESS] (state) {
            state.loading = !state.loading;
        },
        [TYPES.ARTICLE_SAVE_FAILURE] (state) {
            state.loading = !state.loading;
        },
        [TYPES.GET_ARTICLE_LIST] (state) {
            state.tableLoading = !state.tableLoading;
        },
        [TYPES.GET_ARTICLE_LIST_SUCCESS] (state, res) {
            let data = res.data.result.docs;
            for(var i =0;i < data.length; i++) {
                data[i].createTime = moment(data[i].createTime).format('lll');
            }
            let list = Object.assign(res.data.result, {docs: data})
            // console.log(data)
            state.tableData = list;
            state.tableLoading = !state.tableLoading;
        },
        [TYPES.GET_ARTICLE_LIST_FAILURE] (state) {
            state.tableLoading = !state.tableLoading;
        },
        [TYPES.DELETE_ARTICLE_SUCCESS] (state) {
            state.tableLoading = !state.tableLoading;
        },
        [TYPES.DELETE_ARTICLE_FAILURE] (state) {
            state.tableLoading = !state.tableLoading;
        }
    },
    actions: {
        // 保存文章
        [TYPES.ARTICLE_SAVE]({commit}, docs) {
            commit(TYPES.ARTICLE_SAVE);
            return new Promise((resolve, reject) => {
                axios.post('/article', docs).then((res) => {
                    resolve(res);
                    commit(TYPES.ARTICLE_SAVE_SUCCESS);
                })
                .catch((err) => {
                    reject(err);
                    commit(TYPES.ARTICLE_SAVE_FAILURE);
                })
            })
        },

        // 获取文章列表
        [TYPES.GET_ARTICLE_LIST]({commit}, docs) {
            commit(TYPES.GET_ARTICLE_LIST);
            const params = `/article?page=${docs.page}&limit=${docs.limit}`;
            axios.get(params).then((res) => {
                commit(TYPES.GET_ARTICLE_LIST_SUCCESS, res);
            })
            .catch((err) => {
                commit(TYPES.GET_ARTICLE_LIST_FAILURE, err);
            })
        },

        // 删除文章
        [TYPES.DELETE_ARTICLE]({commit}, docs) {
            commit(TYPES.GET_ARTICLE_LIST);
            return new Promise((resolve, reject) => {
                axios.delete('/article', {data: docs}).then((res) => {
                    resolve(res);
                    commit(TYPES.DELETE_ARTICLE_SUCCESS);
                })
            })
            .catch((err) => {
                reject(err);
                commit(TYPES.DELETE_ARTICLE_FAILURE);
            })
        }

    }
}

export default article