<template>
    <div class="main">
        <Header></Header>
    </div>
</template>

<script>
import Header from './components/Header';

export default {
    name: 'login',
    components: {
        'Header': Header
    },
    data () {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style lang="less">
    @import '../style/Login.less';

</style>

