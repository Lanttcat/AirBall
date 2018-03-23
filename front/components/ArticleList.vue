<template>
    <v-container grid-list-md text-xs-center>
        <v-layout v-for="item in listArray"
            :key="item._id"
            row wrap
            class="article-list">
            <v-flex xs8>
                <div style="text-align: left">
                    <div class="subheading" @click="TurnToArticle(item._id)">{{ item.title }}</div>
                        <v-chip outline color="red">
                            <!-- <v-icon left>label</v-icon> -->
                            去处
                        </v-chip>
                        <v-chip outline color="red">
                            <!-- <v-icon left>label</v-icon> -->
                            标签
                        </v-chip>
                    <div>
                        <span>{{ item.creatTime |  formatTime}}</span>
                        <span>1111浏览</span>
                        <span>161赞</span>
                    </div>
                </div>
            </v-flex>
            <v-flex xs4>
                <v-card-media
                    src="../../static/img/testimg/default.jpg"
                    height="8rem"
                    contain
                ></v-card-media>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'article-list',
    props: ['listArray'],
    filters: {
        formatTime(value) {
            let date = new Date(value);
            let y = date.getFullYear() + '.';
            let mo = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
            let d = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds(); 
            return mo + d + h + m + s; 
        }
    },
    methods: {
        TurnToArticle(id) {
            this.$router.push({
                path: 'article',
                query: {
                    id: id
                }
            });
        }
    }
}
</script>
<style lang="stylus" scoped>
#app
    .subheading
        line-height 2rem
    .article-list
        border-bottom solid 1px rgb(240, 240, 240);
</style>
