<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Select from './components/Select/Select.vue';
function convert (item){
  return item+'!!!'
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld 
    msg="Hello Vue 3 + Vite"
    v-bind:search="false"
  />
  <Suspense>
  <Select
    :items="['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20',
    '21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40']"
    :multiple="true"
    :search="true"
    :display="convert"
    :title="'Choose you action'"
    :maxItems="20"
    :dark="false"
  >
  </Select>
  </Suspense>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
