<template>
  <div class="home">
    <img class="home-logo" alt="stockUp logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-logo {
  width: 420px;
  max-width: 70vw;
  height: auto;
  display: block;
}
</style>
