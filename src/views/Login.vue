<template>
    <div class="login">
        <div class="login_head">

        </div>
        <div class="loginBody">
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <!-- eslint-disable-next-line vue/max-attributes-per-line -->
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password" @keyup.native.enter="enterSubmit('formInline')">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                </FormItem>
            </Form>
        </div> 
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    name: 'login',
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    Cookies.set('user', this.formInline.user, { expires: 7});
                    Cookies.set('password', this.formInline.password, { expires: 7});
                    this.$router.push('main');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        enterSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    Cookies.set('user', this.formInline.user, { expires: 7});
                    Cookies.set('password', this.formInline.password, { expires: 7});
                    this.$router.push('main');
                } else {
                    this.$Message.error('Fail!');
                }
            }) 
        }
    }
}
</script>

<style lang="less">
    @import '../style/Login.less';

</style>

