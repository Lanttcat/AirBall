<template>
    <div>
        <!-- 预测列表 -->
        <v-layout row>
            <v-flex xs12>
                <div class="subheading">神预测</div>
                <game-card class="game-card-wrap"></game-card>
                <game-card class="game-card-wrap"></game-card>
                <game-card class="game-card-wrap"></game-card>
                <game-card class="game-card-wrap"></game-card>
                <game-card class="game-card-wrap"></game-card>
                <game-card class="game-card-wrap"></game-card>
            </v-flex>
        </v-layout>
        <!-- 往期预测王 -->
    </div>
</template>
<script>
import gameCard from './card/predictCard'
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        isShowHeader: true,
        title: '茶途',
        isShowInputSearch: true,
        isShowBtnSearch: true,
        leftBtn: {
            isShow: true,
            isLogo: true,
            src: '/static/img/icons/logo.png',
            alt: 'logo'
        }
    });
    store.dispatch('global/setShellStyleControl', {
        header: 1,
        footer: 1
    });
}
export default {
    name: 'companion',
    data () {
        return {
            items: [
                { avatar: '/static/doc-images/lists/1.jpg', title: '张三', subtitle: "测试" },
                { divider: true, inset: true },
                { avatar: '/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
                { divider: true, inset: true },
                { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" },
                { divider: true, inset: true },
                { avatar: '/static/doc-images/lists/4.jpg', title: 'Birthday gift', subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?" },
                { divider: true, inset: true },
                { avatar: '/static/doc-images/lists/5.jpg', title: 'Recipe to try', subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos." }
            ]
        }
    },
    components: {
        'game-card': gameCard
    },
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    }
}
</script>
<style lang="stylus" scoped>
#app
    .app-view
        top 52px

    .game-card-wrap
        padding 6px
        border-radius 3px
        background #E8F5E9
</style>
