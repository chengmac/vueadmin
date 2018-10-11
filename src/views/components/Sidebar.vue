<template>
    <div class="sidebar">
        <div class="sidebar_head">
        </div>
        <Layout>
            <Menu :theme="themes" width="auto" :class="menuitemClasses" active-name="articleEditor" @on-select="changeMenu">
                <!-- <Menu-item v-for="(item, index) in menuList" :name="index" :key="index">
                    <Icon type="ios-home-outline"></Icon>
                    <span>{{item.name}}</span>
                </Menu-item> -->
                <Menu-item name="home">
                    <Icon type="ios-home-outline" />
                    <span>首页</span>
                </Menu-item>
                <Menu-item name="articleEditor">
                    <Icon type="ios-create-outline" />
                    <span>文章编辑</span>
                </Menu-item>
                <Menu-item name="articleAdministration">
                    <Icon type="ios-list-box-outline" />
                    <span>文章分类</span>
                </Menu-item>
            </Menu>
        </Layout>
    </div>    
</template>
<script>
export default {
    name: 'sidebar',
    props: {
        collapsed: {
            type: Boolean
        }
    },
    data() {
        return {
            themes: 'light',
            menuList: [{name: '我是你大爷 '},{name: '我是你大娘 '}]
        }
    },
    computed: {
        menuitemClasses () {
            return [
                'menu-item',
                this.collapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    methods: {
        changeMenu (name) {
            this.$router.push({
                name: name
            });
        }
    }
}
</script>

<style scoped lang="less">
    @import '../../style/components/Sidebar.less';
</style>

