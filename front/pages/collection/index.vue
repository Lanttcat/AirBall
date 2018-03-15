<template>
    <v-layout row>
        <v-flex xs12>
            <sub-header :subHeaderData=settingListArray></sub-header>
            <article-card :articleListData=articleList></article-card>
        </v-flex>
    </v-layout>
</template>
<script>
import { mapState } from 'vuex';
import subHeader from '@/components/SubHeader';
import articleCard from '@/components/articleCard';
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        isShowHeader: false
    });
    store.dispatch('global/setShellStyleControl', {
        header: 3,
        footr: 3
    });
}
export default {
    name: 'collection',
    data() {
        return {
            settingListArray: {
                title: '我的收藏',
                leftIcon: 'arrow_back'
            },
            articleList: [
                {
                    articleId: 11322424,
                    title: '在济南五天应该怎么玩',
                    subtitle: '这是一个副标题',
                    tags: ['攻略', '景点'],
                    browserNumber: 22222,
                    zanNumber: 222
                }
            ]
        }
    },
    computed: {
        ...mapState('appSetting/appSettingList', [
            'settingList'
        ])
    },
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    methods: {

    },
    components: {
        'sub-header': subHeader,
        'article-card': articleCard
    }
  }
</script>
<style lang="stylus" scoped>
.setting-list
    border-bottom 1px solid rgb(220, 220, 200);
    padding 1rem
</style>
