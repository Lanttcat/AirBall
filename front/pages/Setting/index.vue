<template>
  <v-layout row>
    
    <v-flex xs12>
        <sub-header :subHeaderData=settingListArray></sub-header>
      <v-card>
        <v-list>
                <v-list-tile 
                    v-for="item in settingList" 
                    :key="item.id"
                    @click="turnToSeetingDetail(item.id, item.route)"
                    class="setting-list">
                    <!-- <span>{{item.icon}}</span> -->
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex';
import subHeader from '@/components/SubHeader';
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        isShowHeader: false
    });
}
export default {
    name: 'setting',
    data() {
        return {
            settingListArray: {
                title: '设置',
                leftIcon: 'arrow_back'
            }
        }
    },
    computed: {
        ...mapState('appSetting/appSettingList', [
            'settingList'
        ])
    },
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    methods: {
        settingItem () {
            console.log('te');
        },
        turnToSeetingDetail(id, route) {
            console.log(id);
            // this.$router.push(route);
        }
    },
    components: {
        'sub-header': subHeader
    }
  }
</script>
<style lang="stylus" scoped>
.setting-list
    border-bottom 1px solid rgb(220, 220, 200);
    padding 1rem
</style>
