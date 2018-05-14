<template>
    <div>
        <p>{{ message }}</p>
    </div>
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
    }
};
</script>
