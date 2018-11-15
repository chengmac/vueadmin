<template>
    <div class="home">
        <Card :bordered="false">
            <p slot="title">首页</p>
            <Row>
                <Col span="12">
                    <Card>

                    </Card>
                </Col>
                <Col span="12">
                    <Card>

                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Card>
                        
                    </Card>
                </Col>
                <Col span="12">
                    <Card>

                    </Card>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>

export default {
    name: 'Home',
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
    @import '../style/Home.less';

</style>

