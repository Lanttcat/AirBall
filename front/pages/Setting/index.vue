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
                        <v-list-tile-content @click="openUploadImageDialog">
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
                            <v-list-tile-sub-title>{{userInfo.name}}</v-list-tile-sub-title>
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
                        <v-list-tile-content  @click="openInputCard('site')">
                            <v-list-tile-title>所在地</v-list-tile-title>
                        </v-list-tile-content>
                        <v-spacer></v-spacer>
                        <v-list-tile-content>
                            <v-list-tile-sub-title>{{userInfo.site || '暂无'}}</v-list-tile-sub-title>
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
                            v-model="content"
                            counter='20'
                        ></v-text-field>
                        <div>
                            <v-btn depressed large color="error" @click="saveSetting">保存</v-btn>
                            <br>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-bottom-sheet>
        <v-dialog v-model="uploadImageDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    上传背景图
                </v-card-title>
                <v-card-text>
                    <!-- <input type="file"> -->
                    <vue-file-upload
                        ref="vueFileUploader"
                        :filters='filters'
                        url='http://upload.qiniup.com'
                        :events='cbEvents'
                        :request-options='reqopts'
                        v-on:onAdd = "onAddItem">
                        <span slot="label">上传文件</span>
                    </vue-file-upload>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="uploadImageDialog = false">取消</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click="uploadItem(file)">上传</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
import VueFileUpload from 'vue-file-upload';
import { mapState, mapActions} from 'vuex';
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
            inputType: '',
            activeLabel: '',
            sexRadio: '男',
            sexSelect: ['男', '女'],
            dialog: false,
            userSetting: {
                name: '',
                sex: 1
            },
            content: '',
            
            file: null,
            uploadImageDialog: false,
            imgUploadUrl: 'www',
            filters: [
                {
                    name: 'imageType',
                    fn(file){
                        var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                }
            ],
            //回调函数绑定
            cbEvents:{
                onCompleteUpload: (file,response,status,header)=>{
                    this.userInfo.imgSrc = 'http://p8p6o46oy.bkt.clouddn.com/' + response.key;
                    this.uploadImageDialog = false;
                }
            },
            //xhr请求附带参数
            reqopts:{
                formData:{
                    action: 'http://upload.qiniup.com',
                    key: '',
                    token: '',
                    file: ''
                }
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
        ...mapActions('userStatus/userStatu', [
            'setUserInfo'
        ]),
        openUploadImageDialog() {
            this.uploadImageDialog = true;
        },
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
        async saveSetting() {
            let res = await this.$http.get('/api/setting',{
                params: {
                    type: this.inputType,
                    value: this.content
                }
            });
            console.log(res);
            if (res.data) {
                this.userInfo[this.inputType] = this.content;
                console.log(this.userInfo)
                this.setUserInfo(this.userInfo);
                this.dialog = false;
                this.content = '';
            }
        },
        goback() {
            this.$router.go(-1);
        },
        openInputCard(type="name") {
            let label = {
                name: '请输入用户名',
                localtion: '请输入地址',
            }

            this.inputType = type;
            
            this.activeLabel = label[type];
            this.dialog = true;
        },
        closeCard() {
            this.dialog = false;
        },
        uploadItem(file){
            //单个文件上传
            let fileItem = file[0];
            this.$http.get("/api/qiniuToken", {}).then(({data}) => {
                console.log(data);
                this.reqopts.formData.key = `${this.userInfo.aid}_user_avatar`;
                this.reqopts.formData.token = data.data;
                this.reqopts.formData.file = fileItem;
                fileItem.upload();
            }).catch(() => {
                this.$router.push('error');
            });
        },
        onAddItem(file){
            this.file = file;
        }
    },
    
    computed: {
        ...mapState('appSetting/appSettingList', [
            'settingList'
        ]),
        ...mapState('userStatus/userStatu', [
            'userInfo'
        ])
    },
    components:{
        VueFileUpload
    }
  }
</script>
<style lang="stylus" scoped>
.setting-list
    border-bottom 1px solid rgb(220, 220, 200);
    padding 0.5rem 1rem
</style>
