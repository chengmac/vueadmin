<template>
    <div class="administrate">
        <Card :bordered="false">
            <p slot="title" class="card-head-title">文章管理</p>
            <div slot="title" class="card-head-btn">
                <Button type="primary" :disabled="disabledDelete" @click="deleteArticle"><Icon type="ios-trash-outline" size="16"/>批量删除</Button>
            </div>
            <Table border ref="selection"
            :loading="tableLoading" 
            :columns="columns" 
            :data="getTableData.docs"
            @on-selection-change="onSelectionChange"
            no-data-text="暂无数据"></Table>
            <Page :total="getTableData.total" :current="Number(getTableData.page)" show-total :styles="pageStyle" class-name="page-count-style" @on-change="changPages"/>
        </Card>
    </div>
</template>

<script>

export default {
    name: 'articleCategory',
    data () {
        return {
            disabledDelete: true,
            deleteIdList: [],
            // 分页样式
            pageStyle: {
                textAlign: 'right',
                margin: '15px 0'
            },
            columns: [
                    {
                        type: 'selection',
                        width: 80,
                        align: 'center'
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
                        key: 'label',
                        align: 'center',
                        // 渲染标签
                        render: (h, params) => {
                            // 渲染多个标签
                            return params.row.label.map(item => {
                                return h('Tag', {
                                    attrs: {
                                        color: 'blue'
                                    }
                                }, item)
                            })
                            
                        }
                    },
                    {
                        title: '是否公开',
                        key: 'overt',
                        align: 'center',
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
                        render: (h, param) => {
                            return h('Icon', {
                                props: {
                                    type: 'ios-create-outline',
                                    size: 24,
                                    color: '#2d8cf0'
                                },
                                style: {
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.$vue.$emit('updateArticle', param.row._id);
                                        this.$router.push('editor');
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
        deleteArticle(params) {
            this.$Modal.confirm({
                title: `警告`,
                closable: true,
                content: `<p>文章删除后将不能恢复，是否继续删除?</p>`,
                cancelText: '取消',
                onOk: () => {
                    this.$store.dispatch('DELETE_ARTICLE', {'_id': this.deleteIdList})
                    .then((res) => {
                        this.getTableData.docs.forEach(element => {
                            this.deleteIdList.forEach(id => {
                                if(element._id === id) {
                                    let index = this.getTableData.docs.indexOf(element);
                                    if(index !== -1) {
                                        // 删除本地数据
                                        this.getTableData.docs.splice(index, 1);
                                    }
                                }
                            });
                            this.disabledDelete = true;
                        });
                        // 清空
                        this.deleteIdList = [];
                        this.$Notice.success({
                            title: `文章${res.data.message}`
                        });
                        // 更新消息中心
                        this.$vue.$emit('updateNews');
                    })
                    .catch(err => {
                        this.$Message.error(err);
                    });
                }
            })
        },
        // 切换页码时请求新的数据
        changPages(page) {
            var pages = {page: page , limit: 10};
            this.$store.dispatch('GET_ARTICLE_LIST', pages);
        },
        
        onSelectionChange(selection) {
            if(selection.length !== 0) {
                this.disabledDelete = false;
                selection.filter(element => {
                    // 防止重复添入ID
                    let index = this.deleteIdList.indexOf(element._id);
                    if(index === -1) {
                        this.deleteIdList.push(element._id);
                    }
                })
            } else {
                this.disabledDelete = true;
            }
        }
    },
    watch: {
        '$route'(newVal) {
            if(newVal.name == 'administrate') {
                this.getActricleList();
            }
        }
    }
}
</script>

<style scoped lang="less"> 
.administrate {
    height: 100%;
    .ivu-card {
        min-height: 100%;
        
    }
    .card-head-title {
        display: inline;
    }
    .card-head-btn {
        float: right;
        position: relative;
        top: -6px;
    }
}
</style>