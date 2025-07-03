<template>
  <div class="unauthorized-page">
    <h1>🚫 Unauthorized</h1>
    <p>You don’t have permission to access this page.</p>
    <router-link to="/home">Back to Home</router-link>
  </div>
</template>

<script setup>
// no logic needed
</script>

<style scoped>
.unauthorized-page {
  text-align: center;
  margin-top: 50px;
}
</style>
