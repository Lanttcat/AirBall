<template>
    <div>
        <sub-header :subHeaderData = menu></sub-header>
        <article-list v-if="listArray" :listArray='listArray'></article-list>
        <v-subheader v-else>您还没有发布过文章</v-subheader>
    </div>
</template>
<script>
import articleList from '@/components/ArticleList';
import subHeader from '@/components/SubHeader';
export default {
    name: 'articleList',
    components: {
        'article-list': articleList,
        'sub-header': subHeader
    },
    data() {
        return {
            menu: {
                leftIcon: 'arrow_back',
                title: '我的文章'
            },
            listArray: []
        }
    },
    async created() {
        let res = await this.$http.get('/api/userOwnArticle');
        if (res.data.data) {
            this.listArray = res.data.data;
        }
    },
}
</script>

<style lang="stylus" scoped>

</style>
