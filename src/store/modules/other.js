/*
 * @Author: chengmac 
 * @Date: 2018-11-03 09:31:10 
 * @Last Modified by: chengmac
 * @Last Modified time: 2018-11-11 17:20:03
 */

import axios from '../../api/interceptor'
import * as TYPES from '../types'
import { mainRouter } from '../../router/routers'

const route = {
    state: {
        newsList: [],
        newsCount: 0
    },
    mutations: {
        [TYPES.MENU_LIST] (state) {
            state.menuList = mainRouter
        },
        [TYPES.MENU_ROUTER_JUMP] (state) {
            state.breadcrumbList = []
        },
        [TYPES.NEWS_LIST_SUCCESS] (state, news) {
            state.newsList = news.data.result;
            // 统计未读消息
            let newsData = news.data.result;
            let newsListLength = [];
            for(var i = 0;i < newsData.length; i++) {
                if(!newsData[i].isRead) {
                    newsListLength.push(newsData[i]);
                }
            };
            state.newsCount = newsListLength.length;
        },
        [TYPES.NEWS_LIST_FAILURE] (state) {
            state.newsList = [];
        },
        [TYPES.UPDATE_NEWS_STATUS_SUCCESS] (state) {
            // state.newsList = news.data.result;
        },
        [TYPES.UPDATE_NEWS_STATUS_FAILURE] () {
            // state.newsList = [];
        }
    },
    actions: {
        [TYPES.NEWS_LIST] ({commit}) {
            axios.get('/news').then((news) => {
                if(news) {
                    commit(TYPES.NEWS_LIST_SUCCESS, news);
                }
            }).catch(err => {
                commit(TYPES.NEWS_LIST_FAILURE, err);
            })
        },
        [TYPES.UPDATE_NEWS_STATUS] ({commit}, content) {
            new Promise((resolve, reject) => {
                return axios.put('/news', content).then((news) => {
                    if(news) {
                        commit(TYPES.UPDATE_NEWS_STATUS_SUCCESS);
                        resolve(news);
                    }
                }).catch(err => {
                    reject(err);
                    commit(TYPES.UPDATE_NEWS_STATUS_FAILURE, err);
                })
            })
        }
    }
}

export default route