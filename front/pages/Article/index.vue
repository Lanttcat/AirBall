<template>
    <v-layout style="margin-bottom: 56px">
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
                    <v-btn flat color="orange" @click="collectBtn(info._id)">{{ collectStatusMsg }}</v-btn>
                    <v-btn flat color="orange" @click="reportBtn(info._id)">举报</v-btn>
                </div>
                <v-list two-line>
                    <template v-if="commenetShow">
                        <v-subheader>评论</v-subheader>
                        <v-list-tile-content>
                            <v-list-tile-title></v-list-tile-title>
                            <v-list-tile-sub-title class="px-5">
                                暂时还没有评论，快来抢沙发吧
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                    </template>
                    <template v-else>
                        <v-subheader>这些评论亮了</v-subheader>
                        <comments :comments="comments"></comments>
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
                            <!-- <span color="warning"> </span> -->
                            <v-alert
                                :value="true"
                                outline color="warning"
                                icon="priority_high"
                                class="py-1">
                                请遵守相关的规范协议
                            </v-alert>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-bottom-sheet>
            <v-bottom-sheet v-model="dialogReport">
                <v-card tile>
                    <v-toolbar card light>
                        <v-btn icon @click="closeCard">
                            <v-icon>close</v-icon>
                        </v-btn>
                        <span class="headline">举报理由</span>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon @click="reportPublish">
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
                                name="reportContent"
                                label="填写举报理由"
                                textarea
                                color="grey lighten-3"
                                v-model="reportContent"
                                counter='100'
                            ></v-text-field>
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
            commentWarning: '',
            comments: [],
            commenetShow: true,
            commentPublishFlag: true, // 评论是否可以发送
            reportContent: '',
            dialog: false,
            dialogReport: false,
            collectStatus: false,
            collectStatusMsg: '收藏'
        }
    },
    components: {
        'article-commenet': articleComment,
        'comments': comments
    },
    methods: {
        ...mapActions('userStatus/userStatu', [
            'setUserInfo'
        ]),
        upComment() {
            if (this.commentPublishFlag) {
                this.dialog = true;
            }
        },
        closeCard() {
            this.dialog = false;
            this.dialogReport = false;
        },
        publish() {
            // 验证信息
            let warningTxt = [
                '最少七个字',
                '最多255个字',
                '评论失败，请稍候重试'
            ];

            if (this.content.length < 8) {
                this.commentWarning = warningTxt[0];
            }
            if (this.content > 255) {
                this.commentWarning = warningTxt[1];
            }
            
            // 发送到服务器
            this.$http.post("/api/comment", {
                id: this.info._id,   // 文章id
                commentInfo: {
                    userId: this.userInfo.aid,
                    userV: '',
                    userName: this.userInfo.name,
                    parentNodeId: '',
                    parentNodeName: '',
                    content: this.content,
                    zanCount: 0
                }
            }).then(
                ({data}) => {
                    console.log(data);
                    if (data.status) {
                    }
                    else {
                        this.commentWarning = warningTxt[2];
                    }
                    // 将数据同步到store
                },
                (err) =>  {
                    this.commentWarning = warningTxt[2];
                }
            );
            // 本地显示
        },
        turnToAuthor() {
            // 获取文章id
            this.$router.push('/user/user-home');
        },
        collectBtn(id) {
            if(!this.collectStatus) {
                this.$http.post("/api/collection", {
                    aid: this.userInfo.aid,
                    articleId: this.info._id,
                    title: this.info.title,
                    author: this.info.authorName
                }).then(
                    ({data}) => {
                        if(data.status) {
                            this.collectStatusMsg = '已收藏';
                            this.collectStatus = true;
                        }
                    },
                    (err) => {
                        // that.setMsgTip({msgSwitch: true, msgText: '注册失败，请稍后再试'});
                    }
                );
            }
        },
        reportBtn(id) {
            this.dialogReport = true;
        },
        reportPublish() {

        }
    },
    computed: {
        ...mapState('userStatus/userStatu', [
            'userInfo'
        ])
    },
    async asyncData({ store, route }) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    created() {
        // 获取文章信息
        this.$http.get("/api/article", {
            params: {
                articleId: this.$route.query.id
            }
        }).then(
            ({data}) => {

                if (data.data.status) {
                    this.info = data.data.data[0];
                    this.comments = this.info.commentArray;
                    this.commenetShow = this.comments.length > 0 ? false : true;
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
            
            let formatTime = `${time.getFullYear()}-${time.getMonth()}-${time.getDay()}:${time.getHours()}时`;
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
