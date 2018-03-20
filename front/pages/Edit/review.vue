<template>
    <div>
        <sub-header :subHeaderData = menu></sub-header>
        <article-list :listArray = '{}'></article-list>
        <v-layout>
        <v-flex xs12>
            <v-card flat>
                <v-card-media :src="info.imgSrc || '../../static/img/testimg/default.jpg'" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ info.title }}</h3>
                        <div v-html="info.content"></div>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat color="orange">举报</v-btn>
                    <v-btn flat color="orange">赞赏</v-btn>
                    <v-btn flat color="orange">评论</v-btn>
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
                    </template>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
    </div>
</template>
<script>
import articleList from '@/components/ArticleList';
import subHeader from '@/components/SubHeader';
export default {
    name: 'article-review',
    components: {
        'article-list': articleList,
        'sub-header': subHeader
    },
    data() {
        return {
            info: {},
            menu: {
                leftIcon: 'arrow_back',
                title: '文章预览'
            }
        }
    },
    methods: {
    },
    computed: {
        title() {}
    },
    created() {
         this.info = this.$route.params
    }
}
</script>

<style lang="stylus" scoped>

</style>
