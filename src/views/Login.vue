<template>
    <Layout class="login">
        <div class="login-container">
            <Content class="loginBody">
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <!-- eslint-disable-next-line vue/max-attributes-per-line -->
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="Password" @keyup.native.enter="handleSubmit('formInline')">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formInline')" :loading="loading">登录</Button>
                    </FormItem>
                </Form>
            </Content>
        </div> 
    </Layout>
</template>

<script>
import Cookies from 'js-cookie'

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
    computed: {
        loading() {
            return this.$store.state.auth.loginloading;
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let userInfo = {username: this.formInline.user, password: this.formInline.password};
                    this.$store.dispatch('LOGIN_REQUEST', userInfo).then(res => {
                        this.$Message.success(res.data.message);
                        Cookies.set('token', res.data.result.token, { expires: 7});
                        this.$router.push('home');
                    })
                    .catch(err => {
                        this.$Message.error(err.message);
                    });
                    
                } 
            })
        }
    }
}
</script>

<style lang="less">
    @import '../style/Login.less';

</style>