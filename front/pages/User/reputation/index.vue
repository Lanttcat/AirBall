<template>
    <div>
        <v-layout row>
            <v-flex xs12>
                <sub-header :subHeaderData=settingListArray></sub-header>
            </v-flex>
        </v-layout>
        <repu-card></repu-card>
    </div>
</template>
<script>
import subHeader from '@/components/SubHeader';
import repuCard from './card.vue';
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
   components: {
       'sub-header': subHeader,
       'repu-card': repuCard
   }
}
</script>
