<template>
    <v-layout row>
        <v-flex xs12  v-if="listArray">
            <v-card flat>
                <v-list>
                    <v-list-tile avatar v-for="item in listArray" :key="item.title">
                        <!-- <v-list-tile-action>
                            <v-icon v-if="item.icon" color="pink">star</v-icon>
                        </v-list-tile-action> -->
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.time }}-{{item.status}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-avatar
                            v-if="item.image"
                            tile>
                            <img :src="item.iamge">
                        </v-list-tile-avatar>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
        <v-flex xs12 v-else style="padding-top:3rem">
            <div class="headline text-xs-center">
                暂无
            </div>
            <div class="text-xs-center">
                快去 <v-btn style="display:inline;paddig:0" flat color="error">创建</v-btn>第一篇文章吧
            </div>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    name: 'article-list',
    props: ['listArray']
}
</script>
<style lang="stylus" scoped>

</style>
