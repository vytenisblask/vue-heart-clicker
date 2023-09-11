<template>
  <div class="container">
    <div 
      class="heart" 
      :class="{ 'clicked': isClicked }" 
      @click="toggleHeart">
    </div>
    <div class="heart-counter" v-if="clickedCount">
      + {{ clickedCount }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
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
.heart {
  position: absolute;
  bottom: 1rem;
  right: 4rem;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-size: contain;
}

/* Initial state - outline heart */
.heart::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("~@/assets/np_heart_outline.svg") no-repeat center;
  background-size: contain;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

/* Clicked state - full red heart */
.heart::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("~@/assets/np_heart_red.svg") no-repeat center;
  background-size: contain;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* When heart is clicked, toggle opacity */
.heart.clicked::before {
  opacity: 0;
}

.heart.clicked::after {
  opacity: 1;
}

.heart-counter {
  font-family: 'Montserrat', sans-serif;
  font-family: 'Roboto', sans-serif;
  position: absolute;
  bottom: 1.6rem;
  right: 1rem;
  font-size: 20px;
  color: rgb(18, 16, 16);
}
</style>
