<template>
  <article id="home">
    <router-link :to="{name: 'log'}">前往 log 页面</router-link>
    <div class="javascript-list">
      <h3>javascript github star 排行榜</h3>
      <div v-for="(item, index) in list" :key="index">
        <span>{{item.name}}</span>
        <span> star: {{item.stargazers_count}}</span>
      </div>
    </div>
  </article>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'home',
  title() {
    // 调用的时候绑定了 this
    return '这是首页';
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      list: state => state.home.list,
    }),
  },
  asyncData({ store }) {
    return store.dispatch('home/fetchList', { isFirstFetch: true });
  },
  methods: {},
  mounted() {},
  components: {},
};
</script>
<style lang="scss" scoped>
@import '~src/assets/styles/_mixin.scss';

#home {
  display: flex;
  align-items: center;
  justify-content: center;

  @include clearfix;
  .javascript-list {
    @include hairline('top');
  }
}
</style>
