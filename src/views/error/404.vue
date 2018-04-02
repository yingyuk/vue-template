<template>
  <div class="not-found">
    <h5>404 页面不存在</h5>
    <router-link class="go-home" :to="{name: 'home'}">前往首页</router-link>
  </div>
</template>
<script>
export default {
  name: 'error404',
};
</script>
<style lang="scss" scoped>
.not-found {
  padding: 0.2rem;
}
.go-home {
  display: block;
  margin-top: 0.2rem;
  color: #007bff;
}
</style>

