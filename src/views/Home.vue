<template>
    <div class="home">
        <Layout>
            <mavon-editor v-model="value"/>
        </Layout>
    </div>
</template>

<script>

export default {
    name: 'Home',
    data () {
        return {
            value: ''
        }
    },
    methods: {
        
    }
}
</script>

<style scoped lang="less">
    @import '../style/Home.less';

</style>

