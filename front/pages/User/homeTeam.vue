<template>
    <div class="home-team">
        <v-layout row>
            <v-flex xs12>
                <sub-header :subHeaderData=settingListArray></sub-header>
            </v-flex>
        </v-layout>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="headline">主队</div>
                </div>
            </v-card-title>
            <v-container fluid grid-list-md>
                <v-layout row wrap>
                    <v-flex
                        v-for="card in selectTeamInfo"
                        xs3
                        :key="card.club_id"
                        >
                        <v-card>
                            <v-card-media
                                :src="card.logo"
                                height="100px"
                                >
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline white--text" v-text="card.title"></span>
                                        </v-flex>
                                    </v-layout>
                                </v-container>  
                            </v-card-media>
                            <v-card-text>
                                {{ card.name }}
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <div class="headline">所有球队</div>
                </div>
            </v-card-title>
            <v-container fluid grid-list-md>
                <v-layout row wrap>
                    <v-flex
                        v-for="card in teamInfo"
                        xs3
                        :key="card.club_id"
                        @click="selectTeam(card)">
                        <v-card>
                            <v-card-media
                                :src="card.logo"
                                height="100px"
                                >
                                <v-container fill-height fluid>
                                    <v-layout fill-height>
                                        <v-flex xs12 align-end flexbox>
                                            <span class="headline white--text" v-text="card.title"></span>
                                        </v-flex>
                                    </v-layout>
                                </v-container>  
                            </v-card-media>
                            <v-card-text>
                                {{ card.name }}
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>
<script>
import subHeader from '@/components/SubHeader';
import teamInfoJson from '@/data/cbaTeamInfo.json';
export default {
    name: 'homeTeam',
    data() {
        return {
                settingListArray: {
                    title: '我的主队',
                    leftIcon: 'arrow_back'
                },
                teamInfo: teamInfoJson,
                selectTeamInfo: []
        }
    },
    methods: {
        selectTeam(info) {
            if (this.selectTeamInfo.length < 3) {
                for (let i = 0; i < this.selectTeamInfo.length; i++) {
                    if (info.id === this.selectTeamInfo[i].id) {
                        return;
                    }
                }
                this.selectTeamInfo.push(info);
            }
        }
    },
    components: {
        'sub-header': subHeader
    }
}
</script>
<style lang="stylus" scoped>
#app
    .home-team
        padding-bottom 56px
</style>

