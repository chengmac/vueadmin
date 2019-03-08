<template>
    <div class="home">
        <Card :bordered="false">
            <p slot="title">首页</p>
            <Row>
                <Col span="12">
                    <Card>
                        <div id="myChart" :style="{width: '100%', height: '50vh'}"></div>
                    </Card>
                </Col>
                <Col span="12">
                    <Card>

                    </Card>
                </Col>
            </Row>
            <!-- <Row>
                <Col span="12">
                    <Card>
                        
                    </Card>
                </Col>
                <Col span="12">
                    <Card>

                    </Card>
                </Col>
            </Row> -->
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
    mounted(){
        this.drawLine();
    },
    methods: {
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
}
</script>

<style scoped lang="less">
    @import '../style/Home.less';

</style>

