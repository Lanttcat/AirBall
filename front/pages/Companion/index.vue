<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card flat>
        <v-list three-line>
            <template v-for="(item, index) in items">
                <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                <v-list-tile avatar v-else :key="item.title">
                <v-list-tile-avatar>
                    <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
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
</style>
