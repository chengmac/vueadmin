/*
 * @Author: chengmac 
 * @Date: 2018-10-26 23:43:00 
 * @Last Modified by: chengmac
 * @Last Modified time: 2019-03-08 21:04:42
 */

import axios from '../../api/interceptor'
import * as TYPES from '../types'
import moment from 'moment'

const article = {
    state: {
        loading: false,
        tableLoading: false,
        docs: {},
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
        [TYPES.GET_ARTICLE] (state) {
            state.tableLoading = !state.tableLoading;
        },
        [TYPES.GET_ARTICLE_SUCCESS] (state, res) {
            state.docs = res.data.result.docs;
            state.tableLoading = !state.tableLoading;
        },
        [TYPES.GET_ARTICLE_FAILURE] (state) {
            state.tableLoading = !state.tableLoading;
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
        },
        // [TYPES.GET_ARTICLE_CLASSIFY] (state, res) {
        //     state.classifyList = res.result.docs;
        // },
        // [TYPES.GET_ARTICLE_lABEL] (state, res) {
        //     state.labelList = res.result.docs;
        // }
    },
    actions: {
        // 保存文章
        [TYPES.ARTICLE_SAVE]({commit}, docs) {
            commit(TYPES.ARTICLE_SAVE);
            return new Promise((resolve, reject) => {
                axios.post('/articleSave', docs).then((res) => {
                    resolve(res);
                    commit(TYPES.ARTICLE_SAVE_SUCCESS);
                })
                .catch((err) => {
                    reject(err);
                    commit(TYPES.ARTICLE_SAVE_FAILURE);
                })
            })
        },

        // 获取单个文章
        [TYPES.GET_ARTICLE]({commit}, id) {
            commit(TYPES.GET_ARTICLE);
            const params = `/article?id=${id}`;
            return new Promise((resolve, reject) => {
                axios.get(params).then((res) => {
                    resolve(res);
                    commit(TYPES.GET_ARTICLE_SUCCESS, res);
                })
                .catch((err) => {
                    reject(err);
                    commit(TYPES.GET_ARTICLE_FAILURE, err);
                })
            });
        },

        // 获取文章列表
        [TYPES.GET_ARTICLE_LIST]({commit}, docs) {
            commit(TYPES.GET_ARTICLE_LIST);
            const params = `/articleList?page=${docs.page}&limit=${docs.limit}`;
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
                axios.delete('/articleDelete', {data: docs}).then((res) => {
                    resolve(res);
                    commit(TYPES.DELETE_ARTICLE_SUCCESS);
                })
                .catch((err) => {
                    reject(err);
                    commit(TYPES.DELETE_ARTICLE_FAILURE);
                })
            })
        },

        // 获取所有文章分类
        [TYPES.GET_ARTICLE_CLASSIFY]({commit}) {
            const params = `/getArticleAllClassify`;
            return new Promise((resolve, reject) => {
                axios.get(params).then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
            });
        },

        // 获取所有文章标签
        [TYPES.GET_ARTICLE_lABEL]({commit}) {
            const params = `/getArticleAllLabel`;
            return new Promise((resolve, reject) => {
                axios.get(params).then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
            });
        }

    }
}

export default article