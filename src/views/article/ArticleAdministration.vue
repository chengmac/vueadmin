<template>
    <div class="articleEditor">
        <Layout>
            <mavon-editor v-model="value"/>
        </Layout>
    </div>
</template>

<script>

export default {
    name: 'ArticleEditor',
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
    @import '../../style/article/ArticleEditor.less';

</style>