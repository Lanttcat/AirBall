<template>
    <footer>
        <v-bottom-nav absolute :value="true" color="white">
            <div
                v-for="nav in btns"
                :key="nav.name"
                flat
                @click="handleClick(nav.name)"
                class="btn-nav"
                :class="{'btn-nav-center':nav.center}">
                <!-- <embed src="../static/icon/site.svg" style="display:block;width:1.7rem;height:1.7rem" /> -->
                <svg class="iconAli" aria-hidden="true">
                    <use class="iconAli" :xlink:href="nav.icon"></use>
                </svg>
                <!-- <span>{{ nav.text }}</span>                     -->
            </div>
        </v-bottom-nav>
    </footer>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'article-bottom-navigator',
    computed: {
        ...mapState('articleShell/articleBottom', [
            'btns'
        ])
    },
    methods: {
        handleClick: function (name) {
            let iconHandle = {
                zan: () => {
                    // this.$http()
                },
                returnBtn: () => {
                    this.$router.go(-1);
                },
                comment: () => {
                    this.$store.commit('articleShell/articleBottom/isCommentCard', true);
                },
                blank: () => {
                    return;
                }
            };
            let handleFun = iconHandle[name];
            handleFun();
        }
    }
}
</script>
<style lang="stylus" scoped>

.btn-nav
    display flex
    flex-direction column
    justify-content center
    width 20%
    text-align center
    embed
        margin 0 auto

.btn-nav-center
    min-width 40px
.iconAli
    display block
    height 1.7rem

</style>
