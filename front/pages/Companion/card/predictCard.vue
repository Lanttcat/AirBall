<template>
    <v-layout row wrap class="game-card">
        <v-flex xs8 class="game-card-item">
            <v-flex xs12>
                <p class="game-card-title">测试</p>
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
            <v-layout row class="game-card-content">
                <v-flex xs4>
                    <p class="game-name">4个相关预测</p>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    name: 'predict-card'
}
</script>
<style lang="stylus" scoped>
#app
    .game-card-item
        padding 4px
        background #fff

        p
            margin-bottom 4px

        .game-card-content
            p
                font-size 0.8rem

        .game-name
            margin-top 4px

        .game-time
            margin-top 25%

        .game-card-title
            text-align left
            font-size 0.9rem
</style>
