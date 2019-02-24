<template>
    <div class="articleEditor">
        <Card :bordered="false">
            <p slot="title">文章编辑</p>
            <div class="editorContent">
                <Input v-model="article.title" placeholder="请输入文章标题..." />
                <div class="editor">
                    <quill-editor v-model="article.content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
                    </quill-editor>        
                </div>
                <div class="editorModal">
                    <Modal title="文章发布" v-model="modal">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">   
                            <FormItem label="文章分类" prop="classify">
                                <Row>
                                    <Col span="12">
                                        <Select v-model="formValidate.classify">
                                            <Option v-for="item in classifyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="12">
                                        <Button class="create-btn" type="primary" @click="showNewClassifyItem">新建分类</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <transition name="fade">
                                <FormItem  v-if="showClassify" prop="newClassify">
                                    <Row>
                                        <Col span="12">
                                            <Input v-model="formValidate.newClassify" placeholder="请输入文章分类..." />
                                        </Col>
                                        <Col span="12">
                                            <Button class="marginLeftBtn" type="primary" @click="confirmCreateClassify">确认</Button>
                                            <Button class="marginLeftBtn" @click="cancelCreateClassify">取消</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </transition>
                            <FormItem label="文章标签" prop="label">
                                <Row>
                                    <Col span="12">
                                        <Select v-model="formValidate.label">
                                            <Option v-for="item in tagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="12">
                                        <Button class="create-btn" type="primary" @click="showNewTagItem">新建标签</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <transition name="fade">
                                <FormItem  v-if="showTag" prop="newTag">
                                    <Row>
                                        <Col span="12">
                                            <Input v-model="formValidate.newTag" placeholder="请输入文章标签..." />
                                        </Col>
                                        <Col span="12">
                                            <Button class="marginLeftBtn" type="primary" @click="confirmCreateTag">确认</Button>
                                            <Button class="marginLeftBtn" @click="cancelCreateTag">取消</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </transition>
                            <FormItem label="文章类型" prop="type">
                                <Row>
                                    <Col span="12">
                                        <Select v-model="formValidate.type">
                                            <Option v-for="item in classifyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem label="是否公开" prop="overt">
                                <Row>
                                    <Col span="12">
                                        <Switch size="large" v-model="formValidate.overt">
                                            <span slot="open">公开</span>
                                            <span slot="close">隐私</span>
                                        </Switch>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                        <div slot="footer">
                            <Button type="primary" @click="comfirmPulish">确认发布</Button>
                            <Button @click="cancelPulish">取消</Button>
                        </div>
                    </Modal>
                </div>
                <Switch v-model="formValidate.overt"/>
                <div class="editorBtn">
                    <Button type="primary" @click="publishArticle">发布文章</Button>
                    <Button @click="handleCancel" style="margin-left: 20px">取消</Button>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
import Quill from 'quill'
export default {
    name: 'ArticleEditor',
    data () {
        return {
            modal: false,
            showTag: false,
            showClassify: false,
            classifyList: [], // 分类列表
            tagList: [], // 标签列表
            editorOption: {},  //文本编辑器配置
            article: {
                title: '',
                content: ''
            },
            formValidate: {
                type: '',
                classify: '',
                label: '',
                newClassify: '', //新建分类
                newTag: '',
                overt: false
            },
            ruleValidate: {
                title: [
                    { required: true, message: '文章名称不能为空', trigger: 'blur' }
                ],
                classify: [
                    { required: true, message: '文章分类不能为空', trigger: 'change' },
                ],
                tag: [
                    { required: true,type: 'array', message: '文章标签不能为空', trigger: 'change' }
                ],
                content: [{required: true, message: '文章内容不能为空', trigger: 'blur' }],
                newClassify: { required: true, message: '输入不能为空', trigger: 'blur' },
                newTag: { required: true, message: '输入不能为空', trigger: 'blur' },
            }
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods: {
        onok() {
            alert(1)
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let data = this.formValidate;
                    // 删除多余属性
                    delete data.newClassify;
                    delete data.newTag;
                    this.$store.dispatch('ARTICLE_SAVE', data).then(res => {
                        this.$Notice.success({
                            title: `${this.formValidate.title}文章，${res.data.message}`
                        });
                        this.formValidate = {
                            type: '',
                            classify: '',
                            tag: '',
                            overt: false
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
                type: '',
                classify: '',
                tag: '',
                overt: false
            };
        },
        // 打开弹框
        publishArticle() {
            this.modal = true;
        },
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.content = html
        },
        // 新建分类
        showNewClassifyItem () {
            this.showClassify = !this.showClassify;
        },
        confirmCreateClassify () {
            this.classifyList.push({
                value: this.formValidate.newClassify,
                label: this.formValidate.newClassify
            });
            this.formValidate.newClassify= '';
            this.showClassify = !this.showClassify;
        },
        cancelCreateClassify () {
            this.showClassify = !this.showClassify;
        },

        showNewTagItem () {
            this.showTag = !this.showTag;
        },
        // 新建标签
        confirmCreateTag () {
            this.tagList.push({
                value: this.formValidate.newTag,
                label: this.formValidate.newTag
            });
            console.log(this.tagList)
            this.formValidate.newTag= '';
            this.showTag = !this.showTag;
        },
        cancelCreateTag () {
            this.showTag = !this.showTag;
        },
        comfirmPulish() {
            this.modal = false;
        },
        cancelPulish() {
            this.modal = false;
        },
    }
}
</script>

<style scoped lang="less">
    @import '../../style/article/ArticleEditor.less';
    
</style>