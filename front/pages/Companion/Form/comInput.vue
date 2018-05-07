<template>
    <v-form v-model="valid">
        <v-text-field
            label="标题"
            :rules="nameRules"
            :counter="10"
            required>
        </v-text-field>
        <v-layout row justify-center>
            <v-text-field
                label="时间"
                :rules="nameRules"
                required>
            </v-text-field>
            <v-dialog v-model="dialog" persistent fukk-width>
                <v-btn color="primary" dark slot="activator">选择时间</v-btn>
                <v-card>
                    <date-picker></date-picker>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="dialog = false">取消</v-btn>
                    <v-btn color="green darken-1" flat @click.native="dialog = false">确定</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <v-select
            :items="items"
            v-model="e1"
            label="Select"
            single-line
            bottom>
        </v-select>
        <v-text-field
            label="简介"
            v-model="email"
            :rules="emailRules"
            required>
        </v-text-field>
    </v-form>
</template>
<script>
import datePicker from '@/components/DatePicker.vue';
export default {
    data: () => ({
        dialog: false,
        e1: null,
        items: [
            { text: 'State 1' },
            { text: 'State 2' },
            { text: 'State 3' },
            { text: 'State 4' },
            { text: 'State 5' },
            { text: 'State 6' },
            { text: 'State 7' }
        ],
        valid: false,
        name: '',
        nameRules: [
            // v => !!v || 'Name is required',
            // v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
            // v => !!v || 'E-mail is required',
            // v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
    }),
    components: {
        'date-picker': datePicker
    }
}
</script>