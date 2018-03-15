<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-toolbar style="height:8vh" flat>
                        <v-icon  class="app-header-icon">arrow_back</v-icon>
                        <v-toolbar-title>写攻略</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon  class="app-header-icon">send</v-icon>
                    </v-toolbar>
                    <v-container style="height:85vh" fluid class="pa-0 edit-container">
                     
                            <v-flex xs12>
                                <v-divider></v-divider>
                                <v-text-field
                                label="输入标题"
                                single-line
                                full-width
                                hide-details
                                style="height:9vh"
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
                                    style="height:72vh">
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
// 状态栏设置
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        isShowHeader: false
    });
}

var toolbarOptions = [
    ["bold", "strike", "image"], // toggled buttons
    ["blockquote"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }]
];

export default {
    data() {
        return {
        content: "<p></p>",
        editorOption: {
            modules: {
            toolbar: toolbarOptions
            }
        }
        };
    },
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    mounted() {
        console.log("this is current quill instance object", this.myQuillEditor);
    },
    methods: {
        onEditorBlur(editor) {
        console.log("editor blur!", editor);
        },
        onEditorFocus(editor) {
        console.log("editor focus!", editor);
        },
        onEditorReady(editor) {
        console.log("editor ready!", editor);
        }
    },
    components: {
        "quill-editor": quillEditor
    }
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

        .ql-editor
            height  65vh
</style>

