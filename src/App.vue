<template>
  <div id="app">
    <Analytics />
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
/* Resetting default margin and padding */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* This will prevent scrolling */
}

/* Ensuring root app div takes full height */
#app {
  height: 100%;
}

</style>