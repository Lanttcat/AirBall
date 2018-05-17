<template>
  <v-jumbotron color="grey lighten-2">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">你好像遇到了一些问题</h3>
          <span class="subheading">目前网站正在处于开发阶段，如有问题，敬请谅解~</span>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">联系邮箱：lanyixing@live.com</div>
          <v-btn large @click="toRoot" color="primary" class="mx-0">回到首页</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
export default {
    name: 'error',
    computed: {
        message() {
            return this.$route.params.error || '网络连接出现了问题~请检查网络设置(╥﹏╥)o';
        }
    },
    created() {
        let query = this.$route.query;
        if (Object.keys(query).length !== 0) {
            this.$router.replace({
                name: 'error',
                params: query
            });
        }
    },
    methods: {
        toRoot() {
            this.$router.replace('/');
        }
    }
};
</script>
