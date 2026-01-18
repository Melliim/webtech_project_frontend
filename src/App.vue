<template>
  <navbar></navbar>
  <router-view/>
</template>

<script>


import Navbar from "@/components/Navbar.vue";

export default ({
    name: 'App',
    components: { Navbar }
})
</script>

<style>
:root{
  /* palette */
  --bg-top: #B9A7FF;   /* sky purple */
  --bg-bottom: #A7DFFE;/* soft sky blue (keeps it airy) */

  --text: rgba(0, 0, 0, 0.85);     /* slate */
  --accent: #fb95ce;   /* purple accent */
  --card: #F6EFA6;     /* soft yellow cards */
}

html, body {
  margin: 0;
  min-height: 100%;
  /* subtle gradient instead of flat color */
  background: linear-gradient(180deg, var(--bg-top) 0%, var(--bg-bottom) 100%);
}

#app {
  min-height: 100vh; /* fixes white space below */
  background: transparent; /* lets the body gradient show through */
  color: var(--text);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

/* keep your nav styles but themed */
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: var(--text);
}

nav a.router-link-exact-active {
  color: var(--accent);
}


</style>
