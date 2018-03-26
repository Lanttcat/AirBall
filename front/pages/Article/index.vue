<template>
    <v-layout>
        <v-flex xs12>
            <v-card flat>
                <v-card-media :src="info.imgSrc || '../../static/img/testimg/default.jpg'" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ info.title }}</h3>
                        <div>{{ info.intro }}</div>
                    </div>
                </v-card-title>
                <div class="text-xs-right">
                    <v-btn flat @click="upComment" color="orange">评论</v-btn>
                    <v-btn flat color="orange">点亮</v-btn>
                    <v-btn flat color="orange">举报</v-btn>
                </div>
                <v-list two-line>
                    <template v-if="!info.commentArray">
                        <v-subheader>这些评论亮了</v-subheader>
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
                    <template v-else>
                        <v-list-tile-content>
                            <v-list-tile-title></v-list-tile-title>
                            <v-list-tile-sub-title>
                                暂时还没有评论，快来抢沙发吧
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
        <template>
    <v-bottom-sheet v-model="dialog">
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-btn icon @click="closeCard" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click="publish">发布</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-layout class="comment-input">
                <v-flex xs12 align-center='false'>
                    <v-text-field
                        box
                        auto-grow
                        rows='3'
                        name="commentContent"
                        label="填写评论信息"
                        textarea
                        v-model="content"
                        counter='11'
                    ></v-text-field>
                    <div>
                        <span>规范协议</span>
                    </div>
                    
                </v-flex>
            </v-layout>
          <!-- <div style="flex: 1 1 auto;"></div> -->
        </v-card>
    </v-bottom-sheet>
</template>
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
            content: '',
            dialog: false
        }
    },
    components: {
        'article-commenet': articleComment
    },
    methods: {
        upComment() {
            this.dialog = true;
        },
         closeCard() {
            this.dialog = false;
        },
        publish() {
            // 验证信息
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

#app
    .subheader
        border-left solid red 5px
        height 2.5rem
    .btn
        margin 0
        min-width: 40px;
        .btn__content
            padding 0
</style>
