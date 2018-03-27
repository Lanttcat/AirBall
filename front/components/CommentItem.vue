<template>
    <v-list flat>
        <div  v-for="item in comments" :key="item.id">
            <v-list-tile>
                <v-list-tile-avatar>
                <img src="../static/img/testimg/default.jpg">
                </v-list-tile-avatar>
                <v-list-tile-content>
                <v-list-tile-title>
                    湖人总冠军
                </v-list-tile-title>
                <v-list-tile-sub-title>
                    认证信息
                </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <div class="detail">
                <div class="reply">
                    <p>作者</p>
                    <p>回复内容</p>
                </div>
                评论信息
            </div>
            <v-layout class="toolbar">
                
                    <v-card flat>
                        <v-flex xs12 flat>
                            <v-toolbar flat color="white">
                                <v-btn>
                                    <span>亮了</span>
                                    <!-- <v-icon></v-icon> -->
                                </v-btn>
                                <v-btn>
                                    <span>回复</span>
                                    <!-- <v-icon>{{ subHeaderData.leftIcon }}</v-icon> -->
                                </v-btn>
                                <div style="flex-basis: 10rem; height: 1rem"></div>
                                <v-btn @click="oepnSheet">
                                    <v-icon>more</v-icon>
                                </v-btn>    
                            </v-toolbar>
                        </v-flex>
                    </v-card>
            </v-layout>
            <v-divider></v-divider>
        </div>
        <v-bottom-sheet v-model="sheet">
            <v-list style="text-align: center">
                <v-list-tile>
                    <v-list-tile-title style="text-align: center">举报</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-title
                        @click="closeSheet"
                        style="text-align: center">
                        取消
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-bottom-sheet>
    </v-list>
</template>
<script>
export default {
    name: 'comment-item',
    data() {
        return {
            sheet: false,
            comments: ['ddd']
        }
    },
    methods: {
        oepnSheet() {
            this.sheet = true;
        },
        closeSheet() {
            this.sheet = false;
        }
    }
}
</script>
<style lang="stylus" scoped>
.detail
    padding 0 1rem 1rem 1rem
    text-align left 

.reply
    padding 10px
    background rgb(250, 240, 240)
    margin-bottom 0.5rem

    p
        margin-bottom 0
        line-height 2rem
        
#app
    .toolbar
        box-shadow none 

        .btn
            margin 0
            background #ffffff
            border none
            box-shadow none
</style>
