<template>
    <v-layout row wrap class="game-card">
        <v-flex xs8 class="game-card-item">
            <v-flex xs12>
                <p class="game-card-title">type: 比赛结果测试</p>
            </v-flex>
            <v-layout row class="game-card-content">
                <v-flex xs4>
                    <v-avatar size="36px" tile>
                        <img src="../../../static/img/defaulet_head.png" alt="">
                    </v-avatar>
                    <p class="game-name">浙江广厦</p>
                </v-flex>
                <v-flex xs4>
                    <p class="game-time">20:11</p>
                </v-flex>
                <v-flex xs4>
                    <v-avatar size="36px" tile>
                        <img src="../../../static/img/defaulet_head.png" alt="">
                    </v-avatar>
                    <p class="game-name">山东金星</p>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs4 class="game-card-item">
            <div>
                <p class="game-select" @click='gameProdict(true)'>
                    相信
                    <span>(系统)</span>
                </p>
                <p class="game-select" @click='gameProdict(false)'>
                    不相信
                    <span>(系统)</span>
                </p>
            </div>
        </v-flex>

        <v-dialog v-model='repuStart' max-width='450px'>
            <v-card>
                <v-card-title>
                    选择声望
                </v-card-title>
                <v-card-actions>
                    <v-slider
                        label='10'
                        v-model='repuValue'
                        thumb-label
                        max='200'
                        min='10'>
                    </v-slider>

                </v-card-actions>
                <v-card-actions>
                    <v-btn flat left @click.stop="repuStart=false">关闭</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat right @click.stop="repuStart=false">确认</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-layout>
</template>
<script>
export default {
    name: 'predict-card',
    data() {
        return {
            repuStart: false,
            repuValue: 10

        }
    },
    methods: {
        gameProdict(isBelieve) {
            // select repu value
            this.repuStart = true;
        }
    }
}
</script>
<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'
#app
    .game-card-item
        padding 4px
        background #fff

        &:first-child
            border-right 1px solid $theme

        p
            margin-bottom 4px

        .game-card-content
            p
                font-size 0.8rem

        .game-name
            width 100%
            background $theme

        .game-select
            margin 0
            width 100%
            line-height 3rem
            background $theme

            &:first-child
                background rgb(240, 240, 240)

        .game-time
            margin-top 25%

        .game-card-title
            text-align left
            font-size 0.9rem
</style>
