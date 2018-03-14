<template>
    <v-container grid-list-md text-xs-center class="home-feed">
        <v-layout
            v-for="item in articleListData"
            :key="item.articleId"
            row
            class="card-item">
            <v-flex xs6>
                <div style="text-align: left">
                <div class="headline">{{ item.title }}</div>
                <div class="headline-sub">{{ item.subtitle }}</div>
                <v-chip
                    v-for="tag in item.tags"
                    :key="tag.id"
                    outline
                    class="item-tag"
                    color="red">
                    {{tag}}
                </v-chip>
                </div>
            </v-flex>
            <v-flex x6>
                <img
                    src="../static/img/testimg/1.jpg">
                <div>
                    <span>{{ item.browserNumber }}</span>
                    <span>{{ item.zanNumber }}</span>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'article-card',
    props: ['articleListData']
}
</script>
<style lang="stylus" scoped>
.home-feed
    background-color #fff

    .card-item
        padding 4px 0px 8px 0px
        height 11rem
        border-bottom 1px solid $colorBorder
        box-shadow none

        .headline
            height 5rem

        .headline-sub
            height 3rem

        .item-tag
            height 1.5rem

        img 
            height 8rem
</style>
