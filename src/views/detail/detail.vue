<template>
  <article id="detail">
    <h1>detail</h1>
    <router-link :to="{name: 'home'}">to home</router-link>
  </article>
</template>
<script>
export default {
  name: 'detail',
  asyncData({ route, store }) {
    return Promise.resolve();
  },
  title() {
    return '这是详情页';
  },
};
</script>
<style lang="scss" scoped>

</style>
