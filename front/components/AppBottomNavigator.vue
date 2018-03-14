<template>
    <footer>
        <slot name="nav">
            <v-bottom-nav absolute :value="true" color="white">
                <div
                    v-for="nav in navs"
                    :key="nav.name"
                    :value="nav.avtive"
                    flat
                    @click="handleNavClick(nav.route, nav.name)"
                    class="btn-nav"
                    :class="{'btn-nav-center':nav.center}">
                    <!-- <embed src="../static/icon/site.svg" style="display:block;width:1.7rem;height:1.7rem" /> -->
                    <svg class="iconAli" aria-hidden="true">
                        <use class="iconAli" :xlink:href="nav.icon"></use>
                    </svg>
                    <span>{{ nav.text }}</span>                    
                </div>
            </v-bottom-nav>
        </slot>
    </footer>
</template>
<script>
import {mapState} from 'vuex';
import EventBus from '@/core/event-bus';;
export default {
    name: 'app-bottom-navigator',
    computed: {
        ...mapState('appShell/appBottomNav', [
            'show',
            'navs'
        ])
    },
    methods: {

        /**
         * 处理底部导航栏的点击行为，跳转到新页面
         *
         * @param {Object} route route
         * @param {string} name 触发的底部导航栏的 name
         */
        handleNavClick(route, name) {
            let eventData = {name};

            // 发送给父组件，内部处理
            this.$emit('click-nav', eventData);

            // 发送全局事件，便于非父子关系的路由组件监听
            EventBus.$emit('app-bottom-navigator:click-nav', eventData);
            if (route) {
                this.$router.replace(route);
            }
        }

    }
}
</script>
<style lang="stylus" scoped>
@import '~@/assets/stylus/variable'
.btn-nav
    display flex
    flex-direction column
    justify-content center
    width 20%
    text-align center
    embed
        margin 0 auto

.btn-nav-center
    // margin-top 8px
    // width 40px
    // height 40px
    min-width 40px
    // border 1px solid rgb(240, 240, 240)
    // border-radius 100%
//     svg
//         position relative
//         top -8px
.iconAli
    display block
    height 1.7rem

</style>
