<template>
    <v-layout>
        <v-flex xs12>
            <v-card flat>
                <v-card-media :src="info.imgSrc || '../../static/img/testimg/default.jpg'" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ info.title }}</h3>
                        <h3 class="headline mb-0">测试标题</h3>
                        <div>
                            <span>time</span>
                            <span @click='turnToAuthor'>作者</span>
                        </div>
                        <div>{{ info.intro }}</div>
                    </div>
                </v-card-title>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">文章加载失败^_^</h3>
                    </div>
                </v-card-title>
                <div class="text-xs-right">
                    <v-btn flat @click="upComment" color="orange">评论</v-btn>
                    <v-btn flat color="orange">收藏</v-btn>
                    <v-btn flat color="orange">举报</v-btn>
                </div>
                <v-list two-line>
                    <template v-if="info.commentArray">
                        <v-subheader>这些评论亮了</v-subheader>
                        <v-list-tile-content>
                            <v-list-tile-title></v-list-tile-title>
                            <v-list-tile-sub-title>
                                暂时还没有评论，快来抢沙发吧
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </template>
                    <template v-else>
                        <comments></comments>
                    </template>
                </v-list>
            </v-card>
        </v-flex>
        <template>
    <v-bottom-sheet v-model="dialog">
        <v-card tile>
            <v-toolbar card light color="dark">
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
                        color="light-green accent-4"
                        v-model="content"
                        counter='100'
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
import comments from '../../components/CommentItem';
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
        'article-commenet': articleComment,
        'comments': comments
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
        },
        turnToAuthor() {
            console.log(this.$router)
            // 获取文章id
            this.$router.push('/user/user-home');
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

    .comment-input
        padding 8px

        .input-group__input
            border 1px solid red
</style>
