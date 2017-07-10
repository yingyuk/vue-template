<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import {
  rem
} from './assets/scripts/rem';

export default {
  name: 'app',
  beforeMount() {
    rem();
  },
};
</script>
<style lang="scss">
@import './assets/styles/fonts.css';
@import './assets/styles/reset.scss';
@import './assets/styles/mixin.scss';
@import './assets/styles/func.css';
[v-cloak] {
  display: none;
}
</style>
