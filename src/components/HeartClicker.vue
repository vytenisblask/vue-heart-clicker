<template>
  <div class="container">
    <ToggleFavorite 
      @clicked="toggleHeart" 
      :favorited="isClicked"
    />
    <div class="heart-counter" v-if="isClicked">
      + {{ clickedCount }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ToggleFavorite from './ToggleFavorite.vue';

export default {
  components: {
    ToggleFavorite
  },
  data() {
    return {
      isClicked: false,
      clickedCount: 0
    };
  },
  async created() {
    // Fetch the clicked state from localStorage
    this.isClicked = localStorage.getItem('isClicked') === 'true';
    
    try {
      const response = await axios.get('https://www.krapikas.lt/api/clicks');
      this.clickedCount = response.data.count;
    } catch (error) {
      console.error("Failed to fetch click count:", error);
    }
  },
  methods: {
    async toggleHeart() {
      this.isClicked = !this.isClicked;
      const action = this.isClicked ? 'increment' : 'decrement';
      try {
        const response = await axios.post(`https://www.krapikas.lt/api/clicks/${action}`);
        this.clickedCount = response.data.count;
      } catch (error) {
        console.error("Failed to update click count:", error);
      }
      // Save the state to localStorage
      localStorage.setItem('isClicked', this.isClicked);
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0;
  position: relative;
  height: 100vh;
  background: #FBF9FC;
  background-image: url("~@/assets/krapiko_usai_nb.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.heart-counter {
  font-family: 'Montserrat', sans-serif;
  font-family: 'Roboto', sans-serif;
  position: absolute;
  top: 1.6rem;
  left: 4rem;
  font-size: 20px;
  color: rgb(18, 16, 16);
}
</style>
