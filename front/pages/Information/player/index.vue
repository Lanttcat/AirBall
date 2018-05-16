<template>
    <div>
        <player-title v-if='playerInfo' :titles="playerInfo.base_player_message"></player-title>
        <v-divider></v-divider>
        <v-tabs
            v-model="active"
            color="white"
            fixed-tabs
            slider-color="light-green">
            <v-tab
                v-for="item in navs"
                :key="item"
                ripple>
                {{ item }}
            </v-tab>
            <!-- 资料 -->
            <v-tab-item>
                <base-info 
                    v-if='playerInfo'
                    :baseInfo="playerInfo.career_record" 
                    :baseAvData="[playerInfo.current_year_match_stat]">
                </base-info>
            </v-tab-item>
            <!-- 数据 -->           
            <v-tab-item>
                <data-info 
                    v-if="gameInfo"
                    :data='gameInfo'
                    :cardTitle='cardTitle'>
                </data-info>
            </v-tab-item>
            <!-- 新闻 -->
            <v-tab-item>
                <article-card v-if="articleList" :articleListData=articleList></article-card>
            </v-tab-item>

        </v-tabs>
        <v-divider></v-divider>
    </div>
</template>
<script>
import playerTitle from './title.vue';
import baseInfo from './baseInfo.vue';
import dataInfo from './dataInfo.vue';
import articleCard from '@/components/ArticleCard';
import dataTableVue from '../common/dataTable.vue';

function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        isShowHeader: true,
        title: 'AirBall篮球社区',
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
    name: 'palyer',
    data() {
        return {
            active: null,
            navs: ['资料', '数据', '新闻'],
            cardTitle: '比赛数据',
            playerInfo: null,
            gameInfo: null,
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
    async created() {
        let id = this.$route.query.id || 168;
        let url = `https://api-all.9h-sports.com/cba-data/api/cba/v1/league/player-history/${id}`;
        let {data} = await  this.$http.get(url, {params: {}});

        if (data.success) {
            this.playerInfo = data.data;
        }
        let matchUrl = `https://api-all.9h-sports.com/cba-data/api/cba/v1/league/play-stats?player_id=${id}`;
        let res = await this.$http.post(matchUrl, {"pageSize":0,"pageNo":0,"needPage":false})
        if (res.data.success) {
            this.gameInfo = res.data.data.list;
        }
    },
    components: {
        'player-title': playerTitle,
        'base-info': baseInfo,
        'article-card': articleCard,
        'data-info': dataInfo
    }
}
</script>
