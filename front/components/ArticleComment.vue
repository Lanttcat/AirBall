<template>
    <v-dialog
        v-model="commentSwitch"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable>
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-btn icon @click="closeCard" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>评论</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click="publish">发布</v-btn>
                </v-toolbar-items>
                <v-menu bottom right offset-y>
                    <v-btn slot="activator" dark icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile v-for="(item, i) in items" :key="i" @click="closeCard">
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar>
            <v-layout class="comment-input">
                <v-flex xs12 align-center='false'>
                    <v-text-field
                        box
                        auto-grow
                        rows='3'
                        name="commentContent"
                        label="填写评论信息"
                        textarea
                        v-model="content"
                        counter='11'
                    ></v-text-field>
                    <div>
                        <img-input
                            v-model="imgFile"
                            placeholder="点击上传图片"
                            :maxSize="maxSize"
                            :noMask="false"
                            size="small">
                        </img-input>

                        <div style="clear:both"></div>
                    </div>
                    <div>
                        <span>规范协议</span>
                    </div>
                    
                </v-flex>
            </v-layout>
          <!-- <div style="flex: 1 1 auto;"></div> -->
        </v-card>
      </v-dialog>
</template>
<script>
import VueImgInputer from 'vue-img-inputer'
import imgUpload from '@/components/ImgUpload'
import { mapState } from 'vuex';
export default {
    name: 'article-comment',
    data() {
        return {
            imgFile: '',
            commentSwitch: true,
            content: '',
            maxSize: 1000,
            items: [
                {
                    title: 'dddddd'
                },
                {
                    title: 'dddddd'
                },
                {
                    title: 'dddddd'
                }
            ]
        }
    },
    components: {
        'img-upload': imgUpload,
        'img-input': VueImgInputer
    },
    computed: {
        ...mapState('articleShell/articleBottom', [
            'commentCard'
        ])
    },
    methods: {
        closeCard: function() {
            this.$store.commit('articleShell/articleBottom/isCommentCard', false);
        },
        publish: () => {
            // 验证信息
        }
    }
}
</script>
<style lang="stylus" scoped>
    .comment-input
        padding 16px
    
    .img-inputer--small
        float left
        width 100px
        height 100px

</style>

