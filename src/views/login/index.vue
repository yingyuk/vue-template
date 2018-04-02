<template>
  <form @keyup.enter="submit" class="login">
    <input type="text" v-model="formData.username">
    <input type="password" v-model="formData.password">
    <a @click="submit" href="javascript:;" type="submit">登录</a>
  </form>
</template>
<script>
import { setUser } from 'src/assets/scripts/local-storage.js';

const isDev = process.env.NODE_ENV === 'development';

export default {
  name: 'login',
  data() {
    return {
      show: false,
      to: undefined,
      formData: {
        username: isDev ? 'username' : '',
        password: isDev ? 'password' : '',
      },
    };
  },
  methods: {
    async submit() {
      const { data } = await this.$http({
        method: 'POST',
        url: '/api/authorization',
        data: this.formData,
      });
      setUser(data);
      this.$store.commit('setUserToken', data.token);
      this.$router.replace({ name: 'proposalList' });
    },
    loginSuccess() {
      const { to } = this.$route.params;
      if (to) {
        const { name, params, query, hash } = to;
        this.$router.replace({ name, params, query, hash });
        return;
      }
      this.$router.replace({ name: 'home' });
    },
    wechatLogin() {
      // 微信登录逻辑
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>

</style>

