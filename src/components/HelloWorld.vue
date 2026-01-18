<template>
  <div class="home">
    <img class="home-logo" alt="stockUp logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}

.home-logo {
  width: 220px;     /* adjust size */
  height: auto;
}
</style>
