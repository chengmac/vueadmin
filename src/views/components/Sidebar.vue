<template>
    <div class="sidebar">
        <div class="sidebar_head">
        </div>
        <Layout>
            <Menu :theme="themes" width="auto" :class="menuitemClasses" :active-name="$route.name" @on-select="changeMenu">
                <Menu-item v-for="(item, index) in getMenuList" :name="item.name" :key="index">
                    <Icon :type="item.icon"></Icon>
                    <span>{{item.meta.title}}</span>
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
            themes: 'light'
        }
    },
    created() {
        this.$store.commit('MENU_LIST');
    },
    computed: {
        menuitemClasses () {
            return [
                'menu-item',
                this.collapsed ? 'collapsed-menu' : ''
            ]
        },
        getMenuList() {
            return this.$store.state.other.menuList;
        },
        setMenu () {
            return window.location.hash;
            // return this.$router.path;
        }
    },
    methods: {
        changeMenu (name) {
            this.$router.push({
                name: name
            });
        }
    },
    watch: {
        
    }
}
</script>

<style scoped lang="less">
    @import '../../style/components/Sidebar.less';
</style>

