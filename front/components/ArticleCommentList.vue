<template>
    <v-list two-line>
        <template v-for="item in list">
            <!-- <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider> -->
            <v-list-tile avatar :key="item.title">
                <v-list-tile-avatar>
                <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>

        </template>
    </v-list>
</template>
<script>
export default {
    name: 'comments-list',
    props: ['list']
}
</script>
<style lang="stylus" scoped>

</style>
