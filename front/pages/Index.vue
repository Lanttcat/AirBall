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
                        outline
                        color="red"
                        @click="toSearch">
                        <!-- <v-icon left>label</v-icon> -->
                        去处
                    </v-chip>
                    <v-chip outline color="red">
                        <!-- <v-icon left>label</v-icon> -->
                        标签
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
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
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
            // console.log(data.data);
            if(data.data.length > 0) {
                this.storeMatchList(data.data);
                this.matchList = data.data.slice(0, 4);
                console.log(this.matchList);
            }
        }).catch(() => {
            console.log('ceshi')
        });


        // 加载文章列表
        this.$http.get("/api/allArticle", {}).then(({data}) => {
            console.log(data.data);
            if(data.data.data.length > 0) {
                this.articleList = data.data.data;
                console.log(this.articleList);
            }
        }).catch(() => {
            console.log('ceshi')
        });
    },
    methods: {
        ...mapMutations('match/list', [
            'storeMatchList'
        ]),
        getSSList: () => {
            this.$http.get("/api/scenicspot", {
                params: {
                    num: 3
                }
            }).then(
                ({data}) => {
                    console.log(data);
                    if( data.status) {
                        this.ssList = data.data;
                        console.log(data);
                        this.setMsgTip({msgSwitch: true, msgText: '验证码发送成功'});
                    }
                    else {
                        this.setMsgTip({msgSwitch: true, msgText: '获取列表失败'});
                    }
                }
            );
        },
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

