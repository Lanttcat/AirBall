<template>
  <div>
        <sub-header :subHeaderData=publishHeaderData></sub-header>
        <v-tabs
            v-model="active"
            color="white"
            fixed-tabs
            slider-color="yellow">
            <v-tab
                v-for="item in navs"
                :key="item"
                ripple>
                {{ item }}
            </v-tab>
            <v-tab-item
                v-for="n in 3"
                :key="n">
                <v-card flat>
                    <v-card-text>
                        <com-input></com-input>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>

    <div class="text-xs-center mt-3">
      <v-btn @click.native="next">提交</v-btn>
    </div>
  </div>
</template>
<script>
import subHeader from '@/components/SubHeader';
import comInput from '../Form/comInput';
export default {
    name: 'useComPublish',
    data () {
        return {
          publishHeaderData: {
            leftIcon: 'arrow_back',
            title: '陪玩发布'
          },
          active: null,
          navs: ['结伴出行', '志愿者关爱', '滴滴同行'],
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    },
    components: {
        'sub-header': subHeader,
        'com-input': comInput
    },
    methods: {
        next () {
            const active = parseInt(this.active)
            this.active = (active < 2 ? active + 1 : 0).toString()
        }
    }

}
</script>
<style lang="stylus" scoped>

</style>

