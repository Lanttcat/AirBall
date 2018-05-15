<template>
    <div>
        <loacl-header></loacl-header>

        <v-layout class="game-card-wrap">
            <game-card :match="matchList"></game-card>
        </v-layout>
        <!-- 步行街 用于缓冲用户文章，筛选后推荐值首页 -->
        <!-- <div @click="toStreet">
            <div class="headline">步行街</div>
        </div> -->
        <v-container grid-list-md text-xs-center class="home-feed">
            <h2 style="text-align: left">社区办公室</h2>
            <div v-for="item in articleList" :key="item._id">
            <v-layout
                row
                class="card-item">
                <v-flex xs7>
                  <div style="text-align: left" class="card-item_div">
                    
                    <div class="subheading" @click="TurnToArticle(item._id)">
                        {{item.title}}
                    </div>
                    <v-chip
                        v-for="tag in item.tags" :key="tag.id"
                        outline color="red"
                         @click="toSearch(tag)">
                        <!-- <v-icon left>label</v-icon> -->
                        {{tag}}
                    </v-chip>
                  </div>
                </v-flex>
                <v-flex xs5>
                    <v-card-media
                      src="../../static/img/testimg/default.jpg"
                      height="8rem"
                      contain
                    ></v-card-media>
                    <div>
                        <span>1111浏览</span>
                        <span>161赞</span>
                    </div>
                </v-flex>
            </v-layout>
            </div>
        </v-container>
    </div>
</template>

<script>
import loaclHeader from '@/components/LocalBanner'
import gameCard from '@/components/GameCard'

import {mapActions, mapMutations} from 'vuex';
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
    name: 'index',
    data () {
        return {
            matchList: [],
            articleList: []
        }
    },
    components: {
        'loacl-header': loaclHeader,
        'game-card': gameCard
    },
    metaInfo: {
        title: 'Home',
        titleTemplate: '%s - Airbal',
        meta: [
            {name: 'keywords', content: 'Airbal篮球'},
            {name: 'description', content: '篮球社区'}
        ]
    },
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    created() {
        // 这里需要做个预处理：提前加载整个赛季的比赛列表
        this.$http.get("/api/match", {
            params: {
                days: 3
            }
        }).then(({data}) => {
            if(data.data.length > 0) {
                this.storeMatchList(data.data);
                this.matchList = data.data.slice(0, 4);
            }
        }).catch((err) => {
            console.log(err);
            this.$router.replace(err.router || 'error');
        });

        // 加载文章列表
        this.$http.get("/api/allArticle", {}).then(({data}) => {
            if(data.data.data.length > 0) {
                this.articleList = data.data.data;
            }
        }).catch((err) => {
            this.$router.replace(err.router || 'error');
        });
    },
    methods: {
        ...mapMutations('match/list', [
            'storeMatchList'
        ]),
        TurnToArticle: function (id) {
            // 传递id，详情页通过id获取文章
            this.$router.push({
                path: 'article',
                query: {
                    id: id
                }
            });
        },
        toStreet() {
            this.$router.push('/main/street');
        },
        toSearch() {
            this.$router.push('search')
        }
    }
};
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'
.content
    display flex
    align-items center
    justify-content center
    height 100%
    flex-wrap wrap
    h2
        font-size 46px
        font-weight 500

.home-feed
    background-color #fff

    .card-item
        padding 4px 0px 8px 0px
        height 11rem
        border-bottom 1px solid $colorBorder
        box-shadow none

        .card-item_div
            padding 0.5rem

        .headline
            height 5rem

        .headline-sub
            height 3rem

        .item-tag
            height 1.5rem

        img
            height 8rem
.carousel
    height 200px

// 替换header
#app
    .app-view.app-view-with-header
        top 0

    .app-shell-header
        color white

    .game-card-wrap
        padding 8px
        border-radius 3px
        background #E8F5E9
    
    .headline
        padding 0.5rem auto
</style>
<style>
#app .chip .chip__content{
    height: 24px;
}
</style>

