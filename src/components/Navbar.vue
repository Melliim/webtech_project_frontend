<script>


export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Navbar'
}
</script>

<template>
    <nav class="navbar navbar-expand-lg app-navbar">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">stockUp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link class="nav-link" to = "/">Home</router-link>
                    <router-link class="nav-link" to = "/about">About</router-link>
                    <router-link class="nav-link" to = "/categories">Categories</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>

.app-navbar {
  background-color: #fbdbec; /* pinkish beige */
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 8px 18px rgba(79, 99, 111, 0.12);
}

.app-navbar .navbar-brand {
  color: var(--text);
  font-weight: 700;
}

.app-navbar .nav-link {
  color: rgb(189, 156, 244);
  font-weight: 600;
}

.app-navbar .nav-link.router-link-exact-active {
  color: var(--accent);
}

</style>