<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import rem from 'src/assets/scripts/rem';
import jsBridge from 'src/assets/scripts/jsBridge';

export default {
  name: 'app',
  beforeMount() {
    rem();
  },
  beforeCreate() {
    jsBridge();
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
