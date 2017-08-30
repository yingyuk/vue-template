<template>
  <article id="home">
    <h1>home</h1>
    <router-link :to="{name: 'detail'}">to detail</router-link>
    <div contenteditable="true" @input="inputHandler" v-text="userInput"></div>
    <input v-model="userInput" type="text">
  </article>
</template>
<script>
// import MessageBox from 'mint-ui/lib/message-box'
// import 'mint-ui/lib/message-box/style.css'

export default {
  name: 'home',
  data() {
    return {
      userInput: 'test',
    };
  },
  methods: {
    inputHandler(e) {
      this.userInput = e.target.innerText;
    },
  },
  mounted() {
    // this.fetch({
    //   method: 'GET',
    //   url: '/search/repositories?q=javascript&sort=stars',
    // });
  },
};

</script>
<style lang="scss" scoped>
/*@import '../../assets/styles/mixin.scss';*/
p {
  outline: none;
}

</style>
