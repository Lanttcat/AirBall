<template>
    <v-snackbar
        :timeout="timeout"
        :top="y === 'top'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="message.msgSwitch">
        {{ message.msgText }}
        <v-btn flat color="pink" @click.native="snackbar = false">知道了~</v-btn>
    </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'msg-tip',
    data () {
        return {
            snackbar: false,
            y: 'top',
            x: null,
            mode: '',
            timeout: 3000
        }
    },
    methods: {
        ...mapMutations('global', {
            setMsgTip: 'setMsgTip'
        }),
    },
    computed: {
        ...mapState('global', [
            'message'
        ])
    }
}
</script>
<style lang="stylus" scoped>
    
</style>

