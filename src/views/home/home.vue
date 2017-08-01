<template>
  <article id="home">
    home
  </article>
</template>
<script>
// import MessageBox from 'mint-ui/lib/message-box'
// import 'mint-ui/lib/message-box/style.css'

export default {
  name: 'home',
  mounted() {
    this.fetch({
      url: '/api',
    });
  },
};
</script>
<style lang="scss">
/*@import '../../assets/styles/mixin.scss';*/
</style>
