<template>
    <div class="navbar">
        <nav class="nav">
            <div class="news">
                <Badge :count="3">
                    <Icon type="ios-notifications-outline" />
                </Badge>
            </div>
            <Dropdown>
                <div>
                    <Avatar src="https://lastfm-img2.akamaized.net/i/u/ar0/76236da55e044132c1ffb4386fcd0492.png"/>
                    <Icon type="md-arrow-dropdown"/>
                </div>
                <DropdownMenu slot="list">
                    <DropdownItem>设置</DropdownItem>
                    <DropdownItem>退出登录</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </nav>
    </div>
</template>

<script>

export default {
  name: 'navbar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    @import '../../style/components/Navbar.less';
</style>
