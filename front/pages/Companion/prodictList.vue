<template>
    <v-layout row>
        <v-flex xs12>
            <sub-header :subHeaderData="settingListArray"></sub-header>
            <v-list two-line v-if="prodictList">
                <template v-for="(item, index) in prodictList">
                    <v-subheader :key="item.id" class="py-1">
                        {{item.roundName}}: {{ item.homeClubName }}-{{ item.guestClubName }}
                    </v-subheader>
                    <v-list-tile-title 
                        style="text-align: right"
                        class="px-4">声望：{{item.airValue}}</v-list-tile-title>
                            <!-- <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title> -->
                    <v-divider></v-divider>
                </template>
            </v-list>
            <p v-else class="heading">暂无预测</p>
        </v-flex>
    </v-layout>
</template>
<script>
import { mapState } from 'vuex';
import subHeader from '@/components/SubHeader';
import articleCard from '@/components/ArticleCard';
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
    name: 'prodictList',
    data() {
        return {
            settingListArray: {
                title: '我的预测',
                leftIcon: 'arrow_back'
            },
            prodictList: []
        }
    },
    async created() {
        let res = await this.$http.get('/api/userProdict');
        if (res.data.status) {
            this.prodictList = res.data.data;
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
