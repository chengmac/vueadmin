<template>
    <div class="articleEditor">
        <Card :bordered="false">
            <p slot="title">文章编辑</p>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="文章名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入文章名称..."></Input>
                </FormItem>
                <FormItem label="文章分类" prop="classify">
                    <Input v-model="formValidate.classify" placeholder="请输入文章分类..."></Input>
                </FormItem>
                <FormItem label="文章标签" prop="label">
                    <Input v-model="formValidate.label" placeholder="请输入文章分类..."></Input>
                </FormItem>
                <FormItem label="内容编辑" prop="content">
                    <div class="editor">
                        <mavon-editor v-model="formValidate.content"/>
                    </div>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">文章发布</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 20px">取消</Button>
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
            formValidate: {
                name: '',
                classify: '',
                label: '',
                content: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '文章名称不能为空', trigger: 'blur' }
                ],
                classify: [
                    { required: true, message: '文章名称不能为空', trigger: 'blur' },
                ],
                label: [
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
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style scoped lang="less">
    @import '../../style/article/ArticleEditor.less';

</style>