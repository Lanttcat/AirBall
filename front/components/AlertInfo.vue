<template>
    <div>
        <!-- <div class="text-xs-center">
            <v-btn color="primary" @click="alert = !alert">Toggle</v-btn>
        </div> -->
        <v-alert
            color ='red'
            dismissible
            :value="alertData.isAlert"
            transition="scale-transition">
            {{ alertData.text }}
        </v-alert>
    </div>
</template>
<script>
export default {
   name: 'alert-info',
   props: ['alertData']
}
</script>
