<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card flat>
                <v-card-media :src="info.imgSrc || '../../static/img/testimg/default.jpg'" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ info.title }}</h3>
                        <h3 class="headline mb-0">朱萧默说</h3>
                        <div>
                            <span>声望</span>
                            <span>222</span>
                        </div>
                        <div>{{ info.intro }}</div>
                    </div>
                </v-card-title>
            </v-card>
            <v-tabs
                v-model=active
                color='white'
                fixed-tabs
                slider-color=yellow>
                <v-tab
                    v-for='item in navs'
                    :key='item'
                    ripple>
                    {{item}}
                </v-tab>
                <v-tab-item>
                    <article-list :listArray='listArray'></article-list>
                </v-tab-item>
            </v-tabs>

        </v-flex>
   </v-layout>
</template>
<script>
import { mapActions, mapState } from "vuex";
import articleList from "@/components/ArticleList";
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
    name: 'userHome',
    data() {
        return {
            listArray: {},
            active: null,
            navs: ['文章', '评论'],
            info: [],
            content: '',
            dialog: false
        }
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
        turnToAuther(auth) {

        }
    },
    components: {
        'article-list': articleList
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
