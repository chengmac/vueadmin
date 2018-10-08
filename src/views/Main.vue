<template>
    <div class="main">
        <Layout>
            <Sider ref="side" hide-trigger collapsible :collapsed-width="78" :width="240" v-model="isCollapsed">
                <Sidebar :collapsed="isCollapsed"></Sidebar>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <Breadcrumb>
                        <BreadcrumbItem to="/">
                            <Icon type="ios-home-outline"></Icon> Home
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Navbar></Navbar>
                </Header>
                <Content>
                    <Home></Home>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './Home';
export default {
    name: 'Main',
    components: {
        Navbar,
        Sidebar,
        Home
    },
    data () {
        return {
            isCollapsed: false
        }
    },
    computed: {
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    methods: {
        collapsedSider () {
            this.$refs.side.toggleCollapse();
        }
    }
}
</script>

<style scoped lang="less">
    @import '../style/Main.less';

</style>

