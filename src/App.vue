<template>
  <div class="title-container">
    <img alt="Vue logo" src="./assets/logo.png" height="50" />
    <h1>Module 2</h1>
  </div>

  <router-link to="/persondetail/1">Person Detail 1</router-link>
  <button @click="prev">PREVIOUS</button>
  <button @click="next">NEXT</button>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      id: 1,
    };
  },
  components: {},
  methods: {
    prev() {
      console.log("prev");
      if (this.id > 1) {
        this.id--;
        // console.log(this.id);
        this.$router.push({ path: `/persondetail/${this.id}` });
      }
    },
    next() {
      console.log("next");
      this.id++;
      // console.log(this.id);
      this.$router.push({ path: `/persondetail/${this.id}` });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
