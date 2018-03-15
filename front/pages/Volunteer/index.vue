<template>
    <v-layout row>
        <v-flex xs12>
            <sub-header :subHeaderData=settingListArray></sub-header>
            <alert-info :alertData = alertData></alert-info>
            <!-- <article-card :articleListData=articleList></article-card> -->
        </v-flex>
    </v-layout>
</template>
<script>
import alertInfo from '@/components/AlertInfo';
import subHeader from '@/components/SubHeader';
import { mapState } from 'vuex';
function setState(store) {
    // store.dispatch('appShell/appHeader/setAppHeader', {
    //     isShowHeader: false
    // });
    store.dispatch('global/setShellStyleControl', {
        header: 3,
        footr: 3
    });
}
export default {
    name: 'Volunteer',
    data() {
        return {
            alertData: {
                isAlert: true,
                text: '欢迎注册成为志愿者'
            },
            settingListArray: {
                title: '志愿者',
                leftIcon: 'arrow_back'
            },
        }
    },
    computed: {
        ...mapState('userStatus/userStatu', [
            'userInfo'
        ])
    },
    components: {
        'alert-info': alertInfo,
        'sub-header': subHeader
    },
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    mounted() {
        console.log(this.$router)
        if (!this.userInfo.volunter) {
            this.$router.replace('volunteer/volunteer-reg');
        }
    }
}
</script>
