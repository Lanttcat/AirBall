<template>
    <div>
        <sub-header :subHeaderData = menu></sub-header>
        <article-list :listArray = '{}'></article-list>
    </div>
</template>
<script>
import articleList from '@/components/ArticleList';
import subHeader from '@/components/SubHeader';
export default {
    name: 'userArticleList',
    components: {
        'article-list': articleList,
        'sub-header': subHeader
    },
    data() {
        return {
            menu: {
                leftIcon: 'arrow_back',
                title: '我的攻略'
            }
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
