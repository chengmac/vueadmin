<template>
    <div class="articleCategory">
        <Card :bordered="false">
            <p slot="title">文章分类</p>
            <Table border :loading="tableLoading" :columns="columns" :data="getTableData.docs"></Table>
            <Page :total="getTableData.total" :current="Number(getTableData.page)" show-total :styles="pageStyle" class-name="page-count-style" @on-change="changPages"/>
        </Card>
    </div>
</template>

<script>
import { getYearMonthDay } from '../../utils/date'

export default {
    name: 'ArticleCategory',
    data () {
        return {
            pageStyle: {
                position: 'fixed',
                right: '30px',
                bottom: '40px',
                margin: '15px 0'
            },
            columns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        width: 80 
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: 'center',
                    },
                    {
                        title: '分类',
                        key: 'classify',
                        align: 'center',
                    },
                    {
                        title: '标签',
                        key: 'tag',
                        align: 'center',
                        // 渲染标签
                        render: (h, params) => {
                            // 渲染多个标签
                            return params.row.tag.map(item => {
                                return h('Tag', {
                                    attrs: {
                                        // type: 'border',
                                        color: 'blue',
                                    }
                                }, item)
                            })
                            
                        }
                    },
                    {
                        title: '发布时间',
                        key: 'createTime',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('Icon', {
                                props: {
                                    type: 'ios-trash-outline',
                                    size: 24
                                },
                                style: {
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.clickTableDelete(params)
                                    }
                                }
                            })
                        }
                    }
            ],
        }
    },
    created () {
        this.getActricleList();
    },
    computed: {
        getTableData () {
            return this.$store.state.article.tableData;
        },
        tableLoading () {
            return this.$store.state.article.tableLoading;
        }
    },
    methods: {
        getActricleList () {
            var pages = {page: 1 , limit: 10};
            this.$store.dispatch('GET_ARTICLE_LIST', pages);
        },
        clickTableDelete(params) {
            this.$Modal.confirm({
                title: `警告`,
                content: `<p>文章删除${params.row.title}后将不能恢复，是否继续删除?</p>`,
                cancelText: '取消',
                onOk: () => {
                    this.$store.dispatch('DELETE_ARTICLE', {'_id':params.row._id})
                    .then((res) => {
                        // 删除本地数据
                        this.getTableData.splice(params.index, 1);
                        this.$Notice.success({
                            title: `${params.row.title}文章，${res.data.message}`
                        });
                        // 更新消息中心
                        this.$vue.$emit('updateNews');
                    })
                    .catch(err => {
                        this.$Message.error(res.data.message);
                    });
                },
                onCancel: () => {
                }
            })
        },
        // 切换页码时请求新的数据
        changPages(page) {
            var pages = {page: page , limit: 10};
            this.$store.dispatch('GET_ARTICLE_LIST', pages);
        }
    },
    watch: {
        '$route'(newVal) {
            if(newVal.name == 'articleCategory') {
                this.getActricleList();
            }
        }
    }
}
</script>

<style scoped lang="less">
    @import '../../style/article/ArticleCategory.less';

</style>