<template>
  <article id="home">
    home
    <input type="text">
    <div contenteditable="true" @input="inputHandler" v-text="userInput"></div>
  </article>
</template>
<script>
// import MessageBox from 'mint-ui/lib/message-box'
// import 'mint-ui/lib/message-box/style.css'

export default {
  name: 'home',
  data() {
    return {
      userInput: '123',
    };
  },
  methods: {
    inputHandler(e) {
      this.userInput = e.target.innerText;
    },
  },
  mounted() {
    this.fetch({
      method: 'POST',
      url: '/api/test',
    });
  },
};

</script>
<style lang="scss">
/*@import '../../assets/styles/mixin.scss';*/

p {
  outline: none;
}

</style>
