<template>
    <v-container
            v-if="userInfo.status === 0"
            grid-list-md text-xs-center>
            <v-layout row class="card-item">
                <v-flex xs12>
                    <div style="text-align: left">
                        <div class="headline">欢迎来到AirBall</div>
                    </div>
                    <v-layout row>
                        <v-flex xs6 full-height>
                            <v-btn @click="toLogin" v-actmoni class="user-btn_login" color="amber accent-2" dark>登录/注册</v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-card-media
                                src="../static/img/testimg/1.JPG"
                                height="80px"
                                contain>
                            </v-card-media>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
</template>
<script>
export default {
    name: 'user-title'
}
</script>
<style lang="stylus" scoped>
    
</style>
