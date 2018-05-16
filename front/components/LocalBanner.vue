<template>
    <div class="local-banner">
        <!-- 济南banner组件 -->
        <header>
            <div class="header-left">
                <h4>中国</h4>
                <h1>济南</h1>
                <h6>
                    122万张照片
                </h6>
            </div>
            <div class="header-right">
                天气
            </div>
        </header>
        <p style="width: 80%; margin:0 auto;border-top:1px solid rgb(230, 230, 230"></p>
        <div class="local-hot">
            <p>有2222人在分享</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'localBanner'  
}
</script>
<style lang="stylus" scoped>
@require '~@/assets/stylus/variable'
.local-banner
    position relative
    padding-top 52px
    height 13rem
    // background $theme
    background-image  url('../static/img/testimg/1.jpg')
    background-size cover
    color white

    header 
        display flex
        justify-content flex-start
        padding 0.5rem 1rem

        .header-left
            width 20rem
            text-align left 

            h1
                margin 0.5rem auto
            h4, h6
                font-family '微软雅黑'
                font-weight normal
        .header-right
            width 4rem
            text-align right 
    .local-hot
        padding 0.2rem 1rem
        text-align left 
</style>
