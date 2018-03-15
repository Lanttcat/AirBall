<template>
  <v-layout row>
    <v-flex xs3>
        <v-avatar
            size="60px"
            slot="activator">
            <img
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                alt="">
        </v-avatar>
    </v-flex>
    <v-flex xs9 class="palyer-info">
        <p><strong>{{ titles.name }}</strong></p>
        <p>
            <span class="grey--text">位置：{{ titles.position_name }}</span>
            <span class="grey--text">身高：{{ titles.height }}</span>
            <span class="grey--text">体重：{{ titles.weight }}</span>
        </p>
        <p>
            <span class="grey--text">国籍：{{ titles.country }}</span>
        </p>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
    name: 'player-title',
    props: ['titles']
}
</script>
<style lang="stylus" scoped>
.palyer-info
    justify-content flex-start
    p
        margin-bottom 6px
        text-align left 
</style>
