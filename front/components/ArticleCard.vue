<template>
    <v-container grid-list-md text-xs-center class="home-feed">
        <div
            v-for="item in articleListData"
            :key="item.id">
            <v-layout row class="card-item">
                <v-flex xs7>
                    <div style="text-align: left">
                        <div class="subheading">{{ item.name }}</div>
                        <div class="subheading">作者：{{ item.author }}</div>
                        <div class="subheading">时间：{{ item.createTime | timeTransform }}</div>
                    </div>
                </v-flex>
                <v-flex x5>
                    <img
                        src="../static/img/testimg/1.jpg">
                    <!-- <div>
                        <span>{{ item.browserNumber }}</span>
                        <span>{{ item.zanNumber }}</span>
                    </div> -->
                </v-flex>
                
            </v-layout>
            <v-divider class="mb-2"></v-divider>
        </div>
    </v-container>
</template>
<script>
export default {
    name: 'article-card',
    props: ['articleListData'],
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
.home-feed
    background-color #fff

    .card-item
        padding 4px 0px 8px 0px
        // height 10rem
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
