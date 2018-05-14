<template>
    <v-layout row wrap>
        <v-flex xs12>
            
            <v-card flat>
                <v-card-media
                    @click.native.stop="uploadImageDialog = true"
                    :src="userInfo.imgSrc || '../../static/img/testimg/default.jpg'" height="200px">
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
                    <input type="file">
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">取消</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">上传</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
   </v-layout>
</template>
<script>
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
            uploadImageDialog: false
        }
    },
    methods: {

    },
    computed: {
        ...mapState('userStatus/userStatu', [
            'userInfo'
        ])
    },
    filters: {
        airValueFromat(value) {
            return parseInt(value);
        }
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
