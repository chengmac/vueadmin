<template>
    <div class="articleEditor">
        <Card :bordered="false">
            <p slot="title">文章编辑</p>
            <div class="editorContent">
                <Input v-model="article.title" placeholder="请输入文章标题..." />
                <div class="editor">
                    <quill-editor v-model="article.content"
                    ref="myQuillEditor"
                    :options="editorOption">
                    </quill-editor>        
                </div>
                <div class="editorModal">
                    <Modal title="文章发布" v-model="openModal">
                        <Form ref="formValidate" :label-width="80">   
                            <FormItem label="文章分类">
                                <Row>
                                    <Col span="12">
                                        <Select v-model="article.classify">
                                            <Option v-for="item in classifyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="12">
                                        <Button class="create-btn" type="primary" @click="showNewCreateItem('classify')">新建分类</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <transition name="fade-in">
                                <FormItem  v-if="showClassify">
                                    <Row>
                                        <Col span="12">
                                            <Input v-model="newClassify" placeholder="请输入文章分类..." />
                                        </Col>
                                        <Col span="12">
                                            <Button class="marginLeftBtn" type="primary" @click="confirmCreateClassify">确认</Button>
                                            <Button class="marginLeftBtn" @click="cancelNewCreate('classify')">取消</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </transition>
                            <FormItem label="文章标签">
                                <Row>
                                    <Col span="12">
                                        <Select v-model="article.label" multiple>
                                            <Option v-for="item in lablelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="12">
                                        <Button class="create-btn" type="primary" @click="showNewCreateItem('label')">新建标签</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <transition name="fade-in">
                                <FormItem  v-if="showLabel">
                                    <Row>
                                        <Col span="12">
                                            <Input v-model="newLabel" placeholder="请输入文章标签..." />
                                        </Col>
                                        <Col span="12">
                                            <Button class="marginLeftBtn" type="primary" @click="confirmCreateTag">确认</Button>
                                            <Button class="marginLeftBtn" @click="cancelNewCreate('label')">取消</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </transition>
                            <FormItem label="文章类型">
                                <Row>
                                    <Col span="12">
                                        <Select v-model="article.type">
                                            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem label="是否公开">
                                <Row>
                                    <Col span="12">
                                        <i-switch size="large" v-model="article.overt">
                                            <span slot="open">公开</span>
                                            <span slot="close">隐私</span>
                                        </i-switch>
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
            openModal: false, // 弹框标记
            showLabel: false,
            showClassify: false,
            newClassify: '', //新建分类
            newLabel: '',//新建标签
            classifyList: [], // 分类列表
            lablelList: [], // 标签列表
            typeList: [
                {label: '原创', value: 0},
                {label: '转载', value: 1}
            ],
            editorOption: {},  //文本编辑器配置
            article: {
                title: '',
                content: '',
                type: '',
                classify: '',
                label: '',
                overt: true
            }
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        }
    },
    methods: {
        comfirmPulish (name) {
            if (this.article.classify === '') {
                this.renderErrorTips('文章分类不能为空');
                return false;
            }
            if (this.article.label.length === 0) {
                this.renderErrorTips('文章标签不能为空');
                return false;
            }
            if (this.article.type === '') {
                this.renderErrorTips('文章类型不能为空');
            } else {
                this.$store.dispatch('ARTICLE_SAVE', this.article).then(res => {
                    this.$Notice.success({
                        title: `${this.article.title}文章，${res.data.message}`
                    });
                    this.openModal = false;
                    // 更新消息中心
                    this.$vue.$emit('updateNews');
                    this.clearInputData();
                }).catch(err => {
                    this.$Message.error(res.data.message);
                });
            }
        },
        handleCancel () {
            this.article.title =  '',
            this.article.content = '';
        },
        // 清空输入数据
        clearInputData() {
            this.article = {
                title: '',
                content: '',
                type: '',
                classify: '',
                label: '',
                overt: true
            };
        },
        // 打开发布弹框
        publishArticle() {
            if (this.article.title !== '') {
                if (this.article.content !== '') {
                    this.openModal = true;
                    this.classifyList = [];
                    this.lablelList = [];
                } else {
                    this.renderErrorTips('文章内容不能为空');
                }
            } else {
                this.renderErrorTips('文章标题不能为空');
            }
        },
        // 展示错误信息提示
        renderErrorTips(mes) {
            this.$Message.error({
                content: mes,
                duration: 5
            });
        },
        // 展示新建输入框
        showNewCreateItem(type) {
            if(type === 'classify') {
                this.showClassify = true;
            } else if('label') {
                this.showLabel = true;
            }
        },
        // 取消新建
        cancelNewCreate(type) {
            if(type === 'classify') {
                this.showClassify = false;
            } else if('label') {
                this.showLabel = false;
            }
        },
        confirmCreateClassify () {
            this.classifyList.push({
                value: this.newClassify,
                label: this.newClassify
            });
            this.newClassify= '';
            this.showClassify = !this.showClassify;
        },
        // 新建标签
        confirmCreateTag () {
            this.lablelList.push({
                value: this.newLabel,
                label: this.newLabel
            });
            this.newLabel= '';
            this.showLabel = !this.showLabel;
        },
        cancelPulish() {
            this.clearInputData();
            this.openModal = false;
        },
    }
}
</script>

<style scoped lang="less">
    @import '../../style/article/ArticleEditor.less';
    
</style>