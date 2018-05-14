<template>
    <v-layout row wrap>
        <v-flex xs12>
            
            <v-card flat>
                <v-card-media
                    @click.native.stop="uploadImageDialog = true"
                    :src="homeBanner || 'http://p8p6o46oy.bkt.clouddn.com/default_banner.jpg'" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ userInfo.title }}</h3>
                        <h3 class="headline mb-0">朱萧默说</h3>
                        <div>
                            <span>Air值</span>
                            <span>{{ userInfo.repu | airValueFromat }}</span>
                        </div>
                        <div>
                            <span>我的主队</span>
                            <span>{{ userInfo.repu | airValueFromat }}</span>
                        </div>
                        <div>{{ userInfo.intro }}</div>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
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
// 文件上传组件
import VueFileUpload from 'vue-file-upload';
import { mapActions, mapState } from "vuex";
function setState(store) {
    store.dispatch("appShell/appHeader/setAppHeader", {
        isShowHeader: false
    });
    store.dispatch('global/setShellStyleControl', {
        header: 3,
        footer: 2
    });
}
export default {
    name: 'userHome',
    data() {
        return {
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
    // mounted(){
    // //设置formData数据
    //     this.$refs.vueFileUploader.setFormDataItem('authorization',"123");
    // },
    methods: {
        uploadItem(file){
            //单个文件上传
            let fileItem = file[0];
            this.$http.get("/api/qiniuToken", {}).then(({data}) => {
                console.log(data);
                this.reqopts.formData.key = `${this.userInfo.aid}_user_home`;
                this.reqopts.formData.token = data.data;
                this.reqopts.formData.file = fileItem;
                fileItem.upload();
            }).catch(() => {
                this.$router.push('error');
            });
        },
        onAddItem(file){
            this.file = file;
        },
    },
    computed: {
        ...mapState('userStatus/userStatu', [
            'userInfo'
        ]),
        homeBanner() {
            return `http://p8p6o46oy.bkt.clouddn.com/${this.userInfo.aid}_user_home`;
        }
    },
    filters: {
        airValueFromat(value) {
            return parseInt(value);
        }
    },
    components:{
        VueFileUpload
    }
}
</script>
<style lang="stylus" scoped>

.comment-text
    padding auto 16px

#app
    .subheader
        border-left solid red 5px
        height 2.5rem
    .btn
        margin 0
        min-width: 40px;
        .btn__content
            padding 0

    .comment-input
        padding 8px

        .input-group__input
            border 1px solid red
</style>
