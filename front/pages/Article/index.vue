<template>
    <v-layout>
        <v-flex xs12>
            <v-card flat>
                <v-card-media :src="info.imgSrc || '../../static/img/testimg/default.jpg'" height="200px">
                </v-card-media>
                <v-card-title primary-title v-if="info.title">
                    <div>
                        <h3 class="headline mb-0">{{ info.title }}</h3>
                        <div>
                            <span>{{ info.creatTime | timeTransform }}</span>
                            <span @click='turnToAuthor'>作者: {{info.authorName}}</span>
                        </div>
                        <div>{{ info.intro }}</div>
                    </div>
                </v-card-title>
                <v-card-title primary-title>
                    <div v-if="info.content">
                        <p>
                            {{info.content}}
                        </p>
                    </div>
                    <div v-else>
                        <h3 class="headline mb-0">文章加载失败^_^</h3>
                    </div>
                </v-card-title>
                <div class="text-xs-right">
                    <v-btn flat @click="upComment" color="orange">评论</v-btn>
                    <v-btn flat color="orange" @click="collectBtn(info._id)">收藏</v-btn>
                    <v-btn flat color="orange" @click="reportBtn(info._id)">举报</v-btn>
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
                    <v-toolbar card light>
                        <v-btn icon @click="closeCard">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="publish">
                                <v-icon>publish</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-layout class="comment-input">
                        <v-flex xs12 align-center='false'>
                            <v-text-field
                                box
                                light
                                auto-grow
                                rows='3'
                                name="commentContent"
                                label="填写评论信息"
                                textarea
                                color="grey lighten-3"
                                v-model="content"
                                counter='100'
                            ></v-text-field>
                            <div>
                                <span>规范协议</span>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-bottom-sheet>
        </template>
    </v-layout>
</template>
<script>
import articleComment from '@/components/ArticleComment';
import comments from '@/components/CommentItem';
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
        },
        collectBtn(id) {
            
        },
        reportBtn(id) {

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
        this.$http.get("/api/article", {
            params: {
                articleId: this.$route.query.id
            }
        }).then(
            ({data}) => {

                if (data.data.status) {
                    this.info = data.data.data[0];
                    console.log(this.info);
                }
                else {
                    // this.setMsgTip({msgSwitch: true, msgText: '获取列表失败'});
                }
            }
        );
    },
    filters: {
        timeTransform(value) {
            let time = new Date(value);
            
            let formatTime = `${time.getFullYear()}-${time.getMonth()}-${time.getDay()}:${time.getHours()}时`
            console.log(formatTime)
            return formatTime;
        }
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
