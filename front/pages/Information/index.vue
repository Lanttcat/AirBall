<template>
    <div id="myContainer">
        <player></player>
    </div>
</template>
<script>
import player from './player/index.vue'
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        isShowHeader: true,
        title: '',
        isShowInputSearch: true,
        isShowBtnSearch: true,
        leftBtn: {
            isShow: true,
            isLogo: true,
            src: '/static/img/icons/logo.png',
            alt: 'logo'
        }
    });
}
export default {
    name: 'information',
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    components: {
        'player': player
    }
}
</script>
<style lang="stylus" scoped>
// 替换header
#app .app-view
    top 52px

#myContainer
    margin-bottom 56px
</style>
