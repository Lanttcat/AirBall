<template>
    <v-layout row wrap class="game-card">
        <!-- <v-subheader>{matchInfo.mat}</v-subheader> -->
        <v-flex xs8 class="game-card-item">
            <v-flex xs12>
                <p class="game-card-title">常规赛</p>
            </v-flex>
            <v-layout row class="game-card-content">
                <v-flex xs4>
                    <v-avatar size="36px" tile>
                        <img :src="matchInfo.home_club_logo" alt="主队logo">
                    </v-avatar>
                    <p class="game-name">{{matchInfo.homeClubName}}</p>
                </v-flex>
                <v-flex xs4>
                    <p class="game-time">{{matchInfo.matchTime | timeChange}}</p>
                </v-flex>
                <v-flex xs4>
                    <v-avatar size="36px" tile>
                        <img :src="matchInfo.guest_club_logo" alt="客队logo">
                    </v-avatar>
                    <p class="game-name">{{matchInfo.guestClubName}}</p>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs4 class="game-card-item">
            <div v-if="!isSelect">
                <p class="game-select" @click='gameProdict(1)'>
                    主队赢
                    <span v-if="matchInfo.syePro">(系统)</span>
                </p>
                <p class="game-select" @click='gameProdict(0)'>
                    客队赢
                    <span v-if="!matchInfo.sysPro">(系统)</span>
                </p>
            </div>
            <div v-else>
                <p class="game-select" style="line-height: 6rem">
                    已选择:{{selectedText}}
                </p>
            </div>
        </v-flex>

        <v-dialog v-model='repuStart' max-width='450px'>
            <v-card>
                <v-card-title>
                    选择声望(Air币)
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
                <v-card-actions class="px-4">
                    <span @click="toAir" class="red--text">Air币说明</span>
                </v-card-actions>
                <v-card-actions>
                    <v-btn flat left @click.stop="repuStart=false">关闭</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat right @click.stop="sendRepuProdict">确认</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-layout>
</template>
<script>
export default {
    name: 'predict-card',
    props: ['matchInfo'],
    data() {
        return {
            repuStart: false,
            repuValue: 10,
            isSelect: false,
            selectedText: '',
            isBelieve: 0
        }
    },
    methods: {
        gameProdict(isBelieve) {
            // select repu value
            this.isBelieve = isBelieve;
            this.repuStart = true;
        },
        sendRepuProdict(isBelieve, id) {
            // 多一步Air余额验证
            this.$http.post("/api/prodict", {
                repu: this.repuValue,
                isBelieve: this.isBelieve,
                gameid: this.matchInfo.id
            }).then(({data}) => {
                    this.isSelect = true;
                    this.selectedText = this.isBelieve ? '主队赢' : '客队赢';
                    this.repuStart = false;
                }).catch((e) => {
                    console.log(e);
                    // 问题监控：log打点
                    this.$router.push('error');
                })
        },
        toAir() {
            console.log(this.$router)
            this.$router.push('/user/reputation')
        }
    },
    filters: {
        timeChange(value) {
            let time = new Date(value);
            let formatTime = `${time.getFullYear()}.${time.getMonth()}.${time.getDay()}:${time.getHours()}点`;
            return formatTime;
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
