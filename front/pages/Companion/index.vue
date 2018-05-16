<template>
    <div>
        <!-- 预测列表 -->
        <v-layout row>
            <v-flex xs12>
                <div class="subheading">神预测</div>
                <div v-for="item in matchInfos" :key="item.id">

                    <game-card :matchInfo="item" class="game-card-wrap"></game-card>
                </div>
                <!-- <game-card class="game-card-wrap"></game-card>
                <game-card class="game-card-wrap"></game-card>
                <game-card class="game-card-wrap"></game-card>
                <game-card class="game-card-wrap"></game-card>
                <game-card class="game-card-wrap"></game-card> -->
            </v-flex>
        </v-layout>
        <!-- 往期预测王 -->
    </div>
</template>
<script>
import gameCard from './card/predictCard';
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        isShowHeader: true,
        title: '茶途',
        isShowInputSearch: true,
        isShowBtnSearch: true,
        leftBtn: {
            isShow: true,
            isLogo: true,
            src: '/static/img/icons/logo.png',
            alt: 'logo'
        }
    });
    store.dispatch('global/setShellStyleControl', {
        header: 1,
        footer: 1
    });
}
export default {
    name: 'companion',
    data () {
        return {
            matchInfos: []
        }
    },
    components: {
        'game-card': gameCard
    },
    async asyncData({store, route}) {
        setState(store);
        console.log(this);
    },
    mounted() {
        // 获取比赛列表
        this.$http.get("/api/match", {
            params: {
                days: 3
            }
        }).then(({data}) => {
            if(data.data.length > 0) {
                // this.storeMatchList(data.data);
                this.matchInfos = data.data;
            }
        });

    },
    activated() {
        setState(this.$store);
    }
}
</script>
<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'
#app
    .app-view
        top 52px

    .game-card-wrap
        padding 6px
        border-radius 3px
        background #E8F5E9
</style>
