<template>
  <h1>Module 2</h1>
  <img alt="Vue logo" src="./assets/logo.png" width="50"/>
  <PersonDetail />
</template>

<script>
import PersonDetail from './components/PersonDetail.vue';

export default {
  name: "App",
  components: {
    PersonDetail,
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
  margin-top: 60px;
}
</style>
