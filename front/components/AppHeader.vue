<template>
    <transition
        name="slide-down">
        <header class="app-header-wrapper" v-show="isShowHeader">
            <div
                v-if="leftBtn.isShow"
                class="app-header-left">
                <div
                    v-if="leftBtn.isLogo"
                    @click="handleClick('logo')">
                    <slot
                        name="logo">
                        <img  :src="leftBtn.src" :alt="leftBtn.alt" class="app-header-logo">
                    </slot>
                </div>
                <v-btn
                    icon
                    v-else
                    @click.native="handleClick('back')">
                    <v-icon color="white" class="app-header-icon">{{ leftBtn.src }}</v-icon>
                </v-btn>
            </div>
            <div 
                v-if="isShowInputSearch"
                class="app-header-middle" v-cloak>
                <slot name="title">
                    <input @click.native="handleClick('action', {actionIdx, route: action.route})" class="app-header-search" placeholder="搜索球员或咨询等" type="text">
                </slot>
            </div>
            <div
                v-if="isShowBtnSearch"
                class="app-header-right">
                <slot name="actions">
                    <v-btn
                        icon="icon"
                        @click.native="handleClick('action')">
                        <v-icon color="light-green darken-4" class="app-header-icon">search</v-icon>
                    </v-btn>
                </slot>
            </div>
        </header>
    </transition>
</template>

<script>
import {mapState} from 'vuex';
import EventBus from '@/core/event-bus';

export default {
    name: 'appHeader',
    computed: {
        ...mapState('appShell/appHeader', [
            'isShowHeader',
            'leftBtn',
            'isShowInputSearch',
            'isShowBtnSearch',
            'logoIcon',
            'title',
            'actions'
        ]),
        ...mapState('appShell/common', [
            'isPageSwitching'
        ])
    },
    methods: {

        /**
         * 处理按钮点击事件
         *
         * @param {string} source 点击事件源名称 menu/logo/action
         * @param {Object} data 随点击事件附带的数据对象
         */
        handleClick(source, {actionIdx, route} = {}) {

            // 页面正在切换中，不允许操作，防止滑动效果进行中切换
            if (this.isPageSwitching) {
                return;
            }
            let eventData = {};

            // 点击右侧动作按钮，事件对象中附加序号
            if (source === 'action') {
                eventData.actionIdx = actionIdx;
            }

            // 发送给父组件，内部处理
            this.$emit(`click-${source}`, eventData);

            // 发送全局事件，便于非父子关系的路由组件监听
            EventBus.$emit(`app-header:click-${source}`, eventData);

            // 如果传递了路由对象，进入路由
            if (route) {
                this.$router.push(route);
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'
$btn-color = #fff

.app-header-wrapper
    display flex
    justify-content space-between
    align-items center
    height $app-header-height
    background transparent
    color $btn-color
    padding 0
    // box-shadow 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px rgba(0,0,0,.14), 0 1px 10px rgba(0,0,0,.12)
    transition transform 0.3s ease-out

    &.slide-down-enter,
    &.slide-down-leave-to
        transform translate(0, -100%)

    & > div
        display flex
        align-items center
        background transparent

    .app-header-middle
        flex 1
        font-size 1.2em
        .app-header-search
            padding 0.7rem 2rem
            border 1px solid #c0d36f;
            border-radius 2px
            height 2.5rem
            width 100%
            outline none
            color rgb(50, 50, 50)
            
        input::-webkit-input-placeholder 
            font-family "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    // 改变 icon 大小
    .app-header-logo
        margin 0 0.5rem
        color $btn-color
        width 40px

    .app-header-icon
        color $btn-color
        width 36px
        height 36px
        line-height 36px

</style>
