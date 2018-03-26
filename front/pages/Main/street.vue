<template>
    <div>
        <sub-header :subHeaderData = menu></sub-header>
        <article-list :listArray = listArray></article-list>
        <div>
            <p @click="loadMore">点击加载更多</p>
        </div>
    </div>
</template>
<script>
import articleList from '@/components/ArticleList';
import subHeader from '@/components/SubHeader';
import { mapMutations } from 'vuex';
export default {
    name: 'street',
    components: {
        'article-list': articleList,
        'sub-header': subHeader
    },
    data() {
        return {
            lastTime: undefined,
            listArray: [],
            menu: {
                leftIcon: 'arrow_back',
                title: '步行街'
            }
        }
    },
    methods: {
        ...mapMutations('global', {
            setMsgTip: 'setMsgTip'
        }),
        articleList() {
            this.$http.get("/api/allArticle", {
                params: {
                    lastTime: this.lastTime
                }
            }).then(
                ({data}) => {
                    console.log(data.data.status);
                    if( data.data.status) {
                        console.log(data.data.data)
                        this.listArray.push(...data.data.data);
                    }
                    else {
                        this.setMsgTip({msgSwitch: true, msgText: '抱歉，好像遇到问题'});
                    }
                }
            );
        },
        loadMore() {
            let params = this.lastTime ? {
                params: {
                    lastTime: this.lastTime
                }
            } : {};

            this.$http.get("/api/allArticle", params).then(
                ({data}) => {
                    console.log(data.data.status);
                    if( data.data.status) {
                        console.log(data.data.data)
                        this.listArray.push(...data.data.data);
                    }
                    else {
                        this.setMsgTip({msgSwitch: true, msgText: '抱歉，好像遇到问题'});
                    }
                }
            );
        }
    },
    created() {
        this.articleList();
    }
}
</script>

<style lang="stylus" scoped>

</style>
