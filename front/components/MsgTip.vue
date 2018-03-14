<template>
    <v-snackbar
        :timeout="timeout"
        :top="y === 'top'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="snackbar">
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
            setMsgTip: 'SETMSGTIP'
        }),
    },
    watch: {
        msgSwitch() {
            this.snackbar = this.message.msgSwitch;
            setTimeout(() => {
                this.setMsgTip({msgSwitch: false, msgText: ''});
            }, this.timeout);
        }
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

