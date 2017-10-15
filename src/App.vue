<template>
  <div id="app">
    <img v-lazy=" 'https://www.baidu.com/img/bd_logo1.png' + 'error' " alt="">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { rem } from './assets/scripts/rem';

export default {
  name: 'app',
  beforeMount() {
    rem();
  },
};

</script>
<style lang="scss">
@import '~src/assets/styles/fonts.css';
@import '~src/assets/styles/_reset.scss';
@import '~src/assets/styles/_mixin.scss';
@import '~src/assets/styles/func.css';
[v-cloak] {
  display: none;
}

</style>
