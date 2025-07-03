<template>
  <div class="home">
    <h1>Home Page</h1>
    <p>Welcome {{ username }}!</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
</script>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}
</style>
