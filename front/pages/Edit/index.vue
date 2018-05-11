<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-toolbar style="height:4rem" flat>
                        <v-icon  class="app-header-icon" @click="back">arrow_back</v-icon>
                        <v-toolbar-title>写文章</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <span class="add-btn" @click="review">预览</span>
                        <span class="add-btn">保存</span>
                        <v-bottom-sheet v-model="sheet">
                            <v-btn slot="activator" color="purple" dark>发布</v-btn>
                            <v-list>
                                <v-subheader>至少添加两个标签</v-subheader>
                                <div>
                                    <v-chip v-for="item in tags" :key="item.id" @click="removeTag(item)" close>
                                        {{ item }}
                                    </v-chip>
                                </div>
                                
                                <div>
                                    <input type="text" class="tag-input" v-model="inputTag">
                                    <v-btn depressed small @click="addTag">添加</v-btn>
                                </div>
                                <v-btn color="purple" dark @click="publish">发布</v-btn>
                            </v-list>
                        </v-bottom-sheet>
                        <!-- <span class="add-btn" @click="publish">发布</span> -->
                    </v-toolbar>
                    <v-container style="height:92vh" fluid class="pa-0 edit-container">
                     
                            <v-flex xs12>
                                <v-divider></v-divider>
                                <v-text-field
                                label="输入标题"
                                v-model="title"
                                single-line
                                full-width
                                hide-details
                                style="height:4rem"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <quill-editor ref="myTextEditor"
                                    v-model="content"
                                    :options="editorOption"
                                    class="edit-wrap"
                                    @blur="onEditorBlur($event)"
                                    @focus="onEditorFocus($event)"
                                    @ready="onEditorReady($event)"
                                    style="height:75vh">
                                </quill-editor>
                            </v-flex>
                  
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import { mapState, mapMutations } from 'vuex' ;

var toolbarOptions = [
    ["bold", "strike", "image"], // toggled buttons
    ["blockquote"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }]
];

export default {
    name: 'edit',
    data() {
        return {
            title: '',
            tags: [],
            sheet: false,
            inputTag: '',
            content: "<p></p>",
            editorOption: {
                modules: {
                    toolbar: toolbarOptions
                }
            }
        };
    },
    computed: {
        ...mapState('userStatus/userStatu', [
            'userInfo'
        ])
    },
    methods: {
        ...mapMutations('global', [
            'setMsgTip',
            'shellStyle'
        ]),
        onEditorBlur(editor) {
            // console.log("editor blur!",  this.content);
        },
        onEditorFocus(editor) {
            // console.log("editor focus!", this.content);
        },
        onEditorReady(editor) {
        // console.log("editor ready!");
        },
        review() {
            console.log(this.$router)
            // 文章预览
            this.$router.push({
                name: 'editReview',
                params: {
                    title: 'ces',
                    content: this.content
                }
            });
        },
        publish() {
            this.$http.post("/api/article", {
                title: this.title,
                content: this.content,
                tags: this.tags,
                authorId: this.userInfo.aid
            }).then(({data}) => {
                    let info = data.data;
                    if (info.status) {
                        this.setMsgTip({msgSwitch: true, msgText: '发布成功！'});
                        // 切换到登录界
                    }
                    else {
                        this.setMsgTip({msgSwitch: true, msgText: '发布失败，请稍后再试'});
                    }
                    // 将数据同步到store
                },
                (err) => {
                    this.setMsgTip({msgSwitch: true, msgText: '发布失败，请稍后再试'});
                }
            );
        },
        addTag() {
            if (this.inputTag.length <= 1) {
                return;
            }
            this.tags.push(this.inputTag);
            this.inputTag = '';
        },
        removeTag(item) {
            let set = new Set(this.tags);
            set.delete(item);
            this.tags = Array.from(set);
        },
        back() {
            this.$router.go(-1);
        }
    },
    components: {
        "quill-editor": quillEditor
    },
    async asyncData({ route }) {
        // 获取文章草稿
        console.log(route);
    },
};
</script>
<style lang="stylus" scoped>
@require '~@/assets/stylus/variable';

$btn-color = #fff;

#app
    .app-view-with-header 
        top 0

.container
    padding 0

.app-header-icon 
    margin: auto 0
    color: $colorFont
    width: 36px
    height: 36px
    line-height: 36px
.edit-container
    position sticky


</style>
<style lang="stylus">
    .quill-editor 
        .ql-container
            border none!important
        .ql-toolbar
            border-left none 
            border-right none
</style>
<style lang="stylus" scoped>
    #app
        .add-btn
            display inline-block
            padding 6px

            &:last-child
                font-size 1.1rem

        .tag-input
            display inline-block
            padding 2px 10px
            line-height 2rem
            outline none 
            border solid 1px rgb(230, 230 230)
            border-radius 4px
</style>


