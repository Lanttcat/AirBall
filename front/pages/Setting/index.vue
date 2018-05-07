<template>
    <v-layout row>
        <v-flex xs12>
            <v-card flat>
                <v-toolbar color="white" flat>
                    <v-btn icon @click="goback">
                        <v-icon>arrow_back</v-icon>
                    </v-btn>
                    <v-toolbar-title>设置</v-toolbar-title>
                </v-toolbar>
                <v-list two-line subheader>
                    <v-subheader>账户</v-subheader>
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>头像上传</v-list-tile-title>
                            <!-- <v-list-tile-sub-title>Change your Google+ profile photo</v-list-tile-sub-title> -->
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-content @click="openInputCard('name')">
                            <v-list-tile-title>昵称</v-list-tile-title>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            <v-list-tile-sub-title>朱萧默说</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>性别</v-list-tile-title>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            <v-radio-group v-model="sexRadio" row>
                                <v-radio
                                    v-for="n in sexSelect"
                                    :key="n"
                                    :label="`${n}`"
                                    :value="n"
                                ></v-radio>
                            </v-radio-group>
                        </v-list-tile-content>    
                    </v-list-tile>
                    <v-list-tile avatar>
                        <v-list-tile-content  @click="openInputCard('localtion')">
                            <v-list-tile-title>所在地</v-list-tile-title>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            <v-list-tile-sub-title>山东省济南市</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list two-line subheader>
                    <v-subheader>系统</v-subheader>
                    <v-list-tile avatar>
                        <v-list-tile-action>
                            <v-checkbox></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>备用设置</v-list-tile-title>
                        <v-list-tile-sub-title>提示信息</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
            <div>
                <br>
                <v-btn depressed large color="error" @click="clearLoginStatus">退出当前账号</v-btn>
            </div>
        </v-flex>

        <v-bottom-sheet v-model="dialog">
                <v-card tile>
                    <v-toolbar card>
                        <v-toolbar-title>{{activeLabel}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="closeCard">
                            <v-icon>close</v-icon>
                        </v-btn>
                        
                    </v-toolbar>
                    <v-layout class="comment-input">
                        
                        <v-flex xs10 offset-xs1>
                            <v-text-field
                                box
                                auto-grow
                                name=""
                                color="light-green accent-4"
                                v-model="userSetting.name "
                                counter='20'
                            ></v-text-field>
                            <div>
                                <v-btn depressed large color="error" @click="clearLoginStatus">保存</v-btn>
                                <br>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-bottom-sheet>
    </v-layout>
</template>
<script>
import { mapState } from 'vuex';
import subHeader from '@/components/SubHeader';
import storage from '../../lib/storage.js';
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        isShowHeader: false
    });
}
export default {
    components: {
        'sub-header': subHeader
    },
    name: 'setting',
    data() {
        return {
            settingListArray: {
                title: '设置',
                leftIcon: 'arrow_back'
            },
            activeLabel: '',
            sexRadio: '男',
            sexSelect: ['男', '女'],
            dialog: false,
            userSetting: {
                name: '',
                sex: 1
            }
        }
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
        },
        clearLoginStatus() {
            storage.removeItem('airball_token');
            storage.removeItem('airball_time');
            this.$router.replace('user');
        },
        goback() {
            this.$router.go(-1);
        },
        openInputCard(type="name") {
            let label = {
                name: '请输入用户名',
                localtion: '请输入地址',
            }
            
            this.activeLabel = label[type];
            this.dialog = true;
        },
        saveSetting() {

        },
        closeCard() {
            this.dialog = false;
        }
    },
    
    computed: {
        ...mapState('appSetting/appSettingList', [
            'settingList'
        ])
    },
  }
</script>
<style lang="stylus" scoped>
.setting-list
    border-bottom 1px solid rgb(220, 220, 200);
    padding 0.5rem 1rem
</style>
