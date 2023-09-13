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
import { createClient } from '@supabase/supabase-js';
import ToggleFavorite from './ToggleFavorite.vue';

// Initialize Supabase client
// const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY;
const supabaseUrl = 'https://hiylrjnimvzspaxlltza.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpeWxyam5pbXZ6c3BheGxsdHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ1MzA0ODMsImV4cCI6MjAxMDEwNjQ4M30.AoTMzD82fTAVXcsrxdJudCQLCrrBgOxXq1bcNP-W4ss';

const supabase = createClient(supabaseUrl, supabaseAnonKey);


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
  this.isClicked = localStorage.getItem('isClicked') === 'true';
  console.log("Initial isClicked from localStorage:", this.isClicked);
  try {
    const { data, error } = await supabase.from('clicks').select('*').eq('id', 1); // Using .eq('id', 1) to fetch the specific row by ID
    console.log("isClicked after fetching from Supabase:", this.isClicked);
    if (error) throw error;
    if (data && data.length > 0) {
        this.clickedCount = data[0].count;
    }
  } catch (error) {
    console.error("Failed to fetch click count:", error);
  }
},

methods: {
      async toggleHeart() {
      this.isClicked = !this.isClicked;
      console.log("Previous isClicked:", this.isClicked, "New isClicked:", !this.isClicked);
      try {
        const newCount = this.isClicked ? this.clickedCount + 1 : this.clickedCount - 1;
        await supabase.from('clicks').update({ count: newCount }).eq('id', 1);  // Using .eq('id', 1) to target the specific row
        
        const { data, error } = await supabase.from('clicks').select('*').eq('id', 1);  // Using .eq('id', 1) to fetch the specific row
        if (error) throw error;
        if (data && data.length > 0) {
            this.clickedCount = data[0].count;
        }
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
