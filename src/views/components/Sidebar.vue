<template>
    <div class="sidebar">
        <div class="sidebar_head">
        </div>
        <Layout>
            <Menu active-name=0 theme="dark" width="auto" :class="menuitemClasses">
                <Menu-item v-for="(item, index) in menuList" :name="index" :key="index">
                    <Icon type="ios-home-outline"></Icon>
                    <span>{{item.name}}</span>
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
        // collapsedSider () {
        //     this.$refs.side.toggleCollapse();
        // }
    }
}
</script>

<style scoped lang="less">
    @import '../../style/components/Sidebar.less';
</style>

