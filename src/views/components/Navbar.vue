<template>
    <div class="navbar">
        <nav class="nav"> 
            <Poptip trigger="click" placement="bottom-end" class="news-modal" width="400" popper-class="poptip-modal">
                <div class="news">
                    <Badge :count="getNewsListLength" :overflow-count='maxShowNewsCount'>
                        <Icon type="ios-notifications-outline news-icon" @click="showNewsList()" size="30"/>
                    </Badge>
                </div>
                <div slot="content" class="new-item-body">
                    <CellGroup>
                        <Cell v-for="(item, index) in getNewsListData" :key="index" @click.native="readNews(item)" :label="item.createTime | ymd('lll')" :extra="item.content">
                             <Badge :count="item.isRead ? 0 : 1" dot>
                                <div class="news-item">
                                    <span class="new-item-content">{{`${index+1}. ${item.name} `}}</span>
                                </div>
                            </Badge>
                        </Cell>
                    </CellGroup>
                </div>
            </Poptip>
            <Dropdown>
                <div>
                    <Avatar src="https://lastfm-img2.akamaized.net/i/u/ar0/76236da55e044132c1ffb4386fcd0492.png"/>
                    <Icon type="md-arrow-dropdown user-dropdown"/>
                </div>
                <DropdownMenu slot="list">
                    <DropdownItem>设置</DropdownItem>
                    <DropdownItem><span @click="logoutHandle()">退出登录</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </nav>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    name: 'navbar',
    data () {
        return {
            showList: false,
            maxShowNewsCount: 99
        }
    },
    created () {
        this.getNewsList();
    },
    computed: {
        getNewsListData () {
            return this.$store.state.other.newsList;
        },
        // 消息数
        getNewsListLength () {
            return this.$store.state.other.newsCount;
        }
    },
    methods: {
        getNewsList() {
            this.$vue.$on('updateNews', () => {
                this.$store.dispatch('NEWS_LIST');
            });
            this.$store.dispatch('NEWS_LIST');
        },
        logoutHandle() {
            Cookies.remove('token');
            this.$router.push('login');
        },
        showNewsList () {
            this.showList = !this.showList;
        },
        readNews(item) { 
            if(!item.isRead) {
                // 标记为已读
                item.isRead = true;
                this.$store.dispatch('UPDATE_NEWS_STATUS', item).then(data => {
                    this.getNewsListData.forEach((val, index) => {
                        if(val.name = item.name) {
                            val = item;
                        }
                        // 更新未读消息数量
                        this.$store.commit('NEWS_LIST_SUCCESS', {data:{result: this.getNewsListData}});
                    })
                });
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import '../../style/components/Navbar.less';
</style>
