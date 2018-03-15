<template>
    <div>
        <loacl-header></loacl-header>
        <v-container grid-list-md text-xs-center class="home-feed">
            <h2 style="text-align: left">比赛列表</h2>
            <!-- 一般三到四个 -->
            <v-layout
                v-for="item in ssList"
                :key="item._id"
                row
                class="card-item">
                <v-flex xs6>
                  <div style="text-align: left">
                    <div class="headline" @click="TurnToArticle(item._id)">{{ item.name }}</div>
                    <div class="headline-sub">{{ item.intro }}</div>
                    <v-chip
                        v-for="tag in item.tag"
                        :key="tag.id"
                        outline
                        class="item-tag"
                        color="red">
                        {{tag}}
                    </v-chip>
                  </div>
                </v-flex>
                <v-flex x6>
                    <img :src="item.imgSrc">
                    <div>
                        <span>{{ item.browserNumber }}</span>
                        <span>{{ item.zanNumber }}</span>
                    </div>
                </v-flex>
            </v-layout>
            <h2 style="text-align: left">社区办公室</h2>
            <v-layout row class="card-item">
                <v-flex xs7>
                  <div style="text-align: left">
                    <div class="headline" @click="TurnToArticle('11')">恩比德对位分析，该怎么限制</div>
                    <div>两天的时间在济南其实足够了，并且冬天济南</div>
                    <v-chip outline color="red">
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
                      src="../static/img/testimg/1.JPG"
                      height="8rem"
                      contain
                    ></v-card-media>
                    <div>
                        <span>1111浏览</span>
                        <span>161赞</span>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import loaclHeader from '../components/LocalBanner'

import {mapActions} from 'vuex';
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
    name: 'index',
    data () {
        return {
            
            ssList: [],
            items: [
                {
                    src: '../static/img/testimg/1.JPG'
                },
                {
                    src: '../static/img/testimg/1.JPG'
                },
                {
                    src: '../static/img/testimg/1.JPG'
                },
                {
                    src: '../static/img/testimg/1.JPG'
                }
            ]
        }
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
        this.$http.get("/api/scenicspot", {
            params: {
                num: 3
            }
        }).then(
            ({data}) => {
                console.log(data);
                if (data.data.status) {
                    this.ssList = data.data.data;
                    console.log(this.status)
                    console.log(data);
                    // this.setMsgTip({msgSwitch: true, msgText: '验证码发送成功'});
                }
                else {
                    // this.setMsgTip({msgSwitch: true, msgText: '获取列表失败'});
                }
            }
        );
    },
    components: {
        'loacl-header': loaclHeader
    },
    methods: {
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
            console.log(1111)
            this.$router.push({
                path: 'article',
                query: {
                    id: id
                }
            });
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
#app .app-view.app-view-with-header
    top 0
.app-shell-header
    color white
</style>
