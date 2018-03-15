<template>
    <v-layout>
        <v-flex xs12>
            <v-card flat>
                <v-card-media :src="info.imgSrc || '../../static/img/testimg/default.jpg'" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ info.name }}</h3>
                        <div>{{ info.intro }}</div>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat @click="upComment" color="orange">评论</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
                <v-list two-line>
                    <template>
                        <v-subheader>评论</v-subheader>
                        <v-list-tile-content>
                            <v-list-tile-title></v-list-tile-title>
                            <v-list-tile-sub-title>
                                暂时还没有评论，快来抢沙发吧
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <!-- <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                        <v-list-tile avatar v-else  :key="item.title">
                        <v-list-tile-avatar>
                            <img :src="item.avatar">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                        </v-list-tile-content> -->
                        <!-- </v-list-tile> -->
                    </template>
                </v-list>
            </v-card>
        </v-flex>
        <article-commenet :dialog = dialog ></article-commenet>
    </v-layout>
</template>
<script>
import articleComment from '../../components/articleComment';
import { mapActions, mapState } from "vuex";
function setState(store) {
    store.dispatch("appShell/appHeader/setAppHeader", {
        isShowHeader: false
    });
    store.dispatch('global/setShellStyleControl', {
        header: 3,
        footer: 2
    });
}
export default {
    name: 'articleDetail',
    data() {
        return {
            info: [],
            dialog: true
        }
    },
    components: {
        'article-commenet': articleComment
    },
    methods: {
        upComment: () => {
            console.log('dddddddd')
            this.dialog = true
        }
    },
    async asyncData({ store, route }) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    created() {
        console.log(this.$route.query.id)
        this.$http.get("/api/scenicspotList", {
            params: {
                id: this.$route.query.id
            }
        }).then(
            ({data}) => {
                console.log(data);
                if (data.data.status) {
                    this.info = data.data.data[0];
                    console.log(this.status)
                    console.log(data);
                    // this.setMsgTip({msgSwitch: true, msgText: '验证码发送成功'});
                }
                else {
                    // this.setMsgTip({msgSwitch: true, msgText: '获取列表失败'});
                }
            }
        );
    }
}
</script>
<style lang="stylus" scoped>

.comment-text
    padding auto 16px
</style>
