<template>
    <div class="articleEditor">
        <Card :bordered="false">
            <p slot="title">文章编辑</p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="文章标题" prop="title">
                    <Row>
                        <Col span="12">
                            <Input v-model="formValidate.title" placeholder="请输入文章标题..." />
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="文章分类" prop="classify">
                    <Row>
                        <Col span="12">
                            <Input v-model="formValidate.classify" placeholder="请输入文章分类..." />
                        </Col>
                        <!-- <Col span="12">
                            <Button class="create-btn" type="primary" @click="showNewClassifyItem">新建分类</Button>
                        </Col> -->
                    </Row>
                    <transition name="fade">
                        <Row v-if="showClassify" class="create-item">
                            <Col span="12">
                                <Input v-model="formValidate.classify" placeholder="请输入文章分类..." />
                            </Col>
                            <Col span="12">
                                <Button type="primary" @click="confirmCreateClassify">确认</Button>
                                <Button @click="cancelCreateClassify">取消</Button>
                            </Col>
                        </Row>
                    </transition>
                </FormItem>
                <FormItem label="文章标签" prop="tag">
                    <Row>
                        <Col span="12">
                            <Input v-model="formValidate.tag" placeholder="请输入文章标签..."/>
                        </Col>
                        <!-- <Col span="12">
                            <Button class="create-btn" type="primary" @click="showNewTagItem">新建标签</Button>
                        </Col> -->
                    </Row>
                    <transition name="fade">
                        <Row v-if="showTag" class="create-item">
                            <Col span="12">
                                <Input v-model="formValidate.tag" value="were" placeholder="请输入文章标签..."/>
                            </Col>
                            <Col span="12">
                                <Button type="primary" @click="confirmCreateTag">确认</Button>
                                <Button @click="cancelCreateTag">取消</Button>
                            </Col>
                        </Row>
                    </transition>
                </FormItem>
                <FormItem label="内容编辑" prop="content">
                    <div class="editor">
                        <mavon-editor v-model="formValidate.content"/>
                    </div>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">发布</Button>
                    <Button @click="handleCancel" style="margin-left: 20px">取消</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>

export default {
    name: 'ArticleEditor',
    data () {
        return {
            showTag: false,
            showClassify: false,
            formValidate: {
                title: '',
                classify: '',
                tag: '',
                content: ''
            },
            ruleValidate: {
                title: [
                    { required: true, message: '文章名称不能为空', trigger: 'blur' }
                ],
                classify: [
                    { required: true, message: '文章分类不能为空', trigger: 'blur' },
                ],
                tag: [
                    { required: true, message: '文章标签不能为空', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '编辑内容不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('ARTICLE_SAVE', this.formValidate).then(res => {
                        this.$Notice.success({
                            title: `${this.formValidate.title}文章，${res.data.message}`
                        });
                        this.formValidate = {
                            title: '',
                            classify: '',
                            tag: '',
                            content: ''
                        };
                        // 更新消息中心
                        this.$vue.$emit('updateNews');
                    }).catch(err => {
                        this.$Message.error(res.data.message);
                    });
                    
                } 
            })
        },
        handleCancel () {
            this.formValidate = {
                title: '',
                classify: '',
                tag: '',
                content: ''
            };
        },
        // 新建分类
        showNewClassifyItem () {
            this.showClassify = !this.showClassify;
        },
        confirmCreateClassify () {

        },
        cancelCreateClassify () {
            this.showClassify = !this.showClassify;
        },

        // 新建标签
        showNewTagItem () {
            this.showTag = !this.showTag;
        },
        confirmCreateTag () {

        },
        cancelCreateTag () {
            this.showTag = !this.showTag;
        }
    }
}
</script>

<style scoped lang="less">
    @import '../../style/article/ArticleEditor.less';
    
</style>