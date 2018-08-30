<template>
    <div class="header">
        <nav class="nav">
            <DropDown>
                <a href="javascript:void(0)">
                    <Avatar icon="ios-person" size="large" />
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem>驴打滚</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <DropdownItem>豆汁儿</DropdownItem>
                </DropdownMenu>
            </DropDown>
        </nav>
    </div>
</template>

<script>

export default {
  name: 'header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
