<template>
    <div>
        <v-layout row>
            <v-flex xs12>
                <sub-header :subHeaderData="settingListArray"></sub-header>
            </v-flex>
        </v-layout>
        <repu-card :airValue="userInfo.repu"></repu-card>
        <v-layout row>
            <div class="title py-3 px-3">Air币是官方游戏币</div>
        </v-layout>
    </div>
</template>
<script>
import subHeader from '@/components/SubHeader';
import repuCard from './card.vue';
import { mapState } from "vuex";
export default {
   name: 'reputation',
   data() {
       return {
            settingListArray: {
                title: '声望系统',
                leftIcon: 'arrow_back'
            }
       }
    },
    computed: {
        ...mapState('userStatus/userStatu', [
            'userInfo'
        ])
    },
    components: {
        'sub-header': subHeader,
        'repu-card': repuCard
    }
}
</script>
