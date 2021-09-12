<template>
  <div class="title-container">
    <img alt="Vue logo" src="./assets/logo.png" height="50" />
    <h1>Module 2</h1>
  </div>

  <button class="nav-button" @click="first">FIRST</button>
  <button class="nav-button" @click="prev">PREVIOUS</button>
  <button class="nav-button" @click="next">NEXT</button>
  <button class="nav-button" @click="last">LAST</button>

  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    first() {
      this.gotoPersonDetail(1);
    },
    last() {
      this.gotoPersonDetail(1000);
    },
    prev() {
      let id = parseInt(this.$route.params.id);
      if (id > 1) {
        this.gotoPersonDetail(id - 1);
      }
    },
    next() {
      let id = parseInt(this.$route.params.id);
      if (id < 1000) {
        this.gotoPersonDetail(id + 1);
      }
    },
    gotoPersonDetail(id) {
      this.$router.push({ path: `/persondetail/${id}` });
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

.nav-button {
  margin: 10px;
  padding: 10px 30px;
}
</style>
