<template>
    <div class="app-search-page">
        <header>
            <v-btn light icon class="search-btn" @click.native="$router.go(-1)">
                <v-icon class="search-icon">arrow_back</v-icon>
            </v-btn>
            <form @submit.prevent="search">
                <input class="search-input" v-model="query" type="search" autocomplete="off" placeholder="请输入搜索词" autocapitalize="off" />
            </form>
            <!-- <v-btn light icon class="search-btn" @click.native="query = ''">
                <v-icon class="search-icon">close</v-icon>
            </v-btn> -->
            <v-btn light icon class="search-btn" @click="search">
                <v-icon class="search-icon">search</v-icon>
            </v-btn>
        </header>
        <div v-if="loading" class="search-loading">
            <v-progress-circular indeterminate v-bind:size="70" class="primary--text"></v-progress-circular>
        </div>
        <!-- 会有三种结果 球队 球员 文章 -->

        <!-- 球员 -->
        <div v-if="data.player && data.player.length" class="search-content">
            <v-card>
                <v-layout row
                    class="px-5"
                    v-for="item in data.player" :key="item.id" @click='toPlayerPage(item.player_id)'>
                    <v-flex xs3>
                        <v-avatar
                            size="60px"
                            class="pt-4"
                            slot="activator">
                            <img
                                :src="item.avatar"
                                alt="">
                        </v-avatar>
                    </v-flex>
                    <v-flex xs9 class="palyer-info">
                        <p><strong>{{ item.name }}</strong></p>
                        <p>
                            <span class="grey--text">号码：{{ item.player_number }}</span>
                        </p>
                        <p>
                            <span class="grey--text">球队：{{ item.club_name }}</span>
                        </p>
                    </v-flex>
                    
                </v-layout>
            </v-card>
            <v-divider></v-divider>
        </div>
        <div v-if="data.team && data.team.length" class="search-content">
            <v-card>
                <v-container fluid grid-list-md>
                    <v-layout row wrap>
                        <v-flex
                            v-for="card in data.team"
                            xs6
                            :key="card.club_id"
                            >
                            <v-card>
                                <v-card-media
                                    :src="card.logo"
                                    height="100px"
                                    >
                                    <v-container fill-height fluid>
                                        <v-layout fill-height>
                                            <v-flex xs12 align-end flexbox>
                                                <span class="headline white--text" v-text="card.title"></span>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>  
                                </v-card-media>
                                <v-card-text>
                                    {{ card.name }}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </div>
        <div v-if="data.article && data.article.length" class="search-content">
            <article-list :listArray = 'data.article'></article-list>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import articleList from '@/components/ArticleList';

let state = {
    appHeaderState: {
        show: false
    }
};
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
}

export default {
    name: 'search',
    metaInfo: {
        title: '搜索',
        titleTemplate: '%s - AirBall',
        meta: [
            {name: 'keywords', content: '搜索'},
            {name: 'description', content: ''}
        ]
    },
    data() {
        return {
            query: '',
            loading: false,
            data: [],
            model: ''
        };
    },
    created() {
        let key = this.$route.query.key;
    
        this.query = key;
        this.search(key);
    },
    methods: {
        search(key) {

            // 把数据清空
            this.data = {
                team: [],
                player: [],
                article: []
            };

            // 显示加载动画
            this.loading = true;

            // 让当前输入框失去焦点
            // this.$el.querySelector('.search-input').blur();

            // 等待 1s，模拟加载中的效果
            // await new Promise(resolve => {
            //     setTimeout(resolve, 1000);
            // });

            // 获取搜索结果数据
            this.$http.get("/api/search", {
                params: {
                    key: key || this.query
                }
            }).then(({data}) => {
                    if (data.data) {
                        this.data = data.data;
                        this.loading = false;
                    }
                }
            )
        },

        toPlayerPage(id) {
            this.$router.push({
                path: 'information',
                query: {
                        id: id
                    }
            })
        }
        
        /**
         * 搜索具体处理
         */

        // search(content, model) {
        //     // ?content=科比&model=tag
        //     // 清空data
        //     this.data = [];

        //     this.model = model ? model : 'all';

        //     this.$http.get("/api/search", {
        //         params: {
        //             content: content,
        //             model: model
        //         }
        //     }).then(
                
        //     );
        // }
    },
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    components: {
        'article-list': articleList
    },
};
</script>

<style lang="stylus" scoped>
header
    display flex
    align-items center
    height 52px
    box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)

form
    flex 1

.search-input
    width 100%
    outline none
    font-size 16px
    height 50px

.search-btn
    color #959595

.search-loading
    margin-top 30%
    display flex
    justify-content center

.search-content
    margin-top 20px

li
    list-style-type none
</style>
