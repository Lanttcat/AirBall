<template>
    <v-layout row>
        <v-flex xs12>
            <v-card>
                <sub-header :subHeaderData=albumsHeaderData></sub-header>
                <v-subheader>三月</v-subheader>
                <v-container fluid grid-list-sm>
                <v-layout row wrap>
                    <v-flex xs4 v-for="i in 5" :key="i">
                    <img class="image" :src="`http://p8rjvg2mz.bkt.clouddn.com/${i}`" alt="lorem" width="100%" height="100%">
                    </v-flex>
                </v-layout>
                </v-container>
                <v-subheader>四月</v-subheader>
                <v-container fluid grid-list-sm>
                <v-layout row wrap>
                    <v-flex xs4 v-for="i in 5" :key="i">
                    <img class="image" :src="`http://p8rjvg2mz.bkt.clouddn.com/${i + 5}`" alt="lorem" width="100%" height="100%">
                    </v-flex>
                </v-layout>
                </v-container>
                <v-footer class="mt-5"></v-footer>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import subHeader from '@/components/SubHeader';
export default {
    name: 'albums',
    data() {
        return {
            albumsHeaderData: {
                leftIcon: 'arrow_back',
                title: '图集'
            }
        }
    },
    components: {
        'sub-header': subHeader
    }
}
</script>

<style lang="stylus" scoped>

</style>
