<template>
  <div id="app">
    <HeartClicker />
  </div>
</template>

<script>
import HeartClicker from './components/HeartClicker.vue'

export default {
  components: {
    HeartClicker
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
}

</style>