<template>
    <v-layout row wrap class="game-card">
        <div
            v-for="item in match"
            :key='item.id'
            class="game-list">
            <v-flex xs12 class="game-card-item">
                <v-flex xs12>
                    <p class="game-card-title">常规赛</p>
                </v-flex>
                <v-layout row class="game-card-content">
                    <v-flex xs4>
                        <v-avatar size="36px" tile>
                            <img :src="item.home_club_logo" alt="">
                        </v-avatar>
                        <p class="game-name">{{item.homeClubName}}</p>
                    </v-flex>
                    <v-flex xs4>
                        <p class="game-time">20:11</p>
                    </v-flex>
                    <v-flex xs4>
                        <v-avatar size="36px" tile>
                            <img :src="item.guest_club_logo" alt="">
                        </v-avatar>
                        <p class="game-name">{{item.guestClubName}}</p>
                    </v-flex>
                </v-layout>
            </v-flex>
        </div>
    </v-layout>
</template>
<script>
export default {
    name: 'game-card',
    props: ["match"]
}
</script>
<style lang="stylus" scoped>
#app
    .game-list
        width 50%
        margin-top 5px

        &:nth-child(-n+2)
            margin-top 0

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

        &:nth-child(2n)
            border-left 4px solid #E8F5E9

        &:nth-child(2n-1)
            border-right 4px solid #E8F5E9
</style>
