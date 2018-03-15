<template>
    <div>
        <player-title :titles="playerInfo.base_player_message"></player-title>
        <v-divider></v-divider>
        <base-info 
            :baseInfo="playerInfo.career_record" 
            :baseAvData="[playerInfo.current_year_match_stat]">
        </base-info>
        <v-divider></v-divider>
    </div>
</template>
<script>
import info from '../../../mock/playinfo.json';
import playerTitle from './title.vue';
import baseInfo from './baseInfo.vue';
export default {
    name: 'palyer',
    data() {
        return {
            playerInfo: info.data
        }
    },
    components: {
        'player-title': playerTitle,
        'base-info': baseInfo
    }
}
</script>
